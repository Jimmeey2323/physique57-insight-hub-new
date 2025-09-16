
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, X, Filter, Zap } from 'lucide-react';
import { PayrollData } from '@/types/dashboard';
import { getPreviousMonthDateRange } from '@/utils/dateUtils';

interface TrainerFilterSectionProps {
  data: PayrollData[];
  onFiltersChange: (filters: any) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onEfficiencyFiltersChange?: (filters: any) => void; // New prop for efficiency controls
}

export const TrainerFilterSection: React.FC<TrainerFilterSectionProps> = ({
  data,
  onFiltersChange,
  isCollapsed,
  onToggleCollapse,
  onEfficiencyFiltersChange
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  
  // New efficiency filter states
  const [efficiencyMetric, setEfficiencyMetric] = useState<string>('all');
  const [performanceLevel, setPerformanceLevel] = useState<string>('all');
  const [sessionRange, setSessionRange] = useState<string>('all');

  const locations = Array.from(new Set(data.map(item => item.location))).filter(Boolean);
  const trainers = Array.from(new Set(data.map(item => item.teacherName))).filter(Boolean);
  const months = Array.from(new Set(data.map(item => item.monthYear))).filter(Boolean).sort().reverse();

  // Set default to previous month when data is available
  useEffect(() => {
    if (months.length > 0 && selectedMonth === 'all') {
      const previousMonth = getPreviousMonthDateRange();
      const previousMonthStr = `${previousMonth.start.slice(0, 7)}`; // Get YYYY-MM format
      
      // Find a month that matches the previous month pattern
      const matchingMonth = months.find(month => 
        month.includes(previousMonthStr) || 
        month.includes(previousMonth.start.slice(0, 7).replace('-', ' ')) ||
        month.includes(new Date(previousMonth.start).toLocaleString('default', { month: 'long', year: 'numeric' }))
      );
      
      if (matchingMonth) {
        setSelectedMonth(matchingMonth);
      }
    }
  }, [months, selectedMonth]);

  useEffect(() => {
    onFiltersChange({
      location: selectedLocation === 'all' ? '' : selectedLocation,
      trainer: selectedTrainer === 'all' ? '' : selectedTrainer,
      month: selectedMonth === 'all' ? '' : selectedMonth
    });
  }, [selectedLocation, selectedTrainer, selectedMonth, onFiltersChange]);

  // Handle efficiency filters
  useEffect(() => {
    if (onEfficiencyFiltersChange) {
      onEfficiencyFiltersChange({
        metric: efficiencyMetric === 'all' ? '' : efficiencyMetric,
        performance: performanceLevel === 'all' ? '' : performanceLevel,
        sessionRange: sessionRange === 'all' ? '' : sessionRange
      });
    }
  }, [efficiencyMetric, performanceLevel, sessionRange, onEfficiencyFiltersChange]);

  const clearFilters = () => {
    setSelectedLocation('all');
    setSelectedTrainer('all');
    setSelectedMonth('all');
    setEfficiencyMetric('all');
    setPerformanceLevel('all');
    setSessionRange('all');
  };

  const hasActiveFilters = selectedLocation !== 'all' || selectedTrainer !== 'all' || selectedMonth !== 'all' ||
                          efficiencyMetric !== 'all' || performanceLevel !== 'all' || sessionRange !== 'all';

  if (isCollapsed) {
    return (
      <Card className="bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Filters</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="text-xs">
                  {[selectedLocation, selectedTrainer, selectedMonth].filter(f => f !== 'all').length} active
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-blue-600 hover:text-blue-700"
            >
              Show Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Advanced Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-slate-600 hover:text-slate-700"
              >
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-blue-600 hover:text-blue-700"
            >
              Hide Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Filters */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Basic Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Location
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Trainer
                </label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Trainers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trainers</SelectItem>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer} value={trainer}>
                        {trainer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Month
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Efficiency Controls */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              Efficiency Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Performance Metric</label>
                <Select value={efficiencyMetric} onValueChange={setEfficiencyMetric}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Metrics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="revenue-efficiency">Revenue per Session</SelectItem>
                    <SelectItem value="class-utilization">Class Utilization</SelectItem>
                    <SelectItem value="customer-retention">Customer Retention</SelectItem>
                    <SelectItem value="empty-sessions">Empty Sessions Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Performance Level</label>
                <Select value={performanceLevel} onValueChange={setPerformanceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Performers (Top 25%)</SelectItem>
                    <SelectItem value="medium">Average Performers (25-75%)</SelectItem>
                    <SelectItem value="low">Growth Opportunities (Bottom 25%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Session Volume</label>
                <Select value={sessionRange} onValueChange={setSessionRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Volumes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Volumes</SelectItem>
                    <SelectItem value="high-volume">High Volume (20+ sessions)</SelectItem>
                    <SelectItem value="medium-volume">Medium Volume (10-19 sessions)</SelectItem>
                    <SelectItem value="low-volume">Low Volume (1-9 sessions)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};