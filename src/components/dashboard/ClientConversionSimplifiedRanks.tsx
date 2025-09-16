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
  selectedLocation: string;
  onDrillDown?: (type: string, item: any, metric: string) => void;
}

export const ClientConversionSimplifiedRanks: React.FC<ClientConversionSimplifiedRanksProps> = ({ 
  data, 
  payrollData, 
  selectedLocation, 
  onDrillDown 
}) => {
  const [selectedRanking, setSelectedRanking] = useState('trainer-conversion');
  const [showMore, setShowMore] = useState(false);

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

  // Calculate trainer stats using both filtered New Client data and filtered Payroll data
  const trainerStats = React.useMemo(() => {
    if (!filteredPayrollData || filteredPayrollData.length === 0) return [];
    
    const stats = new Map();
    
    // First, get base stats from filtered payroll data (class data)
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
    
    // Then, add filtered client data for LTV calculations
    data.forEach(client => {
      const trainer = client.trainerName;
      if (!trainer || trainer === 'Unknown' || !stats.has(trainer)) return;
      
      const trainerStat = stats.get(trainer);
      trainerStat.totalLTV += client.ltv || 0;
      trainerStat.clientCount++;
    });
    
    return Array.from(stats.values()).map(stat => ({
      ...stat,
      conversionRate: stat.totalNew > 0 ? (stat.totalConverted / stat.totalNew) * 100 : 0,
      retentionRate: stat.totalConverted > 0 ? (stat.totalRetained / stat.totalConverted) * 100 : 0,
      classAverage: stat.totalNonEmptySessions > 0 ? stat.totalCustomers / stat.totalNonEmptySessions : 0,
      avgLTV: stat.clientCount > 0 ? stat.totalLTV / stat.clientCount : 0,
      emptyClassRate: stat.totalSessions > 0 ? (stat.totalEmptySessions / stat.totalSessions) * 100 : 0
    })).filter(stat => stat.totalSessions > 0); // Only include trainers with sessions
  }, [data, filteredPayrollData]);

  // Calculate location stats using both filtered datasets
  const locationStats = React.useMemo(() => {
    if (!filteredPayrollData || filteredPayrollData.length === 0) return [];
    
    const stats = new Map();
    
    // Get base stats from filtered payroll data
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
    
    // Add filtered client data for LTV calculations
    data.forEach(client => {
      const location = client.firstVisitLocation || client.homeLocation;
      if (!location || !stats.has(location)) return;
      
      const locationStat = stats.get(location);
      locationStat.totalLTV += client.ltv || 0;
      locationStat.clientCount++;
    });
    
    return Array.from(stats.values()).map(stat => ({
      ...stat,
      conversionRate: stat.totalNew > 0 ? (stat.totalConverted / stat.totalNew) * 100 : 0,
      retentionRate: stat.totalConverted > 0 ? (stat.totalRetained / stat.totalConverted) * 100 : 0,
      classAverage: stat.totalNonEmptySessions > 0 ? stat.totalCustomers / stat.totalNonEmptySessions : 0,
      avgLTV: stat.clientCount > 0 ? stat.totalLTV / stat.clientCount : 0,
      emptyClassRate: stat.totalSessions > 0 ? (stat.totalEmptySessions / stat.totalSessions) * 100 : 0
    })).filter(stat => stat.totalSessions > 0);
  }, [data, filteredPayrollData]);

  // Calculate membership stats from filtered client data only
  const membershipStats = React.useMemo(() => {
    const stats = new Map();
    
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
    
    return Array.from(stats.values()).map(stat => ({
      ...stat,
      conversionRate: stat.newMembers > 0 ? (stat.converted / stat.newMembers) * 100 : 0,
      retentionRate: stat.converted > 0 ? (stat.retained / stat.converted) * 100 : 0,
      avgLTV: stat.totalClients > 0 ? stat.totalLTV / stat.totalClients : 0
    })).filter(stat => stat.totalClients > 0);
  }, [data]);

  // Simplified ranking options - only the most important metrics
  const rankingOptions = [
    // Trainer Rankings
    { id: 'trainer-conversion', label: 'Trainer Conversion Rate', icon: Trophy, type: 'trainer', metric: 'conversionRate' },
    { id: 'trainer-classes', label: 'Classes Taught', icon: Calendar, type: 'trainer', metric: 'totalSessions' },
    { id: 'trainer-average', label: 'Class Average', icon: BarChart3, type: 'trainer', metric: 'classAverage' },
    { id: 'trainer-empty', label: 'Empty Classes', icon: XCircle, type: 'trainer', metric: 'emptyClassRate' },
    
    // Location Rankings
    { id: 'location-conversion', label: 'Location Conversion Rate', icon: MapPin, type: 'location', metric: 'conversionRate' },
    { id: 'location-classes', label: 'Total Sessions', icon: Calendar, type: 'location', metric: 'totalSessions' },
    { id: 'location-average', label: 'Class Average', icon: BarChart3, type: 'location', metric: 'classAverage' },
    { id: 'location-empty', label: 'Empty Classes', icon: XCircle, type: 'location', metric: 'emptyClassRate' },
    
    // Membership Rankings
    { id: 'membership-conversion', label: 'Membership Conversion', icon: Target, type: 'membership', metric: 'conversionRate' },
    { id: 'membership-ltv', label: 'Membership LTV', icon: DollarSign, type: 'membership', metric: 'avgLTV' }
  ];

  const getCurrentData = () => {
    const option = rankingOptions.find(r => r.id === selectedRanking);
    if (!option) return { top: [], bottom: [], allData: [] };

    let sourceData;
    switch (option.type) {
      case 'trainer':
        sourceData = trainerStats;
        break;
      case 'location':
        sourceData = locationStats;
        break;
      case 'membership':
        sourceData = membershipStats;
        break;
      default:
        sourceData = trainerStats;
    }

    // Filter out entries with insufficient data
    const minThreshold = option.type === 'membership' ? 5 : 3;
    const filtered = sourceData.filter(item => {
      if (option.type === 'membership') {
        return item.totalClients >= minThreshold;
      }
      return (item.totalSessions || 0) >= minThreshold;
    });
    
    const sorted = [...filtered].sort((a, b) => {
      // For empty class rate, we want ascending order (lower is better)
      if (option.metric === 'emptyClassRate') {
        return a[option.metric] - b[option.metric];
      }
      return b[option.metric] - a[option.metric];
    });
    
    const displayCount = showMore ? Math.max(10, sorted.length) : 5;
    
    return {
      top: sorted.slice(0, displayCount),
      bottom: option.metric === 'emptyClassRate' ? 
        sorted.slice(-displayCount).reverse() : 
        sorted.slice(-displayCount).reverse(),
      allData: sorted,
      hasMore: sorted.length > 5
    };
  };

  const { top, bottom, allData, hasMore } = getCurrentData();
  const currentOption = rankingOptions.find(r => r.id === selectedRanking);

  const formatValue = (value: number, metric: string) => {
    if (metric === 'avgLTV') return formatCurrency(value);
    if (metric === 'totalSessions' || metric === 'classAverage') return value.toFixed(1);
    return `${value.toFixed(1)}%`;
  };

  const getSecondaryMetric = (item: any, type: string) => {
    if (type === 'trainer' || type === 'location') {
      return `${item.totalSessions || 0} sessions • ${(item.emptyClassRate || 0).toFixed(1)}% empty`;
    }
    return `${item.totalClients || 0} clients`;
  };

  const RankCard = ({ title, data: rankData, isTop = true }) => (
    <Card className="group bg-white shadow-lg border-0 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
      <CardHeader className={`bg-gradient-to-r ${
        isTop 
          ? 'from-emerald-500 to-teal-600' 
          : 'from-orange-500 to-red-600'
      } text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8 opacity-20">
          {isTop ? <Crown className="w-20 h-20" /> : <AlertTriangle className="w-20 h-20" />}
        </div>
        <CardTitle className="flex items-center gap-3 relative z-10">
          {isTop ? <Crown className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm opacity-90 font-normal">
              {isTop ? 'Top performers' : 'Needs attention'}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {rankData.map((item, index) => (
          <div 
            key={item.name} 
            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-slate-100 hover:to-slate-200 transition-all duration-300 group-hover:scale-105 cursor-pointer hover:shadow-md"
            onClick={() => onDrillDown?.(currentOption?.type || 'trainer', item, currentOption?.metric || 'conversionRate')}
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                index === 0 && isTop ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' :
                index === 1 && isTop ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg' :
                index === 2 && isTop ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg' :
                'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-600'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-bold text-slate-900 truncate max-w-[200px]" title={item.name}>
                  {item.name}
                </p>
                <p className="text-sm text-slate-500">
                  {getSecondaryMetric(item, currentOption?.type || 'trainer')}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                <Badge 
                  className={`font-bold text-sm px-3 py-1 ${
                    isTop 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-orange-100 text-orange-800 border border-orange-200'
                  }`}
                >
                  {formatValue(item[currentOption?.metric || 'conversionRate'], currentOption?.metric || 'conversionRate')}
                </Badge>
                {(currentOption?.type === 'trainer' || currentOption?.type === 'location') && (
                  <p className="text-xs text-slate-500 mt-1">
                    {item.classAverage?.toFixed(1)} avg
                  </p>
                )}
              </div>
              <Eye className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
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
      {/* Ranking Selection Buttons */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Performance Rankings
            <span className="text-sm font-normal text-slate-500 ml-2">
              Based on filtered data ({data.length} clients, {filteredPayrollData.length} payroll records)
            </span>
          </CardTitle>
          {selectedLocation !== 'All Locations' && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
              <MapPin className="w-4 h-4" />
              Filtered by: {selectedLocation}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {rankingOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedRanking === option.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedRanking(option.id)}
                className={`flex flex-col items-center gap-2 h-auto py-3 px-2 transition-all duration-300 hover:scale-105 ${
                  selectedRanking === option.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span className="text-xs font-medium text-center leading-tight">
                  {option.label}
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
              {currentOption?.type === 'membership' ? 'Memberships' : 
               currentOption?.type === 'location' ? 'Locations' : 'Trainers'} with sufficient data
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

      {/* Top and Bottom Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RankCard
          title={`Best ${currentOption?.label || 'Performance'}`}
          data={top}
          isTop={true}
        />
        
        <RankCard
          title={`${currentOption?.metric === 'emptyClassRate' ? 'Most' : 'Lowest'} ${currentOption?.label || 'Performance'}`}
          data={bottom}
          isTop={false}
        />
      </div>
      
      {/* Click to drill down instruction */}
      <div className="text-center text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
        💡 Click on any ranking item to view detailed analytics and drill-down insights
      </div>
    </div>
  );
};
