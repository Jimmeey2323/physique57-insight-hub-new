import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  XCircle, 
  Calendar, 
  BarChart3, 
  DollarSign,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

interface ClientRetentionMetricSelectorProps {
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
}

export const ClientRetentionMetricSelector: React.FC<ClientRetentionMetricSelectorProps> = ({
  selectedMetric,
  onMetricChange
}) => {
  const metricOptions = [
    {
      id: 'conversion',
      label: 'Conversion Performance',
      description: 'Show rankings for member conversion rates',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      badge: 'High Impact'
    },
    {
      id: 'empty',
      label: 'Empty Classes',
      description: 'Show rankings for class efficiency and empty session rates',
      icon: XCircle,
      color: 'from-orange-500 to-red-600',
      badge: 'Efficiency'
    },
    {
      id: 'sessions',
      label: 'Session Volume',
      description: 'Show rankings for total sessions and class frequency',
      icon: Calendar,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Volume'
    },
    {
      id: 'attendance',
      label: 'Class Attendance',
      description: 'Show rankings for average class attendance',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      badge: 'Engagement'
    },
    {
      id: 'revenue',
      label: 'Revenue Performance',
      description: 'Show rankings for LTV and revenue metrics',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      badge: 'Revenue'
    }
  ];

  return (
    <Card className="group relative overflow-hidden bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-500">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-white opacity-50" />
      
      <CardHeader className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white border-0 shadow-lg">
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-10 -translate-y-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <Target className="w-24 h-24" />
        </div>
        <CardTitle className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Performance Metrics</h3>
            <p className="text-sm opacity-90 font-medium">
              Select focus area for rankings
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 relative space-y-3">
        {metricOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedMetric === option.id;
          
          return (
            <Button
              key={option.id}
              variant={isSelected ? "default" : "ghost"}
              className={`
                w-full p-4 h-auto justify-start text-left transition-all duration-300 group/btn
                ${isSelected 
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg transform scale-105 hover:scale-110` 
                  : 'hover:bg-slate-50 hover:shadow-md hover:scale-105'
                }
              `}
              onClick={() => onMetricChange(option.id)}
            >
              <div className="flex items-center gap-4 w-full">
                <div className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600 group-hover/btn:bg-slate-200'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`
                      font-semibold transition-colors duration-300
                      ${isSelected ? 'text-white' : 'text-slate-800'}
                    `}>
                      {option.label}
                    </span>
                    <Badge className={`
                      text-xs transition-all duration-300
                      ${isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-200 text-slate-600'
                      }
                    `}>
                      {option.badge}
                    </Badge>
                  </div>
                  <p className={`
                    text-sm transition-colors duration-300
                    ${isSelected ? 'text-white/80' : 'text-slate-600'}
                  `}>
                    {option.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-white/80" />
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};