
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LeadsData } from '@/types/leads';

interface LeadFilters {
  source: string[];
  associate: string[];
  center: string[];
  stage: string[];
  status: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface LeadContextType {
  filters: LeadFilters;
  setFilters: (filters: LeadFilters) => void;
  clearFilters: () => void;
  sourceOptions: string[];
  associateOptions: string[];
  centerOptions: string[];
  stageOptions: string[];
  statusOptions: string[];
  setOptions: (options: {
    sourceOptions: string[];
    associateOptions: string[];
    centerOptions: string[];
    stageOptions: string[];
    statusOptions: string[];
  }) => void;
}

const defaultFilters: LeadFilters = {
  source: [],
  associate: [],
  center: [],
  stage: [],
  status: [],
  dateRange: {
    start: null,
    end: null
  }
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const [sourceOptions, setSourceOptions] = useState<string[]>([]);
  const [associateOptions, setAssociateOptions] = useState<string[]>([]);
  const [centerOptions, setCenterOptions] = useState<string[]>([]);
  const [stageOptions, setStageOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const setOptions = (options: {
    sourceOptions: string[];
    associateOptions: string[];
    centerOptions: string[];
    stageOptions: string[];
    statusOptions: string[];
  }) => {
    setSourceOptions(options.sourceOptions);
    setAssociateOptions(options.associateOptions);
    setCenterOptions(options.centerOptions);
    setStageOptions(options.stageOptions);
    setStatusOptions(options.statusOptions);
  };

  return (
    <LeadContext.Provider value={{
      filters,
      setFilters,
      clearFilters,
      sourceOptions,
      associateOptions,
      centerOptions,
      stageOptions,
      statusOptions,
      setOptions
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
