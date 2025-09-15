import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Calendar, Target, BarChart3, Clock, DollarSign, ArrowUpRight, ArrowDownRight, Activity, UserCheck, Percent, Building2 } from 'lucide-react';
import { SessionData } from '@/hooks/useSessionsData';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface SuperEnhancedMetricCardsProps {
  data: SessionData[];
  payrollData: any[];
  onMetricClick?: (metricData: any) => void;
}

const iconMap = {
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Target,
  Calendar,
  Clock,
  UserCheck
};

export const SuperEnhancedMetricCards: React.FC<SuperEnhancedMetricCardsProps> = ({ 
  data, 
  payrollData, 
  onMetricClick 
}) => {
  const metrics = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const totalSessions = data.length;
    const totalAttendance = data.reduce((sum, session) => sum + (session.checkedInCount || 0), 0);
    const totalCapacity = data.reduce((sum, session) => sum + (session.capacity || 0), 0);
    const totalRevenue = data.reduce((sum, session) => sum + (session.totalPaid || 0), 0);
    const totalBooked = data.reduce((sum, session) => sum + (session.bookedCount || 0), 0);
    const totalLateCancelled = data.reduce((sum, session) => sum + (session.lateCancelledCount || 0), 0);
    
    const fillRate = totalCapacity > 0 ? (totalAttendance / totalCapacity) * 100 : 0;
    const avgClassSize = totalSessions > 0 ? totalAttendance / totalSessions : 0;
    const cancelRate = totalBooked > 0 ? (totalLateCancelled / totalBooked) * 100 : 0;
    const bookingRate = totalCapacity > 0 ? (totalBooked / totalCapacity) * 100 : 0;
    
    // Calculate comparison data (using mock previous period for now)
    const previousRevenue = totalRevenue * 0.85; // Mock 15% growth
    const previousSessions = totalSessions * 0.92; // Mock 8% growth
    const previousAttendance = totalAttendance * 0.88; // Mock 12% growth
    const previousFillRate = fillRate * 0.95; // Mock 5% improvement
    
    return [
      {
        title: 'Total Revenue',
        value: formatCurrency(totalRevenue),
        previousValue: formatCurrency(previousRevenue),
        change: ((totalRevenue - previousRevenue) / previousRevenue) * 100,
        comparison: { difference: totalRevenue - previousRevenue },
        description: 'Total revenue generated from all class sessions',
        icon: 'DollarSign',
        color: 'blue',
        changeDetails: { isSignificant: true, trend: 'strong' }
      },
      {
        title: 'Total Sessions',
        value: formatNumber(totalSessions),
        previousValue: formatNumber(previousSessions),
        change: ((totalSessions - previousSessions) / previousSessions) * 100,
        comparison: { difference: totalSessions - previousSessions },
        description: 'Total number of class sessions conducted',
        icon: 'Calendar',
        color: 'green',
        changeDetails: { isSignificant: true, trend: 'moderate' }
      },
      {
        title: 'Total Attendance',
        value: formatNumber(totalAttendance),
        previousValue: formatNumber(previousAttendance),
        change: ((totalAttendance - previousAttendance) / previousAttendance) * 100,
        comparison: { difference: totalAttendance - previousAttendance },
        description: 'Total number of attendees across all sessions',
        icon: 'Users',
        color: 'purple',
        changeDetails: { isSignificant: true, trend: 'strong' }
      },
      {
        title: 'Fill Rate',
        value: formatPercentage(fillRate),
        previousValue: formatPercentage(previousFillRate),
        change: ((fillRate - previousFillRate) / previousFillRate) * 100,
        comparison: { difference: fillRate - previousFillRate },
        description: 'Percentage of capacity filled across all sessions',
        icon: 'Target',
        color: 'orange',
        changeDetails: { isSignificant: true, trend: 'moderate' }
      },
      {
        title: 'Avg Class Size',
        value: formatNumber(avgClassSize),
        previousValue: formatNumber(avgClassSize * 0.92),
        change: 8.7,
        comparison: { difference: avgClassSize * 0.08 },
        description: 'Average number of attendees per class session',
        icon: 'Activity',
        color: 'cyan',
        changeDetails: { isSignificant: true, trend: 'moderate' }
      },
      {
        title: 'Booking Rate',
        value: formatPercentage(bookingRate),
        previousValue: formatPercentage(bookingRate * 0.88),
        change: 13.6,
        comparison: { difference: bookingRate * 0.12 },
        description: 'Percentage of capacity that was booked',
        icon: 'UserCheck',
        color: 'pink',
        changeDetails: { isSignificant: true, trend: 'strong' }
      },
      {
        title: 'Late Cancel Rate',
        value: formatPercentage(cancelRate),
        previousValue: formatPercentage(cancelRate * 1.15),
        change: -13.0,
        comparison: { difference: -(cancelRate * 0.15) },
        description: 'Percentage of bookings that were cancelled late',
        icon: 'Clock',
        color: 'red',
        changeDetails: { isSignificant: true, trend: 'strong' }
      },
      {
        title: 'Total Capacity',
        value: formatNumber(totalCapacity),
        previousValue: formatNumber(totalCapacity * 0.95),
        change: 5.3,
        comparison: { difference: totalCapacity * 0.05 },
        description: 'Total capacity available across all sessions',
        icon: 'Building2',
        color: 'amber',
        changeDetails: { isSignificant: false, trend: 'moderate' }
      }
    ];
  }, [data, payrollData]);

  const handleMetricClick = (metric: any) => {
    if (onMetricClick) {
      // Calculate fresh metrics from current data for dynamic drill-down
      const dynamicRevenue = data.reduce((sum, item) => sum + (item.totalPaid || 0), 0);
      const dynamicSessions = data.length;
      const dynamicAttendance = data.reduce((sum, item) => sum + (item.checkedInCount || 0), 0);
      
      const drillDownData = {
        title: metric.title,
        name: metric.title,
        type: 'metric',
        totalRevenue: dynamicRevenue,
        grossRevenue: dynamicRevenue,
        netRevenue: dynamicRevenue,
        totalValue: dynamicRevenue,
        totalCurrent: dynamicRevenue,
        metricValue: dynamicRevenue,
        sessions: dynamicSessions,
        totalSessions: dynamicSessions,
        attendance: dynamicAttendance,
        totalAttendance: dynamicAttendance,
        totalChange: metric.change,
        rawData: data,
        filteredSessionData: data,
        months: {},
        monthlyValues: {},
        isDynamic: true,
        calculatedFromFiltered: true
      };
      
      console.log(`Metric ${metric.title} clicked: ${dynamicSessions} sessions, ${dynamicAttendance} attendance`);
      onMetricClick(drillDownData);
    }
  };

  if (!metrics || metrics.length === 0) {
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
        const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || BarChart3;
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
                          {isPositive ? '+' : ''}{typeof metric.comparison.difference === 'number' 
                            ? (metric.title.includes('Revenue') ? formatCurrency(Math.abs(metric.comparison.difference)) : formatNumber(Math.abs(metric.comparison.difference)))
                            : metric.comparison.difference}
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