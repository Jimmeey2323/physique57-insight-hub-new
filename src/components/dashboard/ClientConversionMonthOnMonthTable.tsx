
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { NewClientData } from '@/types/dashboard';
import { ModernDataTable } from '@/components/ui/ModernDataTable';
import { motion } from 'framer-motion';

interface ClientConversionMonthOnMonthTableProps {
  data: NewClientData[];
  visitsSummary?: Record<string, number>;
  onRowClick?: (monthData: any) => void;
}

export const ClientConversionMonthOnMonthTable: React.FC<ClientConversionMonthOnMonthTableProps> = ({ data, visitsSummary, onRowClick }) => {
  console.log('MonthOnMonth data:', data.length, 'records');

  const monthlyData = React.useMemo(() => {
    // Generate all months from Jan 2024 to current month regardless of data
    const generateAllMonths = () => {
      const months = [];
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      // Start from current month and go back to Jan 2024
      for (let year = currentYear; year >= 2024; year--) {
        const startMonth = year === currentYear ? currentMonth : 11;
        const endMonth = year === 2024 ? 0 : 0;
        
        for (let month = startMonth; month >= endMonth; month--) {
          const monthKey = `${year}-${(month + 1).toString().padStart(2, '0')}`;
          const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          months.push({ key: monthKey, name: monthName });
        }
      }
      
      return months;
    };

    const allMonths = generateAllMonths();
    
    // Initialize all months with empty data
    const monthlyStats = allMonths.reduce((acc, month) => {
      acc[month.key] = {
        month: month.name,
        sortKey: month.key,
        totalMembers: 0,
        newMembers: 0,
        converted: 0,
        retained: 0,
        totalLTV: 0,
        conversionIntervals: [],
        visitsPostTrial: [],
        clients: []
      };
      return acc;
    }, {} as Record<string, any>);

    // Process actual data into the pre-initialized months
    data.forEach(client => {
      const dateStr = client.firstVisitDate;
      let date: Date;
      
      // Handle different date formats consistently
      if (dateStr.includes('/')) {
        const parts = dateStr.split(' ')[0].split('/');
        if (parts.length === 3) {
          // Try DD/MM/YYYY format first
          const [day, month, year] = parts;
          date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          
          // If invalid, try MM/DD/YYYY format
          if (isNaN(date.getTime())) {
            date = new Date(parseInt(year), parseInt(day) - 1, parseInt(month));
          }
        } else {
          date = new Date(dateStr);
        }
      } else {
        date = new Date(dateStr);
      }
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateStr);
        return;
      }
      
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      // Only process if this month exists in our pre-defined range
      if (monthlyStats[monthKey]) {
        monthlyStats[monthKey].totalMembers++;
        monthlyStats[monthKey].clients.push(client);
        
        // Count new members - when isNew contains "new" (case insensitive)
        if ((client.isNew || '').toLowerCase().includes('new')) {
          monthlyStats[monthKey].newMembers++;
        }
        
        // Count converted - when conversionStatus is exactly "Converted"
        if (client.conversionStatus === 'Converted') {
          monthlyStats[monthKey].converted++;
        }
        
        // Count retained - when retentionStatus is exactly "Retained"
        if (client.retentionStatus === 'Retained') {
          monthlyStats[monthKey].retained++;
        }
        
        // Sum LTV
        monthlyStats[monthKey].totalLTV += client.ltv || 0;
        
        // Use conversionSpan field for conversion interval
        if (client.conversionSpan && client.conversionSpan > 0) {
          monthlyStats[monthKey].conversionIntervals.push(client.conversionSpan);
        }
        
        if (client.visitsPostTrial && client.visitsPostTrial > 0) {
          monthlyStats[monthKey].visitsPostTrial.push(client.visitsPostTrial);
        }
      }
    });

    // Populate visits data from visitsSummary
    if (visitsSummary) {
      Object.keys(monthlyStats).forEach(monthKey => {
        const stat = monthlyStats[monthKey];
        // Convert monthKey format from "2024-01" to "Jan 2024" to match visitsSummary format
        const [year, month] = monthKey.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[parseInt(month) - 1];
        const summaryKey = `${monthName} ${year}`;
        
        stat.visits = visitsSummary[summaryKey] || 0;
      });
    }

    const processed = Object.values(monthlyStats)
      .map((stat: any) => ({
        ...stat,
        trialsCompleted: stat.visitsPostTrial.length, // trials completed = actual trials with visits
        conversionRate: stat.newMembers > 0 ? (stat.converted / stat.newMembers) * 100 : 0, // Converted from new members
        retentionRate: stat.newMembers > 0 ? (stat.retained / stat.newMembers) * 100 : 0, // Retained from new members (corrected)
        avgLTV: stat.totalMembers > 0 ? stat.totalLTV / stat.totalMembers : 0,
        avgConversionInterval: stat.conversionIntervals.length > 0 
          ? stat.conversionIntervals.reduce((a: number, b: number) => a + b, 0) / stat.conversionIntervals.length 
          : 0,
        avgVisitsPostTrial: stat.visitsPostTrial.length > 0
          ? stat.visitsPostTrial.reduce((a: number, b: number) => a + b, 0) / stat.visitsPostTrial.length
          : 0
      }))
      .sort((a, b) => b.sortKey.localeCompare(a.sortKey));

    console.log('Monthly data processed:', processed);
    return processed;
  }, [data]);

  const columns = [
    {
      key: 'month',
      header: 'Month',
      className: 'font-semibold min-w-[100px]',
      render: (value: string) => (
        <div className="font-bold text-slate-800 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg">
          {value}
        </div>
      )
    },
    {
      key: 'totalMembers',
      header: 'Trials',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-blue-600">{formatNumber(value)}</span>
      )
    },
    {
      key: 'newMembers',
      header: 'New Members',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-green-600">{formatNumber(value)}</span>
      )
    },
    {
      key: 'retained',
      header: 'Retained',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-purple-600">{formatNumber(value)}</span>
      )
    },
    {
      key: 'retentionRate',
      header: 'Retention %',
      align: 'center' as const,
      render: (value: number) => (
        <span className={`text-base font-bold ${value > 70 ? 'text-purple-600' : value < 40 ? 'text-red-600' : 'text-slate-600'}`}>
          {value.toFixed(1)}%
        </span>
      )
    },
    {
      key: 'converted',
      header: 'Converted',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-emerald-600">{formatNumber(value)}</span>
      )
    },
    {
      key: 'conversionRate',
      header: 'Conversion %',
      align: 'center' as const,
      render: (value: number) => (
        <span className={`text-base font-bold ${value > 25 ? 'text-green-600' : value < 10 ? 'text-red-600' : 'text-slate-600'}`}>
          {value.toFixed(1)}%
        </span>
      )
    },
    {
      key: 'avgLTV',
      header: 'Avg LTV',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-teal-600">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'totalLTV',
      header: 'Total LTV',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-green-600">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'avgConversionInterval',
      header: 'Avg Conv Days',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-orange-600">{Math.round(value)}</span>
      )
    },
    {
      key: 'avgVisitsPostTrial',
      header: 'Avg Visits',
      align: 'center' as const,
      render: (value: number) => (
        <span className="text-base font-bold text-blue-600">{value.toFixed(1)}</span>
      )
    }
  ];

  // Calculate totals
  const totals = {
    month: 'TOTAL',
    totalMembers: monthlyData.reduce((sum, row) => sum + row.totalMembers, 0),
    newMembers: monthlyData.reduce((sum, row) => sum + row.newMembers, 0),
    converted: monthlyData.reduce((sum, row) => sum + row.converted, 0),
    conversionRate: 0,
    retained: monthlyData.reduce((sum, row) => sum + row.retained, 0),
    retentionRate: 0,
    totalLTV: monthlyData.reduce((sum, row) => sum + row.totalLTV, 0),
    avgLTV: monthlyData.reduce((sum, row) => sum + row.totalLTV, 0) / Math.max(monthlyData.reduce((sum, row) => sum + row.totalMembers, 0), 1),
    avgConversionInterval: monthlyData.reduce((sum, row) => sum + (row.avgConversionInterval * row.totalMembers), 0) / Math.max(monthlyData.reduce((sum, row) => sum + row.totalMembers, 0), 1),
    avgVisitsPostTrial: monthlyData.reduce((sum, row) => sum + (row.avgVisitsPostTrial * row.totalMembers), 0) / Math.max(monthlyData.reduce((sum, row) => sum + row.totalMembers, 0), 1)
  };
  totals.conversionRate = totals.newMembers > 0 ? (totals.converted / totals.newMembers) * 100 : 0;
  totals.retentionRate = totals.newMembers > 0 ? (totals.retained / totals.newMembers) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Month-on-Month Client Conversion Analysis
          <Badge variant="secondary" className="bg-white/20 text-white">
            {monthlyData.length} Months
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ModernDataTable
          data={monthlyData}
          columns={columns}
          headerGradient="from-blue-600 to-cyan-600"
          showFooter={true}
          footerData={totals}
          maxHeight="600px"
          onRowClick={onRowClick}
        />
      </CardContent>
    </Card>
    </motion.div>
  );
};
