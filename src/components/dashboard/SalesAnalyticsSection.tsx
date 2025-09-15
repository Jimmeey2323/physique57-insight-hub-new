import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AutoCloseFilterSection } from './AutoCloseFilterSection';
import { MetricCard } from './MetricCard';
import { UnifiedTopBottomSellers } from './UnifiedTopBottomSellers';
import { DataTable } from './DataTable';
import { InteractiveChart } from './InteractiveChart';
import { ThemeSelector } from './ThemeSelector';
import { EnhancedSalesDrillDownModal } from './EnhancedSalesDrillDownModal';
import { getActiveTabClasses } from '@/utils/colorThemes';
import { EnhancedYearOnYearTable } from './EnhancedYearOnYearTable';
import { MonthOnMonthTable } from './MonthOnMonthTable';
import { ProductPerformanceTable } from './ProductPerformanceTable';
import { CategoryPerformanceTable } from './CategoryPerformanceTable';
import { SalesAnimatedMetricCards } from './SalesAnimatedMetricCards';
import { SalesInteractiveCharts } from './SalesInteractiveCharts';
import { SoldByMonthOnMonthTable } from './SoldByMonthOnMonthTable';
import { PaymentMethodMonthOnMonthTable } from './PaymentMethodMonthOnMonthTable';
import { SalesHeroSection } from './SalesHeroSection';
import { NoteTaker } from '@/components/ui/NoteTaker';
import { ModernSalesTable } from './ModernSalesTable';
import { SalesData, FilterOptions, MetricCardData, YearOnYearMetricType } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage, formatDiscount } from '@/utils/formatters';
import { getPreviousMonthDateRange } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { AdvancedExportButton } from '@/components/ui/AdvancedExportButton';

interface SalesAnalyticsSectionProps {
  data: SalesData[];
}

const locations = [{
  id: 'all',
  name: 'All Locations',
  fullName: 'All Locations'
}, {
  id: 'kwality',
  name: 'Kwality House, Kemps Corner',
  fullName: 'Kwality House, Kemps Corner'
}, {
  id: 'supreme',
  name: 'Supreme HQ, Bandra',
  fullName: 'Supreme HQ, Bandra'
}, {
  id: 'kenkere',
  name: 'Kenkere House',
  fullName: 'Kenkere House'
}];

export const SalesAnalyticsSection: React.FC<SalesAnalyticsSectionProps> = ({ data }) => {
  const [activeLocation, setActiveLocation] = useState('all');
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drillDownData, setDrillDownData] = useState<any>(null);
  const [drillDownType, setDrillDownType] = useState<'metric' | 'product' | 'category' | 'member'>('metric');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [activeYoyMetric, setActiveYoyMetric] = useState<YearOnYearMetricType>('revenue');

  // Initialize filters with previous month as default
  const [filters, setFilters] = useState<FilterOptions>(() => {
    const previousMonth = getPreviousMonthDateRange();
    
    return {
      dateRange: previousMonth,
      location: [],
      category: [],
      product: [],
      soldBy: [],
      paymentMethod: []
    };
  });

  const applyFilters = (rawData: SalesData[], includeHistoric: boolean = false) => {
    console.log('Applying filters to', rawData.length, 'records. IncludeHistoric:', includeHistoric);
    console.log('Current filters:', filters);
    console.log('Active location:', activeLocation);
    
    let filtered = [...rawData];

    // Apply location filter
    if (activeLocation !== 'all') {
      filtered = filtered.filter(item => {
        const locationMatch = activeLocation === 'kwality' 
          ? item.calculatedLocation === 'Kwality House, Kemps Corner' 
          : activeLocation === 'supreme' 
          ? item.calculatedLocation === 'Supreme HQ, Bandra' 
          : item.calculatedLocation?.includes('Kenkere') || item.calculatedLocation === 'Kenkere House';
        return locationMatch;
      });
    }

    console.log('After location filter:', filtered.length, 'records');

    // Apply date range filter
    if (!includeHistoric && (filters.dateRange.start || filters.dateRange.end)) {
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
      const endDate = filters.dateRange.end ? (() => {
        const date = new Date(filters.dateRange.end);
        // Set to end of day to include all transactions on the end date
        date.setHours(23, 59, 59, 999);
        return date;
      })() : null;
      
      console.log('Applying date filter:', startDate, 'to', endDate);
      
      filtered = filtered.filter(item => {
        if (!item.paymentDate) return false;

        let itemDate: Date | null = null;

        // Try DD/MM/YYYY format first
        const ddmmyyyy = item.paymentDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (ddmmyyyy) {
          const [, day, month, year] = ddmmyyyy;
          itemDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
          // Try other formats
          const formats = [
            new Date(item.paymentDate), 
            new Date(item.paymentDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')), 
            new Date(item.paymentDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'))
          ];
          
          for (const date of formats) {
            if (!isNaN(date.getTime()) && date.getFullYear() > 1900 && date.getFullYear() < 2100) {
              itemDate = date;
              break;
            }
          }
        }

        if (!itemDate || isNaN(itemDate.getTime())) return false;
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
      });
      
      console.log('After date filter:', filtered.length, 'records');
    }

    // Apply category filter
    if (filters.category?.length) {
      filtered = filtered.filter(item => 
        filters.category!.some(cat => 
          item.cleanedCategory?.toLowerCase().includes(cat.toLowerCase())
        )
      );
      console.log('After category filter:', filtered.length, 'records');
    }

    // Apply payment method filter
    if (filters.paymentMethod?.length) {
      filtered = filtered.filter(item => 
        filters.paymentMethod!.some(method => 
          item.paymentMethod?.toLowerCase().includes(method.toLowerCase())
        )
      );
      console.log('After payment method filter:', filtered.length, 'records');
    }

    // Apply sold by filter
    if (filters.soldBy?.length) {
      filtered = filtered.filter(item => 
        filters.soldBy!.some(seller => 
          item.soldBy?.toLowerCase().includes(seller.toLowerCase())
        )
      );
      console.log('After sold by filter:', filtered.length, 'records');
    }

    // Apply amount range filters
    if (filters.minAmount) {
      filtered = filtered.filter(item => (item.paymentValue || 0) >= filters.minAmount!);
      console.log('After min amount filter:', filtered.length, 'records');
    }
    
    if (filters.maxAmount) {
      filtered = filtered.filter(item => (item.paymentValue || 0) <= filters.maxAmount!);
      console.log('After max amount filter:', filtered.length, 'records');
    }

    console.log('Final filtered data:', filtered.length, 'records');
    return filtered;
  };

  const filteredData = useMemo(() => applyFilters(data), [data, filters, activeLocation]);
  const allHistoricData = useMemo(() => applyFilters(data, true), [data, activeLocation]);

  const handleRowClick = (rowData: any) => {
    console.log('Row clicked with data:', rowData);
    console.log('Available properties in rowData:', Object.keys(rowData));
    
    // More specific filtering based on the exact row data
    let specificFilteredData = filteredData;
    let drillDownTypeToSet: 'metric' | 'product' | 'category' | 'member' = 'product';
    
    // If we have transaction data already attached to the row, use that
    if (rowData.rawData && Array.isArray(rowData.rawData) && rowData.rawData.length > 0) {
      specificFilteredData = rowData.rawData;
      console.log(`Using pre-filtered rawData: ${specificFilteredData.length} transactions`);
    } else if (Array.isArray(rowData) && rowData.length > 0) {
      // If rowData itself is an array of transactions, use it directly
      specificFilteredData = rowData;
      console.log(`Using rowData array directly: ${specificFilteredData.length} transactions`);
    } else if (rowData.transactionData && Array.isArray(rowData.transactionData) && rowData.transactionData.length > 0) {
      specificFilteredData = rowData.transactionData;
      console.log(`Using pre-filtered transactionData: ${specificFilteredData.length} transactions`);
    } else if (rowData.currentYearRawData && rowData.lastYearRawData) {
      // For Year-on-Year data, combine current and last year data for this specific product/category
      specificFilteredData = [...rowData.currentYearRawData, ...rowData.lastYearRawData];
      console.log(`Using YoY data: ${rowData.currentYearRawData.length} current year + ${rowData.lastYearRawData.length} last year transactions`);
    } else {
      // Apply specific filters based on row properties as fallback
      specificFilteredData = filteredData.filter(item => {
        let matches = false; // Start with false and require at least one match
        
        // Try multiple possible property names for product matching
        const productIdentifiers = [
          rowData.name,
          rowData.product,
          rowData.productName,
          rowData.paymentItem,
          rowData.cleanedProduct,
          rowData.membership,
          rowData.membershipType,
          rowData.item
        ].filter(Boolean);
        
        const categoryIdentifiers = [
          rowData.category,
          rowData.cleanedCategory,
          rowData.paymentCategory
        ].filter(Boolean);
        
        console.log('Product identifiers to match:', productIdentifiers);
        console.log('Category identifiers to match:', categoryIdentifiers);
        
        // Product-specific filtering - try exact matches
        for (const identifier of productIdentifiers) {
          if (item.cleanedProduct === identifier || 
              item.paymentItem === identifier ||
              item.membershipType === identifier ||
              (item.paymentItem && item.paymentItem.includes(identifier)) ||
              (item.cleanedProduct && item.cleanedProduct.includes(identifier))) {
            matches = true;
            console.log(`Product match found: ${identifier} matches item ${item.paymentItem || item.cleanedProduct}`);
            break;
          }
        }
        
        // Category-specific filtering if no product match
        if (!matches) {
          for (const identifier of categoryIdentifiers) {
            if (item.cleanedCategory === identifier ||
                item.paymentCategory === identifier ||
                (item.cleanedCategory && item.cleanedCategory.includes(identifier))) {
              matches = true;
              drillDownTypeToSet = 'category';
              console.log(`Category match found: ${identifier} matches item ${item.cleanedCategory}`);
              break;
            }
          }
        }
        
        // Sales rep specific filtering
        if (rowData.soldBy && item.soldBy === rowData.soldBy) {
          matches = true;
          drillDownTypeToSet = 'member';
        }
        
        // Payment method specific filtering
        if (rowData.paymentMethod && item.paymentMethod === rowData.paymentMethod) {
          matches = true;
          drillDownTypeToSet = 'product';
        }
        
        return matches;
      });
      console.log(`Using fallback filtering: ${specificFilteredData.length} transactions from ${filteredData.length} total`);
      
    }
    
    console.log(`Filtered ${specificFilteredData.length} transactions for drill-down from ${filteredData.length} total`);
    
    const enhancedData = {
      ...rowData,
      rawData: specificFilteredData,
      filteredTransactionData: specificFilteredData,
      // Calculate specific metrics for this filtered data and override any static values
      totalRevenue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      grossRevenue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      netRevenue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      totalValue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      totalCurrent: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      metricValue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      transactions: specificFilteredData.length,
      totalTransactions: specificFilteredData.length,
      uniqueMembers: new Set(specificFilteredData.map(item => item.memberId || item.customerEmail)).size,
      totalCustomers: new Set(specificFilteredData.map(item => item.memberId || item.customerEmail)).size,
      specificRevenue: specificFilteredData.reduce((sum, item) => sum + (item.paymentValue || 0), 0),
      specificTransactions: specificFilteredData.length,
      specificCustomers: new Set(specificFilteredData.map(item => item.memberId || item.customerEmail)).size,
      specificProducts: new Set(specificFilteredData.map(item => item.cleanedProduct || item.paymentItem)).size,
      // Add dynamic calculation flags to ensure modal uses fresh data
      isDynamic: true,
      calculatedFromFiltered: true
    };
    
    setDrillDownData(enhancedData);
    setDrillDownType(drillDownTypeToSet);
  };

  const handleMetricClick = (metricData: any) => {
    console.log('Metric clicked with data:', metricData);
    
    // For metric clicks, use the filtered data to ensure responsiveness to filters
    const specificData = filteredData;
    
    // Calculate fresh metrics from the current filtered data
    const dynamicRevenue = specificData.reduce((sum, item) => sum + (item.paymentValue || 0), 0);
    const dynamicTransactions = specificData.length;
    const dynamicCustomers = new Set(specificData.map(item => item.memberId || item.customerEmail)).size;
    
    // Enhance metric data with dynamic calculations
    const enhancedData = {
      ...metricData,
      rawData: specificData,
      filteredTransactionData: specificData,
      // Override with dynamic values
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
      specificRevenue: dynamicRevenue,
      specificTransactions: dynamicTransactions,
      specificCustomers: dynamicCustomers,
      // Add flags to indicate this is dynamically calculated
      isDynamic: true,
      calculatedFromFiltered: true
    };
    
    console.log(`Metric drill-down with ${specificData.length} filtered transactions, revenue: ${dynamicRevenue}`);
    setDrillDownData(enhancedData);
    setDrillDownType('metric');
  };

  const handleGroupToggle = (groupKey: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupKey)) {
      newCollapsed.delete(groupKey);
    } else {
      newCollapsed.add(groupKey);
    }
    setCollapsedGroups(newCollapsed);
  };

  const resetFilters = () => {
    const previousMonth = getPreviousMonthDateRange();
    
    setFilters({
      dateRange: previousMonth,
      location: [],
      category: [],
      product: [],
      soldBy: [],
      paymentMethod: []
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Dynamic Metrics */}
      <SalesHeroSection data={filteredData} />

      {/* Note Taker Component */}
      <div className="container mx-auto px-6">
        <NoteTaker />
      </div>

      {/* Filter and Location Tabs */}
      <div className="container mx-auto px-6 space-y-6">
        <Tabs value={activeLocation} onValueChange={setActiveLocation} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-4 w-full max-w-7xl min-h-24 overflow-hidden">
              {locations.map(location => (
                <TabsTrigger 
                  key={location.id} 
                  value={location.id} 
                  className="relative px-6 py-4 font-semibold text-gray-800 transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 text-2xl rounded-2xl"
                >
                  <div className="relative z-10 text-center">
                    <div className="font-bold">{location.name.split(',')[0]}</div>
                    <div className="text-xs opacity-80">{location.name.split(',')[1]?.trim()}</div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {locations.map(location => (
            <TabsContent key={location.id} value={location.id} className="space-y-8">
              <div className="w-full">
                <AutoCloseFilterSection
                  filters={filters} 
                  onFiltersChange={setFilters} 
                  onReset={resetFilters} 
                />
              </div>

              <SalesAnimatedMetricCards 
                data={filteredData} 
                onMetricClick={handleMetricClick}
              />

              <SalesInteractiveCharts data={allHistoricData} />

              <UnifiedTopBottomSellers data={filteredData} />

                <Tabs defaultValue="monthOnMonth" className="w-full">
                  <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-6 w-full max-w-6xl mx-auto overflow-hidden">
                    <TabsTrigger value="monthOnMonth" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                      Month-on-Month
                    </TabsTrigger>
                    <TabsTrigger value="yearOnYear" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                      Year-on-Year
                    </TabsTrigger>
                  <TabsTrigger value="productPerformance" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                    Product Performance
                  </TabsTrigger>
                  <TabsTrigger value="categoryPerformance" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                    Category Performance
                  </TabsTrigger>
                  <TabsTrigger value="soldByAnalysis" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                    Sold By Analysis
                  </TabsTrigger>
                  <TabsTrigger value="paymentMethodAnalysis" className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50">
                    Payment Methods
                  </TabsTrigger>
                </TabsList>

                  <TabsContent value="monthOnMonth" className="mt-8">
                    <section className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900">Month-on-Month Analysis</h2>
                      <MonthOnMonthTable 
                        data={allHistoricData} 
                        onRowClick={handleRowClick} 
                        collapsedGroups={collapsedGroups} 
                        onGroupToggle={handleGroupToggle} 
                        selectedMetric={activeYoyMetric} 
                      />
                    </section>
                  </TabsContent>

                  <TabsContent value="yearOnYear" className="mt-8">
                    <section className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900">Year-on-Year Analysis</h2>
                      <EnhancedYearOnYearTable 
                        data={allHistoricData} 
                        onRowClick={handleRowClick} 
                        selectedMetric={activeYoyMetric} 
                      />
                    </section>
                  </TabsContent>

                <TabsContent value="productPerformance" className="mt-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Product Performance Analysis</h2>
                    <ProductPerformanceTable 
                      data={allHistoricData} 
                      onRowClick={handleRowClick} 
                      selectedMetric={activeYoyMetric} 
                    />
                  </section>
                </TabsContent>

                <TabsContent value="categoryPerformance" className="mt-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Category Performance Analysis</h2>
                    <CategoryPerformanceTable 
                      data={allHistoricData} 
                      onRowClick={handleRowClick} 
                      selectedMetric={activeYoyMetric} 
                    />
                  </section>
                </TabsContent>

                <TabsContent value="soldByAnalysis" className="mt-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Sold By Analysis</h2>
                    <SoldByMonthOnMonthTable 
                      data={allHistoricData} 
                      onRowClick={handleRowClick} 
                      selectedMetric={activeYoyMetric} 
                    />
                  </section>
                </TabsContent>

                <TabsContent value="paymentMethodAnalysis" className="mt-8">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method Analysis</h2>
                    <PaymentMethodMonthOnMonthTable 
                      data={allHistoricData} 
                      onRowClick={handleRowClick} 
                      selectedMetric={activeYoyMetric} 
                    />
                  </section>
                </TabsContent>
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal */}
      {drillDownData && (
        <EnhancedSalesDrillDownModal 
          isOpen={!!drillDownData} 
          onClose={() => setDrillDownData(null)} 
          data={drillDownData} 
          type={drillDownType} 
        />
      )}
    </div>
  );
};


