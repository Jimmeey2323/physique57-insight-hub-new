
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  sortable?: boolean;
}

interface ModernDataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  stickyHeader?: boolean;
  showFooter?: boolean;
  footerData?: any;
  maxHeight?: string;
  className?: string;
  headerGradient?: string;
  onSort?: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onRowClick?: (row: any) => void;
}

export const ModernDataTable: React.FC<ModernDataTableProps> = ({
  data,
  columns,
  loading = false,
  stickyHeader = false,
  showFooter = false,
  footerData,
  maxHeight,
  className,
  headerGradient = "from-slate-600 to-slate-700",
  onSort,
  sortField,
  sortDirection,
  onRowClick
}) => {
  // Remove individual loading state - parent components handle loading via global loader
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center p-8">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  const formatCurrencyValue = (value: any) => {
    if (typeof value === 'string' && (value.includes('₹') || value.includes('$'))) {
      const numericValue = parseFloat(value.replace(/[₹$,]/g, ''));
      if (!isNaN(numericValue) && numericValue < 1000) {
        return `₹${Math.round(numericValue)}`;
      }
    }
    return value;
  };

  const handleSort = (column: Column) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  return (
    <div className={cn("relative overflow-auto rounded-xl", className)} style={{ maxHeight }}>
      <Table className="w-full">
        <TableHeader className={cn(
          stickyHeader && "sticky top-0 z-20",
          "bg-slate-100 border-b border-slate-300",
          headerGradient
        )}>
          <TableRow className="border-none h-12">
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className={cn(
                  "font-bold h-12 px-4 text-sm whitespace-nowrap text-slate-900",
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  column.sortable && 'cursor-pointer hover:bg-slate-200 transition-colors',
                  column.className
                )}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortField === column.key && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
              key={index} 
              className={cn(
                "hover:bg-muted/40 transition-all duration-200 h-12 table-row-stripe",
                onRowClick && "cursor-pointer hover:scale-[1.01] hover:shadow-sm"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  className={cn(
                    "h-12 px-4 py-3 text-sm font-medium",
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.className
                  )}
                >
                  <div className="flex items-center h-full">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : <span className="truncate">{formatCurrencyValue(row[column.key])}</span>
                    }
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {showFooter && footerData && (
          <TableFooter className="sticky bottom-0 z-10 bg-primary/90 backdrop-blur-sm border-t border-border">
            <TableRow className="hover:bg-primary/95 h-12 border-none">
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  className={cn(
                    "font-bold text-primary-foreground h-12 px-4 py-3 text-sm",
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.className
                  )}
                >
                  <div className="flex items-center h-full">
                    {column.render 
                      ? column.render(footerData[column.key], footerData)
                      : <span className="truncate">{formatCurrencyValue(footerData[column.key])}</span>
                    }
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};
