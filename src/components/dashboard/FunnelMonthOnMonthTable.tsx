import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ChevronDown, 
  ChevronUp,
  BarChart3,
  Eye,
  Calendar,
  Filter
} from 'lucide-react';

interface FunnelMonthOnMonthTableProps {
  data: any[];
}

const FunnelMonthOnMonthTable: React.FC<FunnelMonthOnMonthTableProps> = ({ data }) => {
  const [sortBy, setSortBy] = useState<'source' | 'total' | 'recent'>('total');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [visibleSources, setVisibleSources] = useState<number>(8);

  const handleSort = (column: 'source' | 'total' | 'recent') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (growth < 0) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return 'text-green-600 bg-green-50';
    if (growth > 0) return 'text-green-600 bg-green-50';
    if (growth < -10) return 'text-red-600 bg-red-50';
    if (growth < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const processedData = useMemo(() => {
    const sourceMap = new Map<string, any>();
    
    data.forEach(item => {
      const source = item.source || 'Unknown';
      if (!sourceMap.has(source)) {
        sourceMap.set(source, {
          source,
          months: new Map(),
          total: 0
        });
      }
      
      const sourceData = sourceMap.get(source)!;
      const monthKey = `${item.year}-${String(item.month).padStart(2, '0')}`;
      
      sourceData.months.set(monthKey, {
        leads: item.total_leads || 0,
        conversions: item.total_conversions || 0,
        conversionRate: item.conversion_rate || 0
      });
      
      sourceData.total += item.total_leads || 0;
    });

    return Array.from(sourceMap.values()).map(source => {
      const monthEntries = Array.from(source.months.entries()).sort();
      const recentMonth = monthEntries[monthEntries.length - 1];
      const previousMonth = monthEntries[monthEntries.length - 2];
      
      let monthOnMonthGrowth = 0;
      if (recentMonth && previousMonth) {
        const recent = recentMonth[1].leads;
        const previous = previousMonth[1].leads;
        if (previous > 0) {
          monthOnMonthGrowth = ((recent - previous) / previous) * 100;
        }
      }

      return {
        ...source,
        recentLeads: recentMonth ? recentMonth[1].leads : 0,
        monthOnMonthGrowth,
        months: source.months
      };
    }).sort((a, b) => {
      if (sortBy === 'source') {
        return sortOrder === 'asc' 
          ? a.source.localeCompare(b.source)
          : b.source.localeCompare(a.source);
      } else if (sortBy === 'total') {
        return sortOrder === 'asc' 
          ? a.total - b.total 
          : b.total - a.total;
      } else {
        return sortOrder === 'asc' 
          ? a.recentLeads - b.recentLeads 
          : b.recentLeads - a.recentLeads;
      }
    });
  }, [data, sortBy, sortOrder]);

  const months = useMemo(() => {
    const monthSet = new Set<string>();
    data.forEach(item => {
      const monthKey = `${item.year}-${String(item.month).padStart(2, '0')}`;
      monthSet.add(monthKey);
    });
    return Array.from(monthSet).sort();
  }, [data]);

  const visibleData = processedData.slice(0, visibleSources);

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: 0.2 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="w-full bg-gradient-to-br from-white via-red-50/30 to-red-100/40 backdrop-blur-sm border-red-200/50 shadow-xl shadow-red-100/20">
        <CardHeader className="pb-4">
          <motion.div 
            variants={headerVariants}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Funnel Source Performance</h3>
                <p className="text-sm text-gray-600">Month-on-month lead generation by source</p>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className="bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-700 border-red-300/50 backdrop-blur-sm"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Historical Analysis
            </Badge>
          </motion.div>
          <motion.div 
            variants={headerVariants}
            className="flex items-center gap-2 text-xs text-slate-600 mt-2"
          >
            <Filter className="w-3 h-3" />
            <span>
              Showing {processedData.length} sources across {months.length} months
            </span>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-0">
          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-200/50">
                  <th className="text-left py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('source')}
                      className="hover:bg-red-50/50 font-medium text-gray-700"
                    >
                      Source
                      {sortBy === 'source' && (
                        sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('total')}
                      className="hover:bg-red-50/50 font-medium text-gray-700"
                    >
                      Total Leads
                      {sortBy === 'total' && (
                        sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('recent')}
                      className="hover:bg-red-50/50 font-medium text-gray-700"
                    >
                      Recent Month
                      {sortBy === 'recent' && (
                        sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    Month-on-Month
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {visibleData.map((source, index) => (
                    <React.Fragment key={source.source}>
                      <motion.tr
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="hover:bg-red-50/30 transition-colors duration-200 border-b border-red-100/30"
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">
                            {source.source}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-medium text-gray-900">
                            {formatNumber(source.total)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-medium text-gray-900">
                            {formatNumber(source.recentLeads)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {getGrowthIcon(source.monthOnMonthGrowth)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGrowthColor(source.monthOnMonthGrowth)}`}>
                              {formatPercentage(source.monthOnMonthGrowth)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(showDetails === source.source ? null : source.source)}
                            className="hover:bg-red-50/50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                      
                      <AnimatePresence>
                        {showDetails === source.source && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td colSpan={5} className="py-4 px-4 bg-gradient-to-r from-red-50/30 to-orange-50/30">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {months.slice(-6).map(month => {
                                  const monthData = source.months.get(month);
                                  if (!monthData) return null;
                                  
                                  return (
                                    <motion.div
                                      key={month}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="p-3 bg-white rounded-lg border border-red-200/30 shadow-sm"
                                    >
                                      <div className="text-sm font-medium text-gray-700 mb-1">
                                        {new Date(month + '-01').toLocaleDateString('en-US', { 
                                          month: 'short', 
                                          year: 'numeric' 
                                        })}
                                      </div>
                                      <div className="text-lg font-semibold text-gray-900">
                                        {formatNumber(monthData.leads)} leads
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        {monthData.conversions} conversions ({monthData.conversionRate.toFixed(1)}%)
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>

          {processedData.length > visibleSources && (
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => setVisibleSources(prev => 
                  prev >= processedData.length ? 8 : processedData.length
                )}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                {visibleSources >= processedData.length ? 'Show Less' : `Show All (${processedData.length})`}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FunnelMonthOnMonthTable;