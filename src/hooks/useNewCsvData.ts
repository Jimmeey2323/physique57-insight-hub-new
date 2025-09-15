
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface NewClientData {
  location: string;
  newMembers: number[];
  retained: number[];
  converted: number[];
  retention: string[];
  conversion: string[];
  ltv: number[];
  conversionSpan: number[];
  months: string[];
}

export const useNewCsvData = () => {
  const [data, setData] = useState<NewClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/New.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const processedData = processNewCsvData(results.data);
            setData(processedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Failed to fetch CSV data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const processNewCsvData = (rawData: any[]): NewClientData[] => {
  const locations = ['Kenkere House', 'Kwality House, Kemps Corner', 'Supreme HQ, Bandra'];
  const months = ['2025-Jun', '2025-May', '2025-Apr', '2025-Mar', '2025-Feb', '2025-Jan', '2024-Dec', '2024-Nov', '2024-Oct', '2024-Sep', '2024-Aug', '2024-Jul', '2024-Jun', '2024-May', '2024-Apr', '2024-Mar', '2024-Feb', '2024-Jan'];
  
  return locations.map(location => {
    const locationData = rawData.filter(row => row['First Visit Location'] === location);
    
    const newMembers = locationData.find(row => row.Values === 'New Members');
    const retained = locationData.find(row => row.Values === 'Retained');
    const converted = locationData.find(row => row.Values === 'Converted');
    const retention = locationData.find(row => row.Values === 'Retention');
    const conversion = locationData.find(row => row.Values === 'Conversion');
    const ltv = locationData.find(row => row.Values === 'LTV');
    const conversionSpan = locationData.find(row => row.Values === 'Conversion Span');

    return {
      location,
      newMembers: months.map(month => parseInt(newMembers?.[month] || '0') || 0),
      retained: months.map(month => parseInt(retained?.[month] || '0') || 0),
      converted: months.map(month => parseInt(converted?.[month] || '0') || 0),
      retention: months.map(month => retention?.[month] || '0%'),
      conversion: months.map(month => conversion?.[month] || '0%'),
      ltv: months.map(month => parseInt(ltv?.[month] || '0') || 0),
      conversionSpan: months.map(month => parseInt(conversionSpan?.[month] || '0') || 0),
      months
    };
  });
};
