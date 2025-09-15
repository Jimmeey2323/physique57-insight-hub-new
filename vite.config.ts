import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            if (id.includes('date-fns') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
            return 'vendor';
          }
          
          if (id.includes('/components/dashboard/')) {
            if (id.includes('Sales') || id.includes('Revenue')) {
              return 'dashboard-sales';
            }
            if (id.includes('Client') || id.includes('Conversion')) {
              return 'dashboard-clients';
            }
            if (id.includes('Trainer') || id.includes('Performance')) {
              return 'dashboard-trainers';
            }
            if (id.includes('Class') || id.includes('Session')) {
              return 'dashboard-classes';
            }
            if (id.includes('Discount') || id.includes('Promotion')) {
              return 'dashboard-discounts';
            }
            if (id.includes('PowerCycle') || id.includes('Barre') || id.includes('Strength')) {
              return 'dashboard-formats';
            }
            if (id.includes('Funnel') || id.includes('Lead')) {
              return 'dashboard-funnel';
            }
            if (id.includes('Executive') || id.includes('Summary')) {
              return 'dashboard-executive';
            }
            return 'dashboard-misc';
          }
          
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          
          if (id.includes('/pages/')) {
            return 'pages';
          }
          
          if (id.includes('/hooks/') || id.includes('/utils/')) {
            return 'utils';
          }
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/${name}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
    target: 'es2015',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      'recharts',
      'date-fns',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-popover',
      '@tanstack/react-query'
    ],
    force: true,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    treeShaking: true,
  }
}));
