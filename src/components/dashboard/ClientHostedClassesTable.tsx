import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { NewClientData } from '@/types/dashboard';
import { ModernDataTable } from '@/components/ui/ModernDataTable';
import { motion } from 'framer-motion';

interface ClientHostedClassesTableProps {
  data: NewClientData[];
  onRowClick?: (classData: any) => void;
}

export const ClientHostedClassesTable: React.FC<ClientHostedClassesTableProps> = ({ data, onRowClick }) => {
  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Hosted Classes Performance Analysis
            <Badge variant="secondary" className="bg-white/20 text-white">
              0 Classes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No class data available for analysis.</p>
        </CardContent>
      </Card>
    );
  }

  const hostedClassData = React.useMemo(() => {
    // Filter data to only include hosted classes based on class name
    const filteredData = data.filter(client => {
      if (!client || !client.firstVisitEntityName) return false;
      
      const className = client.firstVisitEntityName.toLowerCase();
      
      // Check for "host", "hosted", or "sign up" as substring matches
      const hasHostKeywords = className.includes('host') || 
                             className.includes('hosted') || 
                             className.includes('sign up');
      
      // Check for "x" as a whole word using word boundaries
      const hasStandaloneX = /\bx\b/.test(className);
      
      const isHostedClass = hasHostKeywords || hasStandaloneX;
      
      return isHostedClass;
    });

    console.log(`Hosted Classes Filter: ${data.length} total records, ${filteredData.length} hosted class records`);

    const classStats = filteredData.reduce((acc, client) => {
      // Safety checks for client data
      if (!client) return acc;
      
      const className = client.firstVisitEntityName || 'Unknown Class';
      
      // Parse date properly from "01/01/2020, 17:30:00" format
      let month = 'Unknown';
      if (client.firstVisitDate) {
        try {
          let date: Date;
          if (client.firstVisitDate.includes('/')) {
            const datePart = client.firstVisitDate.split(',')[0].trim();
            const [day, monthNum, year] = datePart.split('/');
            date = new Date(parseInt(year), parseInt(monthNum) - 1, parseInt(day));
          } else {
            date = new Date(client.firstVisitDate);
          }
          
          if (!isNaN(date.getTime())) {
            month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          }
        } catch (error) {
          console.warn('Error parsing date:', client.firstVisitDate, error);
        }
      }
      
      const key = `${month}-${className}`;
      
      if (!acc[key]) {
        acc[key] = {
          month,
          className,
          totalMembers: 0,
          newMembers: 0,
          converted: 0,
          retained: 0,
          totalLTV: 0,
          conversionIntervals: [],
          clients: []
        };
      }
      
      acc[key].totalMembers++;
      acc[key].clients.push(client);
      
      // Count new members - when isNew contains "new" (case insensitive)
      if ((client.isNew || '').toLowerCase().includes('new')) {
        acc[key].newMembers++;
      }
      
      // Count converted - when conversionStatus is exactly "Converted"
      if (client.conversionStatus === 'Converted') {
        acc[key].converted++;
      }
      
      // Count retained - when retentionStatus is exactly "Retained"
      if (client.retentionStatus === 'Retained') {
        acc[key].retained++;
      }
      
      acc[key].totalLTV += client.ltv || 0;
      
      // Calculate conversion interval with safety checks
      if (client.firstPurchase && client.firstVisitDate) {
        try {
          const firstVisitDate = new Date(client.firstVisitDate);
          const firstPurchaseDate = new Date(client.firstPurchase);
          
          if (!isNaN(firstVisitDate.getTime()) && !isNaN(firstPurchaseDate.getTime())) {
            const intervalDays = Math.ceil((firstPurchaseDate.getTime() - firstVisitDate.getTime()) / (1000 * 60 * 60 * 24));
            if (intervalDays >= 0) {
              acc[key].conversionIntervals.push(intervalDays);
            }
          }
        } catch (error) {
          console.warn('Error calculating conversion interval:', error);
        }
      }
      
      return acc;
    }, {} as Record<string, any>);

    return Object.values(classStats)
      .map((stat: any) => ({
        ...stat,
        conversionRate: stat.newMembers > 0 ? (stat.converted / stat.newMembers) * 100 : 0,
        retentionRate: stat.converted > 0 ? (stat.retained / stat.converted) * 100 : 0,
        avgLTV: stat.totalMembers > 0 ? stat.totalLTV / stat.totalMembers : 0,
        avgConversionInterval: stat.conversionIntervals.length > 0 
          ? stat.conversionIntervals.reduce((a: number, b: number) => a + b, 0) / stat.conversionIntervals.length 
          : 0
      }))
      .sort((a, b) => b.totalMembers - a.totalMembers);
  }, [data]);

  const columns = [
    {
      key: 'month',
      header: 'Month',
      className: 'font-semibold min-w-[100px]',
      render: (value: string) => (
        <div className="font-bold text-slate-800 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-lg">
          {value}
        </div>
      )
    },
    {
      key: 'className',
      header: 'Class Name',
      className: 'font-medium min-w-[200px]',
      render: (value: string) => (
        <div className="font-semibold text-slate-700 truncate" title={value}>
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
        </div>
      )
    },
    {
      key: 'totalMembers',
      header: 'Trials',
      align: 'center' as const,
      render: (value: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{formatNumber(value)}</div>
          <div className="text-xs text-slate-500">trials</div>
        </div>
      )
    },
    {
      key: 'newMembers',
      header: 'New Members',
      align: 'center' as const,
      render: (value: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{formatNumber(value)}</div>
          <div className="text-xs text-slate-500">new</div>
        </div>
      )
    },
    {
      key: 'retained',
      header: 'Retained',
      align: 'center' as const,
      render: (value: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{formatNumber(value)}</div>
          <div className="text-xs text-slate-500">retained</div>
        </div>
      )
    },
    {
      key: 'retentionRate',
      header: 'Retention %',
      align: 'center' as const,
      render: (value: number) => {
        const safeValue = value ?? 0;
        return (
          <div className="flex items-center justify-center gap-1">
            {safeValue > 70 ? <TrendingUp className="w-3 h-3 text-green-500" /> : safeValue < 50 ? <TrendingDown className="w-3 h-3 text-red-500" /> : null}
            <Badge className={`font-bold ${safeValue > 70 ? 'bg-green-100 text-green-800' : safeValue < 50 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
              {safeValue.toFixed(1)}%
            </Badge>
          </div>
        );
      }
    },
    {
      key: 'converted',
      header: 'Converted',
      align: 'center' as const,
      render: (value: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{formatNumber(value)}</div>
          <div className="text-xs text-slate-500">converted</div>
        </div>
      )
    },
    {
      key: 'conversionRate',
      header: 'Conversion %',
      align: 'center' as const,
      render: (value: number) => {
        const safeValue = value ?? 0;
        return (
          <div className="flex items-center justify-center gap-1">
            {safeValue > 25 ? <TrendingUp className="w-3 h-3 text-green-500" /> : safeValue < 10 ? <TrendingDown className="w-3 h-3 text-red-500" /> : null}
            <Badge className={`font-bold ${safeValue > 25 ? 'bg-green-100 text-green-800' : safeValue < 10 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
              {safeValue.toFixed(1)}%
            </Badge>
          </div>
        );
      }
    },
    {
      key: 'avgLTV',
      header: 'Avg LTV',
      align: 'right' as const,
      render: (value: number) => (
        <div className="text-right">
          <div className="text-lg font-bold text-emerald-600">{formatCurrency(value)}</div>
          <div className="text-xs text-slate-500">per client</div>
        </div>
      )
    },
    {
      key: 'avgConversionInterval',
      header: 'Avg Conv Days',
      align: 'center' as const,
      render: (value: number) => {
        const safeValue = value ?? 0;
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-bold">
            {Math.round(safeValue)} days
          </Badge>
        );
      }
    }
  ];

  // Calculate totals
  const totals = {
    month: 'TOTAL',
    className: `${hostedClassData.length} Classes`,
    totalMembers: hostedClassData.reduce((sum, row) => sum + row.totalMembers, 0),
    newMembers: hostedClassData.reduce((sum, row) => sum + row.newMembers, 0),
    converted: hostedClassData.reduce((sum, row) => sum + row.converted, 0),
    conversionRate: 0,
    retained: hostedClassData.reduce((sum, row) => sum + row.retained, 0),
    avgLTV: hostedClassData.reduce((sum, row) => sum + row.totalLTV, 0) / Math.max(hostedClassData.reduce((sum, row) => sum + row.totalMembers, 0), 1),
    avgConversionInterval: hostedClassData.reduce((sum, row) => sum + (row.avgConversionInterval * row.totalMembers), 0) / Math.max(hostedClassData.reduce((sum, row) => sum + row.totalMembers, 0), 1)
  };
  totals.conversionRate = totals.newMembers > 0 ? (totals.converted / totals.newMembers) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Hosted Classes Performance Analysis
            <Badge variant="secondary" className="bg-white/20 text-white">
              {hostedClassData.length} Classes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={hostedClassData}
            columns={columns}
            headerGradient="from-purple-600 to-pink-600"
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