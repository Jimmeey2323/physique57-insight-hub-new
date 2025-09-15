import React from 'react';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

export const GlobalLoader: React.FC = () => {
  const { isLoading, loadingMessage } = useGlobalLoading();

  if (!isLoading) return null;

  // Extract variant from loading message or default to 'default'
  const getVariantFromMessage = (message: string): 'sales' | 'discounts' | 'funnel' | 'retention' | 'attendance' | 'analytics' | 'default' => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('sales') || lowerMessage.includes('revenue')) return 'sales';
    if (lowerMessage.includes('discount') || lowerMessage.includes('promotion')) return 'discounts';
    if (lowerMessage.includes('funnel') || lowerMessage.includes('lead')) return 'funnel';
    if (lowerMessage.includes('retention') || lowerMessage.includes('conversion')) return 'retention';
    if (lowerMessage.includes('attendance') || lowerMessage.includes('class')) return 'attendance';
    if (lowerMessage.includes('analytics') || lowerMessage.includes('performance')) return 'analytics';
    return 'default';
  };

  const variant = getVariantFromMessage(loadingMessage);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <UniversalLoader 
        variant={variant}
        subtitle={loadingMessage}
      />
    </div>
  );
};