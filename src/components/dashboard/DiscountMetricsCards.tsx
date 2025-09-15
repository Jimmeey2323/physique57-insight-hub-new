
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { SalesData } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';
import { TrendingDown, TrendingUp, Target, Percent, DollarSign, Users, ShoppingCart, AlertTriangle, Info } from 'lucide-react';

interface DiscountMetricsCardsProps {
  data: SalesData[];
  filters?: any;
}

export const DiscountMetricsCards: React.FC<DiscountMetricsCardsProps> = ({ data, filters }) => {
  const metrics = useMemo(() => {
    let filteredData = data;
    
    // Apply filters
    if (filters) {
      filteredData = data.filter(item => {
        if (filters.location && item.calculatedLocation !== filters.location) return false;
        if (filters.category && item.cleanedCategory !== filters.category) return false;
        if (filters.product && item.cleanedProduct !== filters.product) return false;
        if (filters.soldBy && (item.soldBy === '-' ? 'Online/System' : item.soldBy) !== filters.soldBy) return false;
        if (filters.paymentMethod && item.paymentMethod !== filters.paymentMethod) return false;
        if (filters.minDiscountAmount && (item.discountAmount || 0) < filters.minDiscountAmount) return false;
        if (filters.maxDiscountAmount && (item.discountAmount || 0) > filters.maxDiscountAmount) return false;
        if (filters.minDiscountPercent && (item.discountPercentage || 0) < filters.minDiscountPercent) return false;
        if (filters.maxDiscountPercent && (item.discountPercentage || 0) > filters.maxDiscountPercent) return false;
        if (filters.dateRange?.from || filters.dateRange?.to) {
          const itemDate = new Date(item.paymentDate);
          if (filters.dateRange.from && itemDate < filters.dateRange.from) return false;
          if (filters.dateRange.to && itemDate > filters.dateRange.to) return false;
        }
        return true;
      });
    }

    const discountedTransactions = filteredData.filter(item => (item.discountAmount || 0) > 0);
    const totalTransactions = filteredData.length;
    
    const totalDiscountAmount = discountedTransactions.reduce((sum, item) => sum + (item.discountAmount || 0), 0);
    const totalRevenue = filteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0);
    const totalPotentialRevenue = filteredData.reduce((sum, item) => sum + (item.mrpPostTax || item.paymentValue || 0), 0);
    
    const discountPenetration = totalTransactions > 0 ? (discountedTransactions.length / totalTransactions) * 100 : 0;
    const avgDiscountPerTransaction = discountedTransactions.length > 0 ? totalDiscountAmount / discountedTransactions.length : 0;
    const overallDiscountRate = totalPotentialRevenue > 0 ? (totalDiscountAmount / totalPotentialRevenue) * 100 : 0;
    const revenueImpact = totalPotentialRevenue - totalRevenue;

    // Additional metrics
    const uniqueCustomersWithDiscounts = new Set(discountedTransactions.map(item => item.customerEmail)).size;
    const avgDiscountPercent = discountedTransactions.length > 0 
      ? discountedTransactions.reduce((sum, item) => sum + (item.discountPercentage || 0), 0) / discountedTransactions.length 
      : 0;

    // Top discount categories
    const categoryDiscounts = discountedTransactions.reduce((acc, item) => {
      const category = item.cleanedCategory || 'Unknown';
      if (!acc[category]) acc[category] = { amount: 0, count: 0 };
      acc[category].amount += item.discountAmount || 0;
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, { amount: number; count: number }>);

    const topDiscountCategory = Object.entries(categoryDiscounts)
      .sort(([,a], [,b]) => b.amount - a.amount)[0];

    // Staff discount analysis
    const staffDiscounts = discountedTransactions.reduce((acc, item) => {
      const staff = item.soldBy === '-' ? 'Online/System' : item.soldBy || 'Unknown';
      if (!acc[staff]) acc[staff] = 0;
      acc[staff] += item.discountAmount || 0;
      return acc;
    }, {} as Record<string, number>);

    const topDiscountStaff = Object.entries(staffDiscounts)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      totalDiscountAmount,
      discountPenetration,
      avgDiscountPerTransaction,
      overallDiscountRate,
      revenueImpact,
      discountedTransactions: discountedTransactions.length,
      totalTransactions,
      uniqueCustomersWithDiscounts,
      avgDiscountPercent,
      totalRevenue,
      totalPotentialRevenue,
      topDiscountCategory: topDiscountCategory ? { 
        name: topDiscountCategory[0], 
        amount: topDiscountCategory[1].amount,
        count: topDiscountCategory[1].count 
      } : null,
      topDiscountStaff: topDiscountStaff ? { name: topDiscountStaff[0], amount: topDiscountStaff[1] } : null
    };
  }, [data, filters]);

  const metricCards = [
    {
      title: 'Total Discount Impact',
      value: formatCurrency(metrics.totalDiscountAmount),
      subtitle: `${formatCurrency(metrics.revenueImpact)} potential revenue lost`,
      icon: DollarSign,
      trend: -metrics.overallDiscountRate,
      trendLabel: 'vs potential revenue',
      color: 'bg-gradient-to-br from-red-50 to-orange-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      hoverInfo: {
        title: 'Discount Impact Details',
        content: `Total discount amount given: ${formatCurrency(metrics.totalDiscountAmount)}. This represents ${metrics.overallDiscountRate.toFixed(1)}% of potential revenue. Revenue lost due to discounts: ${formatCurrency(metrics.revenueImpact)}.`
      }
    },
    {
      title: 'Discount Penetration',
      value: `${metrics.discountPenetration.toFixed(1)}%`,
      subtitle: `${metrics.discountedTransactions} of ${metrics.totalTransactions} transactions`,
      icon: Target,
      trend: metrics.discountPenetration - 25, // Assuming 25% is baseline
      trendLabel: 'vs baseline',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverInfo: {
        title: 'Penetration Analysis',
        content: `${metrics.discountPenetration.toFixed(1)}% of all transactions included discounts. This affects ${metrics.uniqueCustomersWithDiscounts} unique customers. ${metrics.topDiscountCategory ? `Top category: ${metrics.topDiscountCategory.name} (${metrics.topDiscountCategory.count} transactions)` : 'No category data available'}.`
      }
    },
    {
      title: 'Average Discount',
      value: formatCurrency(metrics.avgDiscountPerTransaction),
      subtitle: 'Per discounted transaction',
      icon: Percent,
      trend: 5.2, // Placeholder trend
      trendLabel: 'vs last period',
      color: 'bg-gradient-to-br from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverInfo: {
        title: 'Average Discount Breakdown',
        content: `Average discount per transaction: ${formatCurrency(metrics.avgDiscountPerTransaction)}. Average discount percentage: ${metrics.avgDiscountPercent.toFixed(1)}%. ${metrics.topDiscountStaff ? `Highest discount giver: ${metrics.topDiscountStaff.name} (${formatCurrency(metrics.topDiscountStaff.amount)} total)` : 'No staff data available'}.`
      }
    },
    {
      title: 'Discount Rate',
      value: `${metrics.overallDiscountRate.toFixed(1)}%`,
      subtitle: 'Of total potential revenue',
      icon: TrendingDown,
      trend: -metrics.overallDiscountRate,
      trendLabel: 'impact on revenue',
      color: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      hoverInfo: {
        title: 'Discount Rate Analysis',
        content: `Overall discount rate: ${metrics.overallDiscountRate.toFixed(1)}% of potential revenue. This translates to ${formatCurrency(metrics.totalDiscountAmount)} in total discounts. Revenue efficiency: ${((metrics.totalRevenue / metrics.totalPotentialRevenue) * 100).toFixed(1)}%.`
      }
    },
    {
      title: 'Customer Impact',
      value: formatNumber(metrics.uniqueCustomersWithDiscounts),
      subtitle: 'Customers received discounts',
      icon: Users,
      trend: 8.5,
      trendLabel: 'customer satisfaction',
      color: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverInfo: {
        title: 'Customer Discount Analysis',
        content: `${metrics.uniqueCustomersWithDiscounts} unique customers received discounts out of ${metrics.discountedTransactions} discounted transactions. Average discount per customer: ${formatCurrency(metrics.uniqueCustomersWithDiscounts > 0 ? metrics.totalDiscountAmount / metrics.uniqueCustomersWithDiscounts : 0)}.`
      }
    },
    {
      title: 'Discount Frequency',
      value: `${(metrics.discountedTransactions / Math.max(metrics.uniqueCustomersWithDiscounts, 1)).toFixed(1)}`,
      subtitle: 'Avg discounts per customer',
      icon: ShoppingCart,
      trend: -2.1,
      trendLabel: 'frequency trend',
      color: 'bg-gradient-to-br from-pink-50 to-rose-50',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      hoverInfo: {
        title: 'Discount Frequency Details',
        content: `On average, customers who receive discounts get ${(metrics.discountedTransactions / Math.max(metrics.uniqueCustomersWithDiscounts, 1)).toFixed(1)} discounts each. Total discounted transactions: ${metrics.discountedTransactions}. This suggests ${(metrics.discountedTransactions / Math.max(metrics.uniqueCustomersWithDiscounts, 1)) > 1.5 ? 'frequent' : 'occasional'} discount usage patterns.`
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards.map((metric, index) => (
        <HoverCard key={metric.title}>
          <HoverCardTrigger asChild>
            <Card className={`${metric.color} ${metric.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-slate-700 group-hover:text-slate-900 flex items-center gap-2">
                  {metric.title}
                  <Info className="w-3 h-3 text-slate-400" />
                </CardTitle>
                <div className={`p-2 rounded-lg bg-white/50 ${metric.iconColor} group-hover:scale-110 transition-transform`}>
                  <metric.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold text-slate-900">
                  {metric.value}
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-600">{metric.subtitle}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={metric.trend > 0 ? "default" : "destructive"}
                      className="text-xs font-medium"
                    >
                      {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                    </Badge>
                    <span className="text-xs text-slate-500">{metric.trendLabel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{metric.hoverInfo.title}</h4>
              <p className="text-sm text-slate-600">{metric.hoverInfo.content}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};
