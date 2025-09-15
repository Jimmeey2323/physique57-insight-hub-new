import React from 'react';
import { ModernHeroSection } from '@/components/ui/ModernHeroSection';
import { AdvancedExportButton } from '@/components/ui/AdvancedExportButton';
import { useSalesMetrics } from '@/hooks/useSalesMetrics';
import { SalesData } from '@/types/dashboard';

interface SalesHeroSectionProps {
  data: SalesData[];
}

export const SalesHeroSection: React.FC<SalesHeroSectionProps> = ({ data }) => {
  const { metrics } = useSalesMetrics(data);

  // Convert metrics to hero format - show top 3 key metrics
  const heroMetrics = metrics
    .filter(metric => ['Sales Revenue', 'Transactions', 'Unique Members'].includes(metric.title))
    .map(metric => ({
      location: metric.title,
      label: metric.description,
      value: metric.value
    }));

  const exportButton = (
    <AdvancedExportButton 
      salesData={data}
      defaultFileName="sales-analytics-filtered"
      size="sm"
      variant="ghost"
    />
  );

  return (
    <ModernHeroSection 
      title="Sales Analytics"
      subtitle="Comprehensive analysis of sales performance, revenue trends, and customer insights"
      variant="sales"
      metrics={heroMetrics}
      exportButton={exportButton}
    />
  );
};