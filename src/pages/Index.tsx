import React, { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '@/components/ui/footer';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';
import { designTokens } from '@/utils/designTokens';

// Memoized stats card component
const StatsCard = memo(({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) => <div className="relative p-6 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 group">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{title}</div>
      <div className="text-xs text-slate-600 font-medium mt-1">{subtitle}</div>
    </div>
    <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
  </div>);
const Index = () => {
  const navigate = useNavigate();
  const { setLoading } = useGlobalLoading();
  const {
    data,
    loading,
    error,
    refetch
  } = useGoogleSheets();

  useEffect(() => {
    setLoading(loading, 'Loading dashboard overview...');
  }, [loading, setLoading]);
  const handleSectionClick = useCallback((sectionId: string) => {
    if (sectionId === 'class-performance-series') {
      window.open('https://class-performance-series-001.vercel.app/', '_blank');
    } else if (sectionId === 'late-cancellations') {
      navigate('/late-cancellations');
    } else {
      navigate(`/${sectionId}`);
    }
  }, [navigate]);
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return null; // Global loader will handle this
  }
  if (error) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4">
        <Card className={`p-12 ${designTokens.card.background} backdrop-blur-sm ${designTokens.card.shadow} ${designTokens.card.border} rounded-2xl max-w-lg`}>
          <CardContent className="text-center space-y-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div>
              <p className="text-xl font-semibold text-slate-800">Connection Error</p>
              <p className="text-sm text-slate-600 mt-2">{error}</p>
            </div>
            <Button onClick={handleRetry} className="gap-2 bg-slate-800 hover:bg-slate-900 text-white">
              <RefreshCw className="w-4 h-4" />
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 via-purple-50/10 to-pink-50/20"></div>
        
        {/* Primary Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full floating-animation stagger-1"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 rounded-full floating-animation stagger-3"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full floating-animation stagger-5"></div>
        
        {/* Gentle Floating Orbs */}
        <div className="absolute top-32 right-1/4 w-24 h-24 bg-gradient-to-r from-violet-300/30 to-purple-300/30 rounded-full float-gentle stagger-2"></div>
        <div className="absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-cyan-300/25 to-blue-300/25 rounded-full float-gentle stagger-4"></div>
        <div className="absolute top-3/4 left-20 w-20 h-20 bg-gradient-to-r from-rose-300/35 to-pink-300/35 rounded-full float-gentle stagger-6"></div>
        
        {/* Pulsing Elements */}
        <div className="absolute top-1/4 left-3/4 w-16 h-16 bg-gradient-to-r from-amber-300/40 to-orange-300/40 rounded-full pulse-gentle stagger-1"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-green-300/45 to-emerald-300/45 rounded-full pulse-gentle stagger-3"></div>
        <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-gradient-to-r from-indigo-300/35 to-violet-300/35 rounded-full pulse-gentle stagger-5"></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 morph-shape stagger-2"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-pink-300/10 to-rose-300/10 morph-shape stagger-4"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Enhanced Header Section */}
          <header className="mb-8 text-center slide-in-from-left">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 text-sm font-medium shadow-lg tracking-wide min-w-full w-full fixed top-0 left-0 z-50 rounded-none glass-dark">
                Business Intelligence Dashboard
              </div>
            </div>
            
            <h1 className="text-4xl md:text-xl font-light text-slate-900 mb-2 tracking-tight font-serif text-center mb-4 perspective-tilt">
              <span className="font-extralight text-8xl gradient-text-purple">Physique</span>{' '}
              <span className="font-bold text-9xl animate-dynamic-color">57</span>
              <span className="text-slate-600 font-light text-7xl">, India</span>
            </h1>
            
            <p className="text-lg text-slate-600 font-light mb-6 max-w-3xl mx-auto leading-relaxed mt-8 slide-in-right stagger-1">
              Advanced Business Analytics with Real-time Insights
            </p>
            
            {/* Enhanced Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="glass-card modern-card-hover soft-bounce stagger-1">
                <StatsCard title="Real-time" subtitle="Data Insights" />
              </div>
              <div className="glass-card modern-card-hover soft-bounce stagger-2">
                <StatsCard title="10+" subtitle="Analytics Modules" />
              </div>
              <div className="glass-card modern-card-hover soft-bounce stagger-3">
                <StatsCard title="Precision" subtitle="Data Accuracy" />
              </div>
            </div>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-4 shimmer-effect"></div>
          </header>

          {/* Enhanced Dashboard Grid */}
          <main className="max-w-7xl mx-auto slide-in-from-right stagger-2">
            <div className="min-w-full glass-card glow-pulse rounded-2xl p-6">
              <DashboardGrid onButtonClick={handleSectionClick} />
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
      
      <style>{`
        @keyframes color-cycle {
          0% { color: #3b82f6; }
          25% { color: #ef4444; }
          50% { color: #6366f1; }
          75% { color: #8b5cf6; }
          100% { color: #3b82f6; }
        }
        
        .animate-color-cycle {
          animation: color-cycle 4s infinite ease-in-out;
        }
      `}</style>
    </div>;
};
export default Index;