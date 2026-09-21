import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search anything...",
  onClear,
  size = "md",
  className = "",
  id = "search-input",
  autoFocus = false
}) {
  const sizeClasses = {
    sm: "py-2 pl-9 pr-8 text-xs",
    md: "py-2.5 pl-10 pr-9 text-sm",
    lg: "py-3.5 pl-12 pr-10 text-base"
  };

  const iconSizes = {
    sm: "w-4 h-4 left-3",
    md: "w-4 h-4 left-3.5",
    lg: "w-5 h-5 left-4"
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className={`absolute text-slate-400 pointer-events-none ${iconSizes[size] || iconSizes.md}`} />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs ${sizeClasses[size] || sizeClasses.md}`}
      />
      {value && (
        <button
          type="button"
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
