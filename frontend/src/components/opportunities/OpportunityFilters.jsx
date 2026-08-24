import React, { useState } from 'react';
import { Search, X, Filter, ArrowUpDown, ChevronDown, Sparkles } from 'lucide-react';

export const OpportunityFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  selectedMatchRange,
  setSelectedMatchRange,
  selectedDeadlineFilter,
  setSelectedDeadlineFilter,
  sortBy,
  setSortBy,
  availableCategories = [],
  onResetFilters,
  totalResultsCount = 0,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedStatus !== 'all' ||
    selectedCategory !== 'all' ||
    selectedMatchRange !== 'all' ||
    selectedDeadlineFilter !== 'all' ||
    sortBy !== 'recommended';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      
      {/* Top Search & Primary Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search scholarships, internships, fellowships, benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            aria-label="Search opportunities"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer Trigger & Sort Dropdown */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="sm:hidden flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <Filter className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Filters</span>
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer outline-none pr-2"
                aria-label="Sort opportunities by"
              >
                <option value="recommended" className="dark:bg-slate-900">Recommended</option>
                <option value="highest_match" className="dark:bg-slate-900">Highest Match Score</option>
                <option value="lowest_match" className="dark:bg-slate-900">Lowest Match Score</option>
                <option value="deadline_soonest" className="dark:bg-slate-900">Deadline Soonest</option>
                <option value="alphabetical" className="dark:bg-slate-900">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Filter Control Section (Desktop visible, Mobile collapsible drawer) */}
      <div className={`space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 ${mobileFilterOpen ? 'block' : 'hidden sm:block'}`}>
        
        {/* Status Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'eligible', label: '✓ Eligible' },
            { id: 'near_eligible', label: '⚠ Near Eligible' },
            { id: 'not_eligible', label: '✕ Not Eligible' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === tab.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Dropdowns (Category, Match %, Deadline) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          
          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Match Score Range Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Match Percentage
            </label>
            <select
              value={selectedMatchRange}
              onChange={(e) => setSelectedMatchRange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            >
              <option value="all">All Match Scores</option>
              <option value="90_plus">90% and above</option>
              <option value="75_89">75% – 89%</option>
              <option value="50_74">50% – 74%</option>
              <option value="below_50">Below 50%</option>
            </select>
          </div>

          {/* Deadline Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Application Deadline
            </label>
            <select
              value={selectedDeadlineFilter}
              onChange={(e) => setSelectedDeadlineFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            >
              <option value="all">All Deadlines</option>
              <option value="ending_soon">Ending Soon (Within 30 Days)</option>
              <option value="has_deadline">Has Specific Deadline</option>
              <option value="open_ongoing">Open / Ongoing</option>
            </select>
          </div>

        </div>

        {/* Clear Filters Indicator Bar */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{totalResultsCount}</strong> opportunities
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default OpportunityFilters;
