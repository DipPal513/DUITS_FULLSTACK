import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// ============================================
// Pagination Hook - Business Logic
// ============================================
export const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToPrevious = () => {
    if (canGoPrevious) setCurrentPage(prev => prev - 1);
  };
  
  const goToNext = () => {
    if (canGoNext) setCurrentPage(prev => prev + 1);
  };
  
  const goToFirst = () => setCurrentPage(1);
  
  const goToLast = () => setCurrentPage(totalPages);
  
  // Reset to page 1 when totalItems changes significantly
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    canGoPrevious,
    canGoNext,
    goToPage,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    setCurrentPage
  };
};

// ============================================
// Pagination Button Component
// ============================================
const PaginationButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  active = false,
  variant = 'default',
  className = '' 
}) => {
  const baseStyles = "min-w-[2.5rem] h-10 px-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  const variantStyles = {
    default: active 
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg" 
      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400",
    icon: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 flex items-center gap-2"
  };
  
  const disabledStyles = "opacity-50 cursor-not-allowed hover:bg-white hover:border-slate-300 hover:shadow-none";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// ============================================
// Page Numbers Generator
// ============================================
const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  const maxVisible = 7;
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis-end');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('ellipsis-start');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('ellipsis-start');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('ellipsis-end');
      pages.push(totalPages);
    }
  }
  
  return pages;
};

// ============================================
// Pagination Info Component
// ============================================
export const PaginationInfo = ({ startIndex, endIndex, totalItems, className = '' }) => {
  if (totalItems === 0) return null;
  
  return (
    <div className={`text-sm text-slate-600 ${className}`}>
      Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{' '}
      <span className="font-semibold text-slate-800">{endIndex}</span> of{' '}
      <span className="font-semibold text-slate-800">{totalItems}</span> notices
    </div>
  );
};

// ============================================
// Main Pagination Component
// ============================================
export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  showFirstLast = true,
  className = ''
}) => {
  if (totalPages <= 1) return null;
  
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* First Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={onFirst}
          disabled={!canGoPrevious}
          variant="icon"
          className="hidden sm:flex"
        >
          <ChevronsLeft size={16} />
        </PaginationButton>
      )}
      
      {/* Previous Button */}
      <PaginationButton
        onClick={onPrevious}
        disabled={!canGoPrevious}
        variant="icon"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </PaginationButton>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string' && page.startsWith('ellipsis')) {
            return (
              <span key={page} className="px-3 py-2 text-slate-400 select-none">
                ...
              </span>
            );
          }
          
          return (
            <PaginationButton
              key={page}
              onClick={() => onPageChange(page)}
              active={currentPage === page}
            >
              {page}
            </PaginationButton>
          );
        })}
      </div>

      {/* Next Button */}
      <PaginationButton
        onClick={onNext}
        disabled={!canGoNext}
        variant="icon"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </PaginationButton>
      
      {/* Last Page Button */}
      {showFirstLast && (
        <PaginationButton
          onClick={onLast}
          disabled={!canGoNext}
          variant="icon"
          className="hidden sm:flex"
        >
          <ChevronsRight size={16} />
        </PaginationButton>
      )}
    </div>
  );
};

// ============================================
// Complete Pagination Controls Component
// ============================================
export const PaginationControls = ({ 
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  showFirstLast = true,
  showInfo = true,
  className = ''
}) => {
  // Debug log
  console.log('PaginationControls render:', { currentPage, totalPages, totalItems, startIndex, endIndex });
  
  if (totalPages <= 1) {
    console.log('Pagination hidden: totalPages <= 1');
    return null;
  }
  
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 ${className}`}>
      {showInfo && (
        <PaginationInfo 
          startIndex={startIndex} 
          endIndex={endIndex} 
          totalItems={totalItems} 
        />
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        onPrevious={onPrevious}
        onNext={onNext}
        onFirst={onFirst}
        onLast={onLast}
        showFirstLast={showFirstLast}
      />
    </div>
  );
};