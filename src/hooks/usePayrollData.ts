import { useState, useEffect } from 'react';
import { PayrollData } from '@/types/dashboard';

const GOOGLE_CONFIG = {
  CLIENT_ID: "416630995185-g7b0fm679lb4p45p5lou070cqscaalaf.apps.googleusercontent.com",
  CLIENT_SECRET: "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",
  REFRESH_TOKEN: "1//0gT2uoYBlNdGXCgYIARAAGBASNwF-L9IrBK_ijYwpce6-TdqDfji4GxYuc4uxIBKasdgoZBPm-tu_EU0xS34cNirqfLgXbJ8_NMk",
  TOKEN_URL: "https://oauth2.googleapis.com/token"
};

const SPREADSHEET_ID = "1i5GcTahIchSF6pLn0c2ZgqtQVYBG-Fqt7rGxIzD7qrA";

export const usePayrollData = () => {
  const [data, setData] = useState<PayrollData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
    try {
      const response = await fetch(GOOGLE_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: GOOGLE_CONFIG.CLIENT_ID,
          client_secret: GOOGLE_CONFIG.CLIENT_SECRET,
          refresh_token: GOOGLE_CONFIG.REFRESH_TOKEN,
          grant_type: 'refresh_token',
        }),
      });

      const tokenData = await response.json();
      return tokenData.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const parseNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (!value || value === '') return 0;

    const cleaned = value.toString().replace(/,/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const fetchPayrollData = async () => {
    try {
      console.log('Fetching payroll data from Google Sheets...');
      setIsLoading(true);
      const accessToken = await getAccessToken();
      console.log('Access token obtained successfully');

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Payroll?alt=json`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch payroll data: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const rows = result.values || [];
      console.log('Payroll sheet headers:', rows[0]);
      console.log('Total payroll rows:', rows.length);

      if (rows.length < 2) {
        console.log('No payroll data found');
        setData([]);
        return;
      }

      const payrollData: PayrollData[] = rows.slice(1).map((row: any[]) => ({
        teacherId: row[0] || '',
        teacherName: row[1] || '',
        teacherEmail: row[2] || '',
        location: row[3] || '',

        cycleSessions: parseNumericValue(row[4]),
        emptyCycleSessions: parseNumericValue(row[5]),
        nonEmptyCycleSessions: parseNumericValue(row[6]),
        cycleCustomers: parseNumericValue(row[7]),
        cyclePaid: parseNumericValue(row[8]),

        strengthSessions: parseNumericValue(row[9]),
        emptyStrengthSessions: parseNumericValue(row[10]),
        nonEmptyStrengthSessions: parseNumericValue(row[11]),
        strengthCustomers: parseNumericValue(row[12]),
        strengthPaid: parseNumericValue(row[13]),

        barreSessions: parseNumericValue(row[14]),
        emptyBarreSessions: parseNumericValue(row[15]),
        nonEmptyBarreSessions: parseNumericValue(row[16]),
        barreCustomers: parseNumericValue(row[17]),
        barrePaid: parseNumericValue(row[18]),

        totalSessions: parseNumericValue(row[19]),
        totalEmptySessions: parseNumericValue(row[20]),
        totalNonEmptySessions: parseNumericValue(row[21]),
        totalCustomers: parseNumericValue(row[22]),
        totalPaid: parseNumericValue(row[23]),

        monthYear: row[24] || '',
        unique: row[25] || '',
        converted: parseNumericValue(row[26]),
        conversion: parseNumericValue(row[27]).toString() + '%',
        retained: parseNumericValue(row[28]),
        retention: parseNumericValue(row[29]).toString() + '%',
        new: parseNumericValue(row[30]),
        classAverageInclEmpty: parseNumericValue(row[22]) > 0 ? parseNumericValue(row[19]) / parseNumericValue(row[22]) : 0,
        classAverageExclEmpty: parseNumericValue(row[21]) > 0 ? parseNumericValue(row[22]) / parseNumericValue(row[21]) : 0
      }));

      console.log('Transformed payroll data sample:', payrollData.slice(0, 3));
      console.log('Total payroll records processed:', payrollData.length);
      setData(payrollData);
      setError(null);
    } catch (err) {
      console.error('Error fetching payroll data:', err);
      setError('Failed to load payroll data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, []);

  return { data, isLoading, error, refetch: fetchPayrollData };
};
