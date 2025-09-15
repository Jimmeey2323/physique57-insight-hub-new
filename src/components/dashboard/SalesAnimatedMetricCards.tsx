import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard, DollarSign, Target, Activity, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SalesData } from '@/types/dashboard';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/lib/utils';
import { useSalesMetrics } from '@/hooks/useSalesMetrics';

interface SalesAnimatedMetricCardsProps {
  data: SalesData[];
  onMetricClick?: (metricData: any) => void;
}

const iconMap = {
  DollarSign,
  ShoppingCart,
  Activity,
  Users,
  Target,
  Calendar,
  CreditCard,
  ArrowDownRight
};

export const SalesAnimatedMetricCards: React.FC<SalesAnimatedMetricCardsProps> = ({ 
  data, 
  onMetricClick 
}) => {
  const { metrics } = useSalesMetrics(data);

  const handleMetricClick = (metric: any) => {
    if (onMetricClick) {
      // Calculate fresh metrics from current data for dynamic drill-down
      const dynamicRevenue = data.reduce((sum, item) => sum + (item.paymentValue || 0), 0);
      const dynamicTransactions = data.length;
      const dynamicCustomers = new Set(data.map(item => item.memberId || item.customerEmail)).size;
      
      const drillDownData = {
        title: metric.title,
        name: metric.title,
        type: 'metric',
        // Use dynamic calculations from current filtered data
        totalRevenue: dynamicRevenue,
        grossRevenue: dynamicRevenue,
        netRevenue: dynamicRevenue,
        totalValue: dynamicRevenue,
        totalCurrent: dynamicRevenue,
        metricValue: dynamicRevenue,
        transactions: dynamicTransactions,
        totalTransactions: dynamicTransactions,
        uniqueMembers: dynamicCustomers,
        totalCustomers: dynamicCustomers,
        totalChange: metric.change,
        rawData: data,
        filteredTransactionData: data,
        months: {},
        monthlyValues: {},
        // Add dynamic flags
        isDynamic: true,
        calculatedFromFiltered: true
      };
      
      console.log(`Metric ${metric.title} clicked: ${dynamicTransactions} transactions, ${dynamicRevenue} revenue`);
      onMetricClick(drillDownData);
    }
  };

  if (metrics.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="bg-gray-100 animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || DollarSign;
        const isPositive = metric.change > 0;
        
        return (
          <Card 
            key={index} 
            className={cn(
              "bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-700 group cursor-pointer",
              "hover:scale-[1.02] hover:-translate-y-1 transform-gpu"
            )}
            onClick={() => handleMetricClick(metric)}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${
                metric.color === 'blue' ? 'from-blue-500 via-blue-600 to-indigo-700' :
                metric.color === 'green' ? 'from-green-500 via-green-600 to-teal-700' :
                metric.color === 'purple' ? 'from-purple-500 via-purple-600 to-violet-700' :
                metric.color === 'orange' ? 'from-orange-500 via-orange-600 to-red-700' :
                metric.color === 'cyan' ? 'from-cyan-500 via-cyan-600 to-blue-700' :
                metric.color === 'pink' ? 'from-pink-500 via-pink-600 to-rose-700' :
                metric.color === 'red' ? 'from-red-500 via-red-600 to-rose-700' :
                'from-amber-500 via-amber-600 to-orange-700'
              } p-6 text-white relative overflow-hidden`}>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-10 -translate-y-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <IconComponent className="w-24 h-24" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 transform -translate-x-8 translate-y-8 opacity-5">
                  <IconComponent className="w-16 h-16" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-white/30 transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-sm tracking-wide">{metric.title}</h3>
                    </div>
                    
                    {/* Growth Indicator Badge - Top Right */}
                    <div className={cn(
                      "flex flex-col items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 shrink-0 group",
                      "bg-white/0 hover:bg-white/95 border-white/30 hover:border-white/50",
                      "shadow-lg hover:shadow-xl transform hover:scale-105"
                    )}>
                      {/* Growth Percentage and Direction */}
                      <div className={cn(
                        "flex items-center gap-1.5 transition-colors duration-300",
                        isPositive ? "text-green-200 group-hover:text-green-600" : "text-red-200 group-hover:text-red-600"
                      )}>
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="font-bold text-sm">
                          {isPositive ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                      </div>
                      
                      {/* Significance Badge */}
                      {metric.changeDetails?.isSignificant && (
                        <div className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-bold transition-colors duration-300",
                          "text-white/80 group-hover:text-slate-700",
                          metric.changeDetails.trend === 'strong' ? "bg-white/20 group-hover:bg-white/90" :
                          "bg-white/10 group-hover:bg-white/70"
                        )}>
                          {metric.changeDetails.trend.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Main Value */}
                  <div className="mb-4">
                    <p className="text-4xl font-bold mb-2 tracking-tight group-hover:text-white/95 transition-colors duration-300">
                      {metric.value}
                    </p>
                  </div>
                  
                  {/* Previous Value Comparison */}
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider">Previous</div>
                        <div className="text-sm font-semibold text-white/90">{metric.previousValue}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/70 font-medium uppercase tracking-wider">Difference</div>
                        <div className={cn(
                          "text-sm font-bold",
                          isPositive ? "text-green-200" : "text-red-200"
                        )}>
                          {isPositive ? '+' : ''}{formatCurrency(Math.abs(metric.comparison.difference))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description section with modern styling */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 border-t border-white/20">
                <p className="text-sm text-slate-600 leading-relaxed">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
