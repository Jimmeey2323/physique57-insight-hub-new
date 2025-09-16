import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  TrendingDown, 
  MapPin, 
  Users, 
  DollarSign, 
  Target, 
  Crown, 
  AlertTriangle,
  BarChart3,
  XCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  TrendingUp
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { NewClientData, PayrollData } from '@/types/dashboard';

interface ClientConversionSimplifiedRanksProps {
  data: NewClientData[];
  payrollData: PayrollData[];
  allPayrollData: PayrollData[];
  allClientData: NewClientData[];
  selectedLocation: string;
  dateRange: { start: string; end: string };
  selectedMetric?: string; // New prop to control which metric to display
  onDrillDown?: (type: string, item: any, metric: string) => void;
}

export const ClientConversionSimplifiedRanks: React.FC<ClientConversionSimplifiedRanksProps> = ({ 
  data, 
  payrollData, 
  allPayrollData,
  allClientData,
  selectedLocation, 
  dateRange,
  selectedMetric,
  onDrillDown 
}) => {
  const [selectedRanking, setSelectedRanking] = useState('trainer-conversion');
  const [showMore, setShowMore] = useState(false);
  const [selectedType, setSelectedType] = useState<'trainer' | 'location'>('trainer');

  // Calculate previous period dates for growth comparison
  const getPreviousPeriod = (currentStart: string, currentEnd: string) => {
    const start = new Date(currentStart);
    const end = new Date(currentEnd);
    const periodLength = end.getTime() - start.getTime();
    
    const prevEnd = new Date(start.getTime() - 24 * 60 * 60 * 1000); // day before current start
    const prevStart = new Date(prevEnd.getTime() - periodLength);
    
    return {
      start: prevStart.toISOString().split('T')[0],
      end: prevEnd.toISOString().split('T')[0]
    };
  };

  // Get filtered data for previous period
  const getPreviousPeriodData = (isClient: boolean = true) => {
    if (!dateRange.start || !dateRange.end) return [];
    
    const prevPeriod = getPreviousPeriod(dateRange.start, dateRange.end);
    const dataSource = isClient ? allClientData : allPayrollData;
    
    return dataSource.filter(item => {
      if (isClient) {
        const client = item as NewClientData;
        if (!client.firstVisitDate) return false;
        
        const itemDate = new Date(client.firstVisitDate);
        const prevStart = new Date(prevPeriod.start);
        const prevEnd = new Date(prevPeriod.end);
        
        return itemDate >= prevStart && itemDate <= prevEnd;
      } else {
        const payroll = item as PayrollData;
        if (!payroll.monthYear) return false;
        
        // Parse monthYear and check if it falls in previous period
        let payrollDate: Date;
        if (payroll.monthYear.includes('-')) {
          payrollDate = new Date(payroll.monthYear + '-01');
        } else {
          payrollDate = new Date(payroll.monthYear + ' 01');
        }
        
        if (isNaN(payrollDate.getTime())) return false;
        
        const prevStart = new Date(prevPeriod.start);
        const prevEnd = new Date(prevPeriod.end);
        
        return payrollDate >= prevStart && payrollDate <= prevEnd;
      }
    });
  };

  // Apply location filter to previous period data
  const filterByLocation = (dataArray: any[], isClient: boolean = true) => {
    if (selectedLocation === 'All Locations') return dataArray;
    
    return dataArray.filter(item => {
      if (isClient) {
        const client = item as NewClientData;
        const firstLocation = client.firstVisitLocation || '';
        const homeLocation = client.homeLocation || '';
        
        if (selectedLocation === 'Kenkere House, Bengaluru') {
          const matchesFirst = firstLocation.toLowerCase().includes('kenkere') || firstLocation.toLowerCase().includes('bengaluru') || firstLocation === 'Kenkere House';
          const matchesHome = homeLocation.toLowerCase().includes('kenkere') || homeLocation.toLowerCase().includes('bengaluru') || homeLocation === 'Kenkere House';
          return matchesFirst || matchesHome;
        }
        
        return firstLocation === selectedLocation || homeLocation === selectedLocation;
      } else {
        const payroll = item as PayrollData;
        const payrollLocation = payroll.location || '';
        
        if (selectedLocation === 'Kenkere House, Bengaluru') {
          return payrollLocation.toLowerCase().includes('kenkere') || 
                 payrollLocation.toLowerCase().includes('bengaluru');
        }
        
        return payrollLocation === selectedLocation;
      }
    });
  };

  const previousPeriodClientData = filterByLocation(getPreviousPeriodData(true), true);
  const previousPeriodPayrollData = filterByLocation(getPreviousPeriodData(false), false);

  // Filter payroll data based on selected location
  const filteredPayrollData = React.useMemo(() => {
    if (!payrollData || payrollData.length === 0) return [];
    
    if (selectedLocation === 'All Locations') return payrollData;
    
    return payrollData.filter(payroll => {
      const payrollLocation = payroll.location || '';
      
      // For Kenkere House, use flexible matching
      if (selectedLocation === 'Kenkere House, Bengaluru') {
        return payrollLocation.toLowerCase().includes('kenkere') || 
               payrollLocation.toLowerCase().includes('bengaluru');
      }
      
      // For other locations, use exact match
      return payrollLocation === selectedLocation;
    });
  }, [payrollData, selectedLocation]);

  // Calculate trainer stats using both filtered New Client data and filtered Payroll data with growth
  const trainerStats = React.useMemo(() => {
    if (!filteredPayrollData || filteredPayrollData.length === 0) return [];
    
    const stats = new Map();
    const prevStats = new Map();
    
    // Calculate current period stats
    filteredPayrollData.forEach(payroll => {
      const trainer = payroll.teacherName;
      if (!trainer || trainer === 'Unknown') return;
      
      if (!stats.has(trainer)) {
        stats.set(trainer, {
          name: trainer,
          location: payroll.location,
          totalSessions: 0,
          totalEmptySessions: 0,
          totalNonEmptySessions: 0,
          totalCustomers: 0,
          totalConverted: 0,
          totalRetained: 0,
          totalNew: 0,
          totalLTV: 0,
          clientCount: 0
        });
      }
      
      const trainerStat = stats.get(trainer);
      trainerStat.totalSessions += payroll.totalSessions || 0;
      trainerStat.totalEmptySessions += payroll.totalEmptySessions || 0;
      trainerStat.totalNonEmptySessions += payroll.totalNonEmptySessions || 0;
      trainerStat.totalCustomers += payroll.totalCustomers || 0;
      trainerStat.totalConverted += payroll.converted || 0;
      trainerStat.totalRetained += payroll.retained || 0;
      trainerStat.totalNew += payroll.new || 0;
    });
    
    // Add client data for LTV calculations
    data.forEach(client => {
      const trainer = client.trainerName;
      if (!trainer || trainer === 'Unknown' || !stats.has(trainer)) return;
      
      const trainerStat = stats.get(trainer);
      trainerStat.totalLTV += client.ltv || 0;
      trainerStat.clientCount++;
    });

    // Calculate previous period stats for growth comparison
    previousPeriodPayrollData.forEach(payroll => {
      const trainer = payroll.teacherName;
      if (!trainer || trainer === 'Unknown') return;
      
      if (!prevStats.has(trainer)) {
        prevStats.set(trainer, {
          totalSessions: 0,
          totalEmptySessions: 0,
          totalNonEmptySessions: 0,
          totalCustomers: 0,
          totalConverted: 0,
          totalRetained: 0,
          totalNew: 0,
          totalLTV: 0,
          clientCount: 0
        });
      }
      
      const trainerStat = prevStats.get(trainer);
      trainerStat.totalSessions += payroll.totalSessions || 0;
      trainerStat.totalEmptySessions += payroll.totalEmptySessions || 0;
      trainerStat.totalNonEmptySessions += payroll.totalNonEmptySessions || 0;
      trainerStat.totalCustomers += payroll.totalCustomers || 0;
      trainerStat.totalConverted += payroll.converted || 0;
      trainerStat.totalRetained += payroll.retained || 0;
      trainerStat.totalNew += payroll.new || 0;
    });

    // Add previous period client data
    previousPeriodClientData.forEach(client => {
      const trainer = client.trainerName;
      if (!trainer || trainer === 'Unknown' || !prevStats.has(trainer)) return;
      
      const trainerStat = prevStats.get(trainer);
      trainerStat.totalLTV += client.ltv || 0;
      trainerStat.clientCount++;
    });
    
    return Array.from(stats.values()).map(stat => {
      const conversionRate = stat.totalNew > 0 ? (stat.totalConverted / stat.totalNew) * 100 : 0;
      const retentionRate = stat.totalConverted > 0 ? (stat.totalRetained / stat.totalConverted) * 100 : 0;
      const classAverage = stat.totalNonEmptySessions > 0 ? stat.totalCustomers / stat.totalNonEmptySessions : 0;
      const avgLTV = stat.clientCount > 0 ? stat.totalLTV / stat.clientCount : 0;
      const emptyClassRate = stat.totalSessions > 0 ? (stat.totalEmptySessions / stat.totalSessions) * 100 : 0;

      // Calculate growth metrics
      const prevStat = prevStats.get(stat.name);
      let conversionGrowth = 0;
      let classAverageGrowth = 0;
      let sessionsGrowth = 0;
      let emptyClassRateGrowth = 0;

      if (prevStat) {
        const prevConversionRate = prevStat.totalNew > 0 ? (prevStat.totalConverted / prevStat.totalNew) * 100 : 0;
        const prevClassAverage = prevStat.totalNonEmptySessions > 0 ? prevStat.totalCustomers / prevStat.totalNonEmptySessions : 0;
        const prevEmptyClassRate = prevStat.totalSessions > 0 ? (prevStat.totalEmptySessions / prevStat.totalSessions) * 100 : 0;

        conversionGrowth = prevConversionRate > 0 ? ((conversionRate - prevConversionRate) / prevConversionRate) * 100 : 0;
        classAverageGrowth = prevClassAverage > 0 ? ((classAverage - prevClassAverage) / prevClassAverage) * 100 : 0;
        sessionsGrowth = prevStat.totalSessions > 0 ? ((stat.totalSessions - prevStat.totalSessions) / prevStat.totalSessions) * 100 : 0;
        emptyClassRateGrowth = prevEmptyClassRate > 0 ? ((emptyClassRate - prevEmptyClassRate) / prevEmptyClassRate) * 100 : 0;
      }

      return {
        ...stat,
        conversionRate,
        retentionRate,
        classAverage,
        avgLTV,
        emptyClassRate,
        conversionGrowth,
        classAverageGrowth,
        sessionsGrowth,
        emptyClassRateGrowth
      };
    }).filter(stat => stat.totalSessions > 0);
  }, [data, filteredPayrollData, previousPeriodPayrollData, previousPeriodClientData]);

  // Calculate location stats using both filtered datasets with growth
  const locationStats = React.useMemo(() => {
    if (!filteredPayrollData || filteredPayrollData.length === 0) return [];
    
    const stats = new Map();
    const prevStats = new Map();
    
    // Current period stats
    filteredPayrollData.forEach(payroll => {
      const location = payroll.location;
      if (!location) return;
      
      if (!stats.has(location)) {
        stats.set(location, {
          name: location,
          totalSessions: 0,
          totalEmptySessions: 0,
          totalNonEmptySessions: 0,
          totalCustomers: 0,
          totalConverted: 0,
          totalRetained: 0,
          totalNew: 0,
          totalLTV: 0,
          clientCount: 0
        });
      }
      
      const locationStat = stats.get(location);
      locationStat.totalSessions += payroll.totalSessions || 0;
      locationStat.totalEmptySessions += payroll.totalEmptySessions || 0;
      locationStat.totalNonEmptySessions += payroll.totalNonEmptySessions || 0;
      locationStat.totalCustomers += payroll.totalCustomers || 0;
      locationStat.totalConverted += payroll.converted || 0;
      locationStat.totalRetained += payroll.retained || 0;
      locationStat.totalNew += payroll.new || 0;
    });
    
    // Add client data for LTV
    data.forEach(client => {
      const location = client.firstVisitLocation || client.homeLocation;
      if (!location || !stats.has(location)) return;
      
      const locationStat = stats.get(location);
      locationStat.totalLTV += client.ltv || 0;
      locationStat.clientCount++;
    });

    // Previous period stats
    previousPeriodPayrollData.forEach(payroll => {
      const location = payroll.location;
      if (!location) return;
      
      if (!prevStats.has(location)) {
        prevStats.set(location, {
          totalSessions: 0,
          totalEmptySessions: 0,
          totalNonEmptySessions: 0,
          totalCustomers: 0,
          totalConverted: 0,
          totalRetained: 0,
          totalNew: 0,
          totalLTV: 0,
          clientCount: 0
        });
      }
      
      const locationStat = prevStats.get(location);
      locationStat.totalSessions += payroll.totalSessions || 0;
      locationStat.totalEmptySessions += payroll.totalEmptySessions || 0;
      locationStat.totalNonEmptySessions += payroll.totalNonEmptySessions || 0;
      locationStat.totalCustomers += payroll.totalCustomers || 0;
      locationStat.totalConverted += payroll.converted || 0;
      locationStat.totalRetained += payroll.retained || 0;
      locationStat.totalNew += payroll.new || 0;
    });

    previousPeriodClientData.forEach(client => {
      const location = client.firstVisitLocation || client.homeLocation;
      if (!location || !prevStats.has(location)) return;
      
      const locationStat = prevStats.get(location);
      locationStat.totalLTV += client.ltv || 0;
      locationStat.clientCount++;
    });
    
    return Array.from(stats.values()).map(stat => {
      const conversionRate = stat.totalNew > 0 ? (stat.totalConverted / stat.totalNew) * 100 : 0;
      const retentionRate = stat.totalConverted > 0 ? (stat.totalRetained / stat.totalConverted) * 100 : 0;
      const classAverage = stat.totalNonEmptySessions > 0 ? stat.totalCustomers / stat.totalNonEmptySessions : 0;
      const avgLTV = stat.clientCount > 0 ? stat.totalLTV / stat.clientCount : 0;
      const emptyClassRate = stat.totalSessions > 0 ? (stat.totalEmptySessions / stat.totalSessions) * 100 : 0;

      // Calculate growth metrics
      const prevStat = prevStats.get(stat.name);
      let sessionsGrowth = 0;
      let customersGrowth = 0;
      let classAverageGrowth = 0;

      if (prevStat) {
        const prevClassAverage = prevStat.totalNonEmptySessions > 0 ? prevStat.totalCustomers / prevStat.totalNonEmptySessions : 0;
        
        sessionsGrowth = prevStat.totalSessions > 0 ? ((stat.totalSessions - prevStat.totalSessions) / prevStat.totalSessions) * 100 : 0;
        customersGrowth = prevStat.totalCustomers > 0 ? ((stat.totalCustomers - prevStat.totalCustomers) / prevStat.totalCustomers) * 100 : 0;
        classAverageGrowth = prevClassAverage > 0 ? ((classAverage - prevClassAverage) / prevClassAverage) * 100 : 0;
      }

      return {
        ...stat,
        conversionRate,
        retentionRate,
        classAverage,
        avgLTV,
        emptyClassRate,
        sessionsGrowth,
        customersGrowth,
        classAverageGrowth
      };
    }).filter(stat => stat.totalSessions > 0);
  }, [data, filteredPayrollData, previousPeriodPayrollData, previousPeriodClientData]);

  // Calculate membership stats from filtered client data with growth
  const membershipStats = React.useMemo(() => {
    const stats = new Map();
    const prevStats = new Map();
    
    // Current period stats
    data.forEach(client => {
      const membership = client.membershipUsed || 'Unknown Membership';
      if (!stats.has(membership)) {
        stats.set(membership, {
          name: membership,
          totalClients: 0,
          newMembers: 0,
          converted: 0,
          retained: 0,
          totalLTV: 0
        });
      }
      
      const membershipStat = stats.get(membership);
      membershipStat.totalClients++;
      membershipStat.totalLTV += client.ltv || 0;
      
      if (String(client.isNew || '').includes('New')) {
        membershipStat.newMembers++;
      }
      if (client.conversionStatus === 'Converted') {
        membershipStat.converted++;
      }
      if (client.retentionStatus === 'Retained') {
        membershipStat.retained++;
      }
    });

    // Previous period stats
    previousPeriodClientData.forEach(client => {
      const membership = client.membershipUsed || 'Unknown Membership';
      if (!prevStats.has(membership)) {
        prevStats.set(membership, {
          totalClients: 0,
          newMembers: 0,
          converted: 0,
          retained: 0,
          totalLTV: 0
        });
      }
      
      const membershipStat = prevStats.get(membership);
      membershipStat.totalClients++;
      membershipStat.totalLTV += client.ltv || 0;
      
      if (String(client.isNew || '').includes('New')) {
        membershipStat.newMembers++;
      }
      if (client.conversionStatus === 'Converted') {
        membershipStat.converted++;
      }
      if (client.retentionStatus === 'Retained') {
        membershipStat.retained++;
      }
    });
    
    return Array.from(stats.values()).map(stat => {
      const conversionRate = stat.newMembers > 0 ? (stat.converted / stat.newMembers) * 100 : 0;
      const retentionRate = stat.converted > 0 ? (stat.retained / stat.converted) * 100 : 0;
      const avgLTV = stat.totalClients > 0 ? stat.totalLTV / stat.totalClients : 0;

      // Calculate growth metrics
      const prevStat = prevStats.get(stat.name);
      let conversionGrowth = 0;
      let clientsGrowth = 0;
      let ltvGrowth = 0;

      if (prevStat) {
        const prevConversionRate = prevStat.newMembers > 0 ? (prevStat.converted / prevStat.newMembers) * 100 : 0;
        const prevAvgLTV = prevStat.totalClients > 0 ? prevStat.totalLTV / prevStat.totalClients : 0;

        conversionGrowth = prevConversionRate > 0 ? ((conversionRate - prevConversionRate) / prevConversionRate) * 100 : 0;
        clientsGrowth = prevStat.totalClients > 0 ? ((stat.totalClients - prevStat.totalClients) / prevStat.totalClients) * 100 : 0;
        ltvGrowth = prevAvgLTV > 0 ? ((avgLTV - prevAvgLTV) / prevAvgLTV) * 100 : 0;
      }

      return {
        ...stat,
        conversionRate,
        retentionRate,
        avgLTV,
        conversionGrowth,
        clientsGrowth,
        ltvGrowth
      };
    }).filter(stat => stat.totalClients > 0);
  }, [data, previousPeriodClientData]);

  // All available metrics without any filtering
  const availableMetrics = [
    { id: 'conversion', label: 'Conversion Rate', icon: Trophy, metric: 'conversionRate' },
    { id: 'sessions', label: 'Total Sessions', icon: Calendar, metric: 'totalSessions' },
    { id: 'average', label: 'Class Average', icon: BarChart3, metric: 'classAverage' },
    { id: 'empty', label: 'Empty Classes', icon: XCircle, metric: 'emptyClassRate' },
    { id: 'customers', label: 'Total Customers', icon: Users, metric: 'totalCustomers' },
    { id: 'ltv', label: 'Average LTV', icon: DollarSign, metric: 'avgLTV' },
  ];

  // Get current ranking key based on type and metric
  const getCurrentRankingKey = (type: string, metricId: string) => {
    return `${type}-${metricId}`;
  };

  // Auto-select first available ranking when type or metric changes
  React.useEffect(() => {
    if (availableMetrics.length > 0) {
      const firstMetric = availableMetrics[0];
      const newRankingKey = getCurrentRankingKey(selectedType, firstMetric.id);
      setSelectedRanking(newRankingKey);
    }
  }, [selectedType, availableMetrics]);

  const getCurrentData = () => {
    // Get current metric from selectedRanking
    const metricId = selectedRanking.split('-')[1];
    const currentMetric = availableMetrics.find(m => m.id === metricId);
    if (!currentMetric) return { top: [], bottom: [], allData: [], hasMore: false };

    let sourceData;
    switch (selectedType) {
      case 'trainer':
        sourceData = trainerStats;
        break;
      case 'location':
        sourceData = locationStats;
        break;
      default:
        sourceData = trainerStats;
    }

    // Filter out entries with insufficient data
    const minThreshold = 3;
    const filtered = sourceData.filter(item => {
      return (item.totalSessions || 0) >= minThreshold;
    });
    
    const sorted = [...filtered].sort((a, b) => {
      // For empty class rate, we want ascending order (lower is better)
      if (currentMetric.metric === 'emptyClassRate') {
        return a[currentMetric.metric] - b[currentMetric.metric];
      }
      return b[currentMetric.metric] - a[currentMetric.metric];
    });
    
    const displayCount = showMore ? Math.max(10, sorted.length) : 5;
    
    return {
      top: sorted.slice(0, displayCount),
      bottom: currentMetric.metric === 'emptyClassRate' ? 
        sorted.slice(-displayCount).reverse() : 
        sorted.slice(-displayCount).reverse(),
      allData: sorted,
      hasMore: sorted.length > 5
    };
  };

  const { top, bottom, allData, hasMore } = getCurrentData();
  const currentMetric = availableMetrics.find(m => m.id === selectedRanking.split('-')[1]);

  const formatValue = (value: number, metric: string) => {
    if (metric === 'avgLTV') return formatCurrency(value);
    if (metric === 'totalSessions' || metric === 'classAverage') return value.toFixed(1);
    return `${value.toFixed(1)}%`;
  };

  const getSecondaryMetric = (item: any, type: string) => {
    const currentMetricValue = currentMetric?.metric;
    
    // For conversion rate rankings, show new members and converted members
    if (currentMetricValue === 'conversionRate') {
      return `${item.totalNew || 0} new • ${item.totalConverted || 0} converted`;
    }
    
    if (type === 'trainer' || type === 'location') {
      return `${item.totalSessions || 0} sessions • ${(item.emptyClassRate || 0).toFixed(1)}% empty`;
    }
    return `${item.totalClients || 0} clients`;
  };

  const getMainMetrics = (item: any, metric: string) => {
    // For conversion rankings, return multiple metrics to display
    if (metric === 'conversionRate') {
      return [
        { label: 'Conversion Rate', value: `${(item.conversionRate || 0).toFixed(1)}%`, color: 'emerald' },
        { label: 'New Members', value: formatNumber(item.totalNew || 0), color: 'blue' },
        { label: 'Converted', value: formatNumber(item.totalConverted || 0), color: 'green' }
      ];
    }
    
    // For other metrics, return single metric
    return [
      { label: currentMetric?.label || '', value: formatValue(item[metric] || 0, metric), color: 'emerald' }
    ];
  };

  const RankCard = ({ title, data: rankData, isTop = true }) => (
    <Card className="group relative overflow-hidden bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 transform-gpu">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-white opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-100/20" />
      
      <CardHeader className={`relative bg-gradient-to-r ${
        isTop 
          ? 'from-emerald-500 via-emerald-600 to-teal-600' 
          : 'from-orange-500 via-orange-600 to-red-600'
      } text-white border-0 shadow-lg overflow-hidden`}>
        {/* Enhanced animated background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110">
          {isTop ? <Crown className="w-32 h-32" /> : <AlertTriangle className="w-32 h-32" />}
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-8 translate-y-8 opacity-10 group-hover:opacity-20 transition-all duration-700">
          <Trophy className="w-24 h-24" />
        </div>
        
        <CardTitle className="flex items-center gap-3 relative z-10">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/30">
            {isTop ? <Crown className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm opacity-90 font-medium">
              {isTop ? '🏆 Top performers' : '⚠️ Needs attention'}
            </p>
          </div>
          <div className="ml-auto">
            <Badge className={`${
              isTop ? 'bg-white/20 hover:bg-white/30' : 'bg-white/20 hover:bg-white/30'
            } text-white border-0 px-3 py-1`}>
              {rankData.length} {selectedType}s
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative p-6 space-y-4 bg-gradient-to-br from-white to-slate-50/30">
        {rankData.map((item, index) => (
          <div 
            key={item.name} 
            className="group/item flex items-center justify-between p-5 bg-gradient-to-r from-white via-slate-50/50 to-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] transform-gpu relative overflow-hidden"
            onClick={() => onDrillDown?.(selectedType, item, currentMetric?.metric || 'conversionRate')}
          >
            {/* Item background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg group-hover/item:scale-110 transform-gpu ${
                index === 0 && isTop
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-yellow-200'
                  : index === 1 && isTop
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-gray-200'
                  : index === 2 && isTop
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900 shadow-orange-200'
                  : isTop
                  ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 shadow-emerald-100'
                  : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-red-100'
              }`}>
                {index === 0 && isTop ? '🏆' : index === 1 && isTop ? '🥈' : index === 2 && isTop ? '🥉' : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate max-w-[200px] group-hover/item:text-slate-800 transition-colors text-lg" title={item.name}>
                  {item.name}
                </p>
                <p className="text-sm text-slate-500 group-hover/item:text-slate-600 transition-colors">
                  {getSecondaryMetric(item, selectedType)}
                </p>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-3 relative z-10">
              {/* Multiple metrics display for conversion rankings */}
              {(() => {
                const metrics = getMainMetrics(item, currentMetric?.metric || 'conversionRate');
                
                if (metrics.length > 1) {
                  // Modern layout for conversion metrics (similar to sales tab)
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        {metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className={`font-bold text-lg ${
                              metric.color === 'emerald' ? 'text-emerald-700' :
                              metric.color === 'blue' ? 'text-blue-700' :
                              metric.color === 'green' ? 'text-green-700' : 'text-slate-700'
                            }`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Growth Indicator */}
                      {(() => {
                        const growth = item.conversionGrowth;
                        if (growth && Math.abs(growth) > 0.1) {
                          return (
                            <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              growth > 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {Math.abs(growth).toFixed(1)}%
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  );
                }
                
                // Single metric display for other rankings
                return (
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`font-bold text-lg px-4 py-2 ${
                          isTop 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                        }`}
                      >
                        {metrics[0].value}
                      </Badge>
                      {/* Growth Indicator */}
                      {(() => {
                        const getGrowthMetric = () => {
                          if (currentMetric?.metric === 'conversionRate') return item.conversionGrowth;
                          if (currentMetric?.metric === 'classAverage') return item.classAverageGrowth;
                          if (currentMetric?.metric === 'totalSessions') return item.sessionsGrowth;
                          if (currentMetric?.metric === 'emptyClassRate') return item.emptyClassRateGrowth;
                          if (currentMetric?.metric === 'totalCustomers') return item.customersGrowth;
                          if (currentMetric?.metric === 'totalClients') return item.clientsGrowth;
                          if (currentMetric?.metric === 'avgLTV') return item.ltvGrowth;
                          return 0;
                        };
                        
                        const growth = getGrowthMetric();
                        if (growth && Math.abs(growth) > 0.1) {
                          return (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              growth > 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {Math.abs(growth).toFixed(1)}%
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                );
              })()}
              
              {/* Additional details for trainers/locations */}
              {(selectedType === 'trainer' || selectedType === 'location') && (
                <p className="text-xs text-slate-500 mt-1">
                  {item.classAverage?.toFixed(1)} avg
                </p>
              )}
            </div>
            <Eye className="w-5 h-5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity ml-3 relative z-10" />
          </div>
        ))}
        
        {/* View More/Less Button */}
        {hasMore && (
          <div className="flex justify-center pt-4 border-t border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
            >
              {showMore ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View More ({allData?.length || 0} total)
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with Type Toggle */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Performance Rankings
              <Badge variant="secondary" className="bg-white/20 text-white">
                Based on filtered data ({data.length} clients, {filteredPayrollData.length} payroll records)
              </Badge>
            </CardTitle>
            {selectedLocation !== 'All Locations' && (
              <div className="flex items-center gap-2 text-sm text-blue-100 bg-blue-800/30 px-3 py-1 rounded-lg">
                <MapPin className="w-4 h-4" />
                Filtered by: {selectedLocation}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Type Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-100 p-1 rounded-xl">
              <div className="flex gap-1">
                <Button
                  variant={selectedType === 'trainer' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedType('trainer')}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    selectedType === 'trainer'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-white'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Trainer Rankings
                </Button>
                <Button
                  variant={selectedType === 'location' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedType('location')}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    selectedType === 'location'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Location Rankings
                </Button>
              </div>
            </div>
          </div>

          {/* Metric Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {availableMetrics.map((metric) => (
              <Button
                key={metric.id}
                variant={selectedRanking === getCurrentRankingKey(selectedType, metric.id) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedRanking(getCurrentRankingKey(selectedType, metric.id))}
                className={`flex flex-col items-center gap-2 h-auto py-4 px-3 transition-all duration-300 hover:scale-105 ${
                  selectedRanking === getCurrentRankingKey(selectedType, metric.id)
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'hover:bg-slate-100 hover:shadow-md'
                }`}
              >
                <metric.icon className="w-5 h-5" />
                <span className="text-xs font-medium text-center leading-tight">
                  {metric.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{allData?.length || 0}</div>
            <div className="text-sm text-blue-600">
              {selectedType === 'location' ? 'Locations' : 'Trainers'} with sufficient data
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{top.length}</div>
            <div className="text-sm text-green-600">Top performers shown</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">{bottom.length}</div>
            <div className="text-sm text-orange-600">Bottom performers shown</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Ranking Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RankCard
          title={`Best ${currentMetric?.label || 'Performance'}`}
          data={top}
          isTop={true}
        />
        
        <RankCard
          title={`${currentMetric?.metric === 'emptyClassRate' ? 'Most' : 'Lowest'} ${currentMetric?.label || 'Performance'}`}
          data={bottom}
          isTop={false}
        />
      </div>
      
      {/* Click to drill down instruction */}
      <div className="text-center text-sm text-slate-500 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Eye className="w-4 h-4" />
          <span className="font-medium">Interactive Analytics</span>
        </div>
        💡 Click on any ranking item to view detailed analytics and drill-down insights
      </div>
    </div>
  );
};
