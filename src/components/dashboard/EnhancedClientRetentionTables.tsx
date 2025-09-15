import React, { useMemo } from 'react';
import { ModernDataTable } from '@/components/ui/ModernDataTable';
import { NewClientData } from '@/types/dashboard';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedClientRetentionTablesProps {
  data: NewClientData[];
  allData: NewClientData[]; // Unfiltered data for month-on-month and year-on-year
  type: 'monthOnMonth' | 'yearOnYear' | 'detailed';
  onRowClick?: (row: any) => void;
}

export const EnhancedClientRetentionTables: React.FC<EnhancedClientRetentionTablesProps> = ({
  data,
  allData,
  type,
  onRowClick
}) => {

  const processedData = useMemo(() => {
    // Use allData for month-on-month and year-on-year to show complete trends
    const sourceData = (type === 'monthOnMonth' || type === 'yearOnYear') ? allData : data;
    
    if (type === 'detailed') {
      return sourceData.map((client, index) => ({
        rank: index + 1,
        name: `${client.firstName} ${client.lastName}` || 'Unknown Client',
        trainer: client.trainerName,
        location: client.firstVisitLocation,
        conversionStatus: client.conversionStatus,
        retentionStatus: client.retentionStatus,
        ltv: client.ltv,
        visitsPostTrial: client.visitsPostTrial,
        conversionSpan: client.conversionSpan,
        totalVisits: client.classNo,
        membershipUsed: client.membershipUsed,
        rawData: client
      }));
    }

    // For month-on-month and year-on-year, group by time periods
    const timeGroups = sourceData.reduce((acc, client) => {
      const date = new Date(client.firstVisitDate);
      const key = type === 'monthOnMonth' 
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        : `${date.getFullYear()}`;
      
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(client);
      return acc;
    }, {} as Record<string, NewClientData[]>);

    return Object.entries(timeGroups).map(([period, clients]) => {
      const totalClients = clients.length;
      const convertedClients = clients.filter(c => c.conversionStatus === 'Converted').length;
      const retainedClients = clients.filter(c => c.retentionStatus === 'Retained').length;
      const avgLTV = clients.reduce((sum, c) => sum + (c.ltv || 0), 0) / totalClients;
      const avgConversionSpan = clients
        .filter(c => (c.conversionSpan || 0) > 0)
        .reduce((sum, c, _, arr) => sum + (c.conversionSpan || 0) / arr.length, 0);

      const newMembers = clients.filter(c => {
        const isNewValue = String(c.isNew || '').toLowerCase();
        return isNewValue.includes('new');
      }).length;
      
      const conversionRate = newMembers > 0 ? (convertedClients / newMembers) * 100 : 0;
      // Corrected retention rate: retained members / new members * 100
      const retentionRate = newMembers > 0 ? (retainedClients / newMembers) * 100 : 0;

      return {
        period,
        totalClients,
        convertedClients,
        retainedClients,
        conversionRate,
        retentionRate,
        avgLTV,
        avgConversionSpan,
        rawData: clients
      };
    }).sort((a, b) => b.period.localeCompare(a.period));
  }, [data, allData, type]);

  const getGrowthBadge = (current: number, previous: number) => {
    if (!previous || previous === 0) return null;
    
    const growth = ((current - previous) / previous) * 100;
    const isPositive = growth > 0;
    
    return (
      <Badge className={cn(
        "text-xs ml-2",
        isPositive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
      )}>
        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {Math.abs(growth).toFixed(1)}%
      </Badge>
    );
  };

  const columns = useMemo(() => {
    if (type === 'detailed') {
      return [
        {
          key: 'rank',
          header: '#',
          render: (value: any) => (
            <Badge className="bg-blue-100 text-blue-800 w-8 h-6 flex items-center justify-center">
              {value}
            </Badge>
          ),
          align: 'center' as const
        },
        {
          key: 'name',
          header: 'Client Name',
          render: (value: any, row: any) => (
            <div className="flex flex-col">
              <span className="font-medium text-slate-800">{value}</span>
              <span className="text-xs text-slate-500">{row.trainer}</span>
            </div>
          ),
          align: 'left' as const,
          sortable: true
        },
        {
          key: 'location',
          header: 'Location',
          render: (value: any) => (
            <Badge className="bg-purple-100 text-purple-800 text-xs">
              {value?.split(',')[0] || 'Unknown'}
            </Badge>
          ),
          align: 'center' as const
        },
        {
          key: 'conversionStatus',
          header: 'Status',
          render: (value: any) => (
            <Badge className={cn(
              "text-xs",
              value === 'Converted' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            )}>
              {value}
            </Badge>
          ),
          align: 'center' as const
        },
        {
          key: 'ltv',
          header: 'LTV',
          render: (value: any) => (
            <span className="font-mono font-semibold">{formatCurrency(value)}</span>
          ),
          align: 'center' as const,
          sortable: true
        },
        {
          key: 'visitsPostTrial',
          header: 'Post-Trial Visits',
          render: (value: any) => (
            <span className="font-mono">{formatNumber(value || 0)}</span>
          ),
          align: 'center' as const,
          sortable: true
        },
        {
          key: 'conversionSpan',
          header: 'Conv. Days',
          render: (value: any) => (
            <span className="font-mono">{value || 0} days</span>
          ),
          align: 'center' as const,
          sortable: true
        }
      ];
    }

    // For time-based tables
    return [
      {
        key: 'period',
        header: type === 'monthOnMonth' ? 'Month' : 'Year',
        render: (value: any) => (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">{value}</span>
          </div>
        ),
        align: 'left' as const
      },
      {
        key: 'totalClients',
        header: 'Total Clients',
        render: (value: any) => (
          <span className="font-mono">{formatNumber(value)}</span>
        ),
        align: 'center' as const,
        sortable: true
      },
      {
        key: 'convertedClients',
        header: 'Converted',
        render: (value: any) => (
          <span className="font-mono text-green-700">{formatNumber(value)}</span>
        ),
        align: 'center' as const,
        sortable: true
      },
      {
        key: 'conversionRate',
        header: 'Conv. Rate',
        render: (value: any, row: any) => (
          <div className="flex items-center justify-center">
            <span className="font-mono">{value.toFixed(1)}%</span>
          </div>
        ),
        align: 'center' as const,
        sortable: true
      },
      {
        key: 'avgLTV',
        header: 'Avg LTV',
        render: (value: any, row: any) => (
          <div className="flex items-center justify-center">
            <span className="font-mono font-semibold">{formatCurrency(value)}</span>
          </div>
        ),
        align: 'center' as const,
        sortable: true
      },
      {
        key: 'avgConversionSpan',
        header: 'Avg Conv. Days',
        render: (value: any) => (
          <span className="font-mono">{value.toFixed(0)} days</span>
        ),
        align: 'center' as const,
        sortable: true
      }
    ];
  }, [type, processedData]);

  const title = {
    'monthOnMonth': 'Month-on-Month Trends',
    'yearOnYear': 'Year-on-Year Analysis', 
    'detailed': 'Detailed Client Data'
  }[type];

  return (
    <ModernDataTable
      data={processedData}
      columns={columns}
      loading={false}
      stickyHeader={true}
      maxHeight="600px"
      headerGradient="from-slate-700 to-slate-900"
      onRowClick={onRowClick}
      className="shadow-lg"
    />
  );
};