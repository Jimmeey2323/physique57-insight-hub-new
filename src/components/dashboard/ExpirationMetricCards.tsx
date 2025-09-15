import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExpirationData, MetricCardData } from '@/types/dashboard';
import { formatNumber, formatPercentage } from '@/utils/formatters';
import { Users, AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpirationMetricCardsProps {
  data: ExpirationData[];
  onMetricClick?: (data: ExpirationData[], type: string) => void;
}

export const ExpirationMetricCards: React.FC<ExpirationMetricCardsProps> = ({ 
  data, 
  onMetricClick 
}) => {
  const calculateMetrics = (data: ExpirationData[]): MetricCardData[] => {
    const totalMemberships = data.length;
    const activeCount = data.filter(item => item.status === 'Active').length;
    const churnedCount = data.filter(item => item.status === 'Churned').length;
    const frozenCount = data.filter(item => item.status === 'Frozen').length;

    const churnRate = totalMemberships > 0 ? (churnedCount / totalMemberships) * 100 : 0;
    const activeRate = totalMemberships > 0 ? (activeCount / totalMemberships) * 100 : 0;
    const frozenRate = totalMemberships > 0 ? (frozenCount / totalMemberships) * 100 : 0;

    // Calculate revenue impact from churned members
    const paidChurnedMembers = data.filter(item => item.status === 'Churned' && item.paid && item.paid !== '-');
    const churnedRevenueLoss = paidChurnedMembers.length > 0 
      ? paidChurnedMembers.reduce((sum, member) => {
          const paid = parseFloat(member.paid?.toString().replace(/[^0-9.-]/g, '') || '0');
          return sum + (isNaN(paid) ? 0 : paid);
        }, 0)
      : 0;

    return [
      {
        title: 'Total Memberships',
        value: formatNumber(totalMemberships),
        change: 0,
        description: 'All tracked membership records',
        calculation: 'Count of all membership records',
        icon: 'Users',
        rawValue: totalMemberships
      },
      {
        title: 'Active Members',
        value: formatNumber(activeCount),
        change: 0,
        description: `${formatPercentage(activeRate)} of total memberships`,
        calculation: 'Count of active status',
        icon: 'CheckCircle',
        rawValue: activeCount
      },
      {
        title: 'Churned Members',
        value: formatNumber(churnedCount),
        change: 0,
        description: `${formatPercentage(churnRate)} churn rate`,
        calculation: 'Count of churned status',
        icon: 'AlertTriangle',
        rawValue: churnedCount
      },
      {
        title: 'Frozen Members',
        value: formatNumber(frozenCount),
        change: 0,
        description: `${formatPercentage(frozenRate)} of total memberships`,
        calculation: 'Count of frozen status',
        icon: 'Clock',
        rawValue: frozenCount
      },
      {
        title: 'Revenue Impact',
        value: `₹${formatNumber(churnedRevenueLoss)}`,
        change: 0,
        description: `Loss from ${paidChurnedMembers.length} churned members`,
        calculation: 'Sum of paid amounts for churned members',
        icon: 'TrendingUp',
        rawValue: churnedRevenueLoss
      }
    ];
  };

  const metrics = calculateMetrics(data);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'CheckCircle': return CheckCircle;
      case 'AlertTriangle': return AlertTriangle;
      case 'Clock': return Clock;
      default: return TrendingUp;
    }
  };

  const getCardVariant = (metric: MetricCardData, index: number) => {
    const variants = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-purple-500 to-purple-600'
    ];
    return variants[index] || 'from-slate-500 to-slate-600';
  };

  const getFilteredData = (metric: MetricCardData) => {
    if (metric.title === 'Active Members') return data.filter(item => item.status === 'Active');
    if (metric.title === 'Churned Members') return data.filter(item => item.status === 'Churned');
    if (metric.title === 'Frozen Members') return data.filter(item => item.status === 'Frozen');
    return data;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const IconComponent = getIconComponent(metric.icon);
        const gradient = getCardVariant(metric, index);
        
        return (
          <Card
            key={index}
            className={cn(
              "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105",
              "bg-gradient-to-br", gradient
            )}
            onClick={() => {
              const filteredData = getFilteredData(metric);
              onMetricClick?.(filteredData, metric.title.toLowerCase());
            }}
          >
            <CardContent className="p-6 text-white">
              {/* Icon and Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  {index === 0 ? 'Total' : index === 1 ? 'Active' : index === 2 ? 'Churned' : index === 3 ? 'Frozen' : 'Revenue'}
                </Badge>
              </div>

              {/* Main Value */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {metric.value}
                </div>
                
                {/* Title */}
                <div className="text-white/90 font-medium">
                  {metric.title}
                </div>
                
                {/* Description */}
                <div className="text-white/70 text-sm">
                  {metric.description}
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/5 rounded-full"></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};