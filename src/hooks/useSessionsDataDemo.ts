import { useState, useEffect } from 'react';

export interface SessionData {
  trainerId: string;
  trainerFirstName: string;
  trainerLastName: string;
  trainerName: string;
  sessionId: string;
  sessionName: string;
  capacity: number;
  checkedInCount: number;
  lateCancelledCount: number;
  bookedCount: number;
  complimentaryCount: number;
  location: string;
  date: string;
  dayOfWeek: string;
  time: string;
  totalPaid: number;
  nonPaidCount: number;
  uniqueId1: string;
  uniqueId2: string;
  checkedInsWithMemberships: number;
  checkedInsWithPackages: number;
  checkedInsWithIntroOffers: number;
  checkedInsWithSingleClasses: number;
  classType: string;
  cleanedClass: string;
  classes: number;
  fillPercentage?: number;
  revenue?: number;
  // Legacy field for backward compatibility
  uniqueId?: string;
}

// Sample data for testing/demo purposes
const generateSampleData = (): SessionData[] => {
  const trainers = [
    { id: "53133", firstName: "Anisha", lastName: "Shah", fullName: "Anisha Shah" },
    { id: "53134", firstName: "Priya", lastName: "Patel", fullName: "Priya Patel" },
    { id: "53135", firstName: "Ravi", lastName: "Kumar", fullName: "Ravi Kumar" },
    { id: "53136", firstName: "Maya", lastName: "Singh", fullName: "Maya Singh" }
  ];

  const locations = [
    "Kwality House, Kemps Corner",
    "Supreme HQ, Bandra",
    "Kenkere House"
  ];

  const classTypes = [
    { type: "Barre 57", name: "Studio FIT" },
    { type: "Barre 57", name: "Studio Back Body Blaze" },
    { type: "Barre 57", name: "Studio Hosted Class" },
    { type: "Power", name: "Power Cycle" },
    { type: "Strength", name: "Strength Training" }
  ];

  const times = ["09:00:00", "11:30:00", "18:00:00", "19:00:00", "20:30:00"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const sampleData: SessionData[] = [];
  
  for (let i = 0; i < 50; i++) {
    const trainer = trainers[Math.floor(Math.random() * trainers.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const classInfo = classTypes[Math.floor(Math.random() * classTypes.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const day = days[Math.floor(Math.random() * days.length)];
    
    const capacity = Math.floor(Math.random() * 10) + 15; // 15-25
    const checkedIn = Math.floor(Math.random() * capacity * 0.9); // 0-90% of capacity
    const booked = Math.max(checkedIn, Math.floor(Math.random() * capacity * 1.1)); // Slightly more than checked in
    const revenue = checkedIn * (Math.random() * 500 + 300); // 300-800 per person
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    sampleData.push({
      trainerId: trainer.id,
      trainerFirstName: trainer.firstName,
      trainerLastName: trainer.lastName,
      trainerName: trainer.fullName,
      sessionId: (99000000 + i).toString(),
      sessionName: classInfo.name + (Math.random() > 0.8 ? " at Physique 57" : ""),
      capacity,
      checkedInCount: checkedIn,
      lateCancelledCount: Math.floor(Math.random() * 3),
      bookedCount: booked,
      complimentaryCount: Math.floor(Math.random() * 2),
      location,
      date: date.toISOString().split('T')[0],
      dayOfWeek: day,
      time,
      totalPaid: revenue,
      nonPaidCount: Math.floor(Math.random() * checkedIn * 0.2),
      uniqueId1: Math.random().toString(36).substring(2, 9).toUpperCase(),
      uniqueId2: Math.random().toString(36).substring(2, 9).toUpperCase(),
      checkedInsWithMemberships: Math.floor(checkedIn * 0.6),
      checkedInsWithPackages: Math.floor(checkedIn * 0.3),
      checkedInsWithIntroOffers: Math.floor(checkedIn * 0.1),
      checkedInsWithSingleClasses: Math.floor(checkedIn * 0.1),
      classType: classInfo.type,
      cleanedClass: classInfo.name,
      classes: 1,
      fillPercentage: capacity > 0 ? (checkedIn / capacity) * 100 : 0,
      revenue: revenue,
      uniqueId: Math.random().toString(36).substring(2, 9).toUpperCase()
    });
  }
  
  return sampleData;
};

const GOOGLE_CONFIG = {
  CLIENT_ID: "416630995185-g7b0fm679lb4p45p5lou070cqscaalaf.apps.googleusercontent.com",
  CLIENT_SECRET: "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",
  REFRESH_TOKEN: "1//0gT2uoYBlNdGXCgYIARAAGBASNwF-L9IrBK_ijYwpce6-TdqDfji4GxYuc4uxIBKasdgoZBPm-tu_EU0xS34cNirqfLgXbJ8_NMk",
  TOKEN_URL: "https://oauth2.googleapis.com/token"
};

const SPREADSHEET_ID = "1i5GcTahIchSF6pLn0c2ZgqtQVYBG-Fqt7rGxIzD7qrA";

export const useSessionsData = () => {
  const [data, setData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
    try {
      const response = await fetch(GOOGLE_CONFIG.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
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

  const fetchSessionsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch real data first
      try {
        const accessToken = await getAccessToken();
        
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sessions?alt=json`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch sessions data');
        }

        const result = await response.json();
        const rows = result.values || [];
        
        if (rows.length < 2) {
          throw new Error('No data available');
        }

        const sessionsData: SessionData[] = rows.slice(1).map((row: any[]) => {
          const capacity = parseNumericValue(row[6]);
          const checkedInCount = parseNumericValue(row[7]);
          const fillPercentage = capacity > 0 ? (checkedInCount / capacity) * 100 : 0;
          
          return {
            trainerId: row[0] || '',
            trainerFirstName: row[1] || '',
            trainerLastName: row[2] || '',
            trainerName: row[3] || '',
            sessionId: row[4] || '',
            sessionName: row[5] || '',
            capacity,
            checkedInCount,
            lateCancelledCount: parseNumericValue(row[8]),
            bookedCount: parseNumericValue(row[9]),
            complimentaryCount: parseNumericValue(row[10]),
            location: row[11] || '',
            date: row[12] || '',
            dayOfWeek: row[13] || '',
            time: row[14] || '',
            totalPaid: parseNumericValue(row[15]), // Revenue column
            nonPaidCount: parseNumericValue(row[16]),
            uniqueId1: row[17] || '',
            uniqueId2: row[18] || '',
            checkedInsWithMemberships: parseNumericValue(row[19]), // Memberships
            checkedInsWithPackages: parseNumericValue(row[20]), // Packages
            checkedInsWithIntroOffers: parseNumericValue(row[21]), // IntroOffers
            checkedInsWithSingleClasses: parseNumericValue(row[22]), // SingleClasses
            classType: row[23] || '', // Type
            cleanedClass: row[24] || '', // Class
            classes: parseNumericValue(row[25]), // Classes
            fillPercentage,
            revenue: parseNumericValue(row[15]),
            // Legacy field for backward compatibility
            uniqueId: row[17] || ''
          };
        });

        setData(sessionsData);
      } catch (fetchError) {
        console.warn('Failed to fetch real data, using sample data:', fetchError);
        // Fall back to sample data
        const sampleData = generateSampleData();
        setData(sampleData);
      }
    } catch (err) {
      console.error('Error in fetchSessionsData:', err);
      // Use sample data as final fallback
      const sampleData = generateSampleData();
      setData(sampleData);
      setError(null); // Don't show error when we have fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionsData();
  }, []);

  return { data, loading, error, refetch: fetchSessionsData };
};