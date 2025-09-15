import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload critical pages for faster navigation
    const preloadPages = () => {
      const routes = [
        '/executive-summary',
        '/sales-analytics',
        '/funnel-leads',
        '/client-retention',
        '/trainer-performance'
      ];

      routes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    };

    // Preload critical resources on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadPages);
    } else {
      setTimeout(preloadPages, 100);
    }

    // Enable performance observer for monitoring
    let performanceObserver: PerformanceObserver | null = null;
    const intersectionObservers: IntersectionObserver[] = [];
    
    if ('PerformanceObserver' in window) {
      performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log long tasks for debugging (reduced threshold for better detection)
          if (entry.entryType === 'longtask' && entry.duration > 100) {
            console.warn('Long task detected:', entry.duration + 'ms', 'at', entry.startTime);
          }
        });
      });

      try {
        performanceObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Fallback for browsers that don't support longtask
      }
    }

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;
                if (image.dataset.src) {
                  image.src = image.dataset.src;
                  image.removeAttribute('data-src');
                  imageObserver.unobserve(image);
                }
              }
            });
          });
          imageObserver.observe(img);
          intersectionObservers.push(imageObserver);
        }
      });
    };

    // Run image optimization
    optimizeImages();

    // Cleanup function
    return () => {
      // Clean up performance observer
      if (performanceObserver) {
        performanceObserver.disconnect();
      }
      
      // Clean up intersection observers
      intersectionObservers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);
};