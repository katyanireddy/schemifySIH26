import React, { useState, useMemo } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import OpportunityCard from '../components/dashboard/OpportunityCard';
import OpportunityDetailsModal from '../components/dashboard/OpportunityDetailsModal';
import OpportunityFilters from '../components/opportunities/OpportunityFilters';
import { useProfile } from '../context/ProfileContext';
import { Sparkles, SearchX, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Opportunities = () => {
  const { recommendations, profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter & Search & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMatchRange, setSelectedMatchRange] = useState('all');
  const [selectedDeadlineFilter, setSelectedDeadlineFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('sevasetu_saved_ids')) || []);

  // Consolidate backend recommendation data safely
  const rawList = useMemo(() => {
    if (!recommendations) return [];
    const list = [
      ...(recommendations.top_recommendations || []),
      ...(recommendations.eligible || []),
      ...(recommendations.near_eligible || []),
      ...(recommendations.not_eligible || []),
    ];
    // Deduplicate by opportunity ID or name
    return Array.from(new Map(list.map(item => [item.id || item.name, item])).values());
  }, [recommendations]);

  // Extract unique category types present in backend data
  const availableCategories = useMemo(() => {
    const categories = new Set();
    rawList.forEach((opp) => {
      if (opp.type) categories.add(opp.type.toLowerCase());
    });
    return Array.from(categories);
  }, [rawList]);

  // Derive filtered and sorted opportunities list
  const filteredOpportunities = useMemo(() => {
    let result = [...rawList];

    // 1. Search Query Filter (name, type, description, benefits)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((opp) => {
        const name = (opp.name || '').toLowerCase();
        const type = (opp.type || '').toLowerCase();
        const desc = (opp.description || '').toLowerCase();
        const benefits = typeof opp.benefits === 'string' ? opp.benefits.toLowerCase() : '';
        return name.includes(q) || type.includes(q) || desc.includes(q) || benefits.includes(q);
      });
    }

    // 2. Status Filter
    if (selectedStatus !== 'all') {
      result = result.filter((opp) => {
        const st = (opp.status || '').toLowerCase();
        if (selectedStatus === 'eligible') return st === 'eligible' || st === 'top recommendation';
        if (selectedStatus === 'near_eligible') return st.includes('near');
        if (selectedStatus === 'not_eligible') return st.includes('not');
        return true;
      });
    }

    // 3. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((opp) => (opp.type || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    // 4. Match Score Range Filter
    if (selectedMatchRange !== 'all') {
      result = result.filter((opp) => {
        const score = opp.match_score !== undefined ? opp.match_score : (opp.recommendation_score || 0);
        if (selectedMatchRange === '90_plus') return score >= 90;
        if (selectedMatchRange === '75_89') return score >= 75 && score < 90;
        if (selectedMatchRange === '50_74') return score >= 50 && score < 75;
        if (selectedMatchRange === 'below_50') return score < 50;
        return true;
      });
    }

    // 5. Deadline Filter
    if (selectedDeadlineFilter !== 'all') {
      const now = new Date();
      result = result.filter((opp) => {
        if (!opp.deadline) return selectedDeadlineFilter === 'open_ongoing';
        const dDate = new Date(opp.deadline);
        if (isNaN(dDate.getTime())) return selectedDeadlineFilter === 'open_ongoing';

        if (selectedDeadlineFilter === 'ending_soon') {
          const diffDays = (dDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
          return diffDays >= 0 && diffDays <= 45; // Closing within 45 days
        }
        if (selectedDeadlineFilter === 'has_deadline') {
          return true;
        }
        return true;
      });
    }

    // 6. Sorting
    result.sort((a, b) => {
      const scoreA = a.match_score !== undefined ? a.match_score : (a.recommendation_score || 0);
      const scoreB = b.match_score !== undefined ? b.match_score : (b.recommendation_score || 0);

      if (sortBy === 'highest_match') return scoreB - scoreA;
      if (sortBy === 'lowest_match') return scoreA - scoreB;
      if (sortBy === 'alphabetical') return (a.name || '').localeCompare(b.name || '');

      if (sortBy === 'deadline_soonest') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }

      // Default 'recommended': preserves backend array order
      return 0;
    });

    return result;
  }, [rawList, searchQuery, selectedStatus, selectedCategory, selectedMatchRange, selectedDeadlineFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedMatchRange('all');
    setSelectedDeadlineFilter('all');
    setSortBy('recommended');
  };

  const handleSaveToggle = (opp) => {
    const id = opp.id || opp.name;
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem('sevasetu_saved_ids', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Opportunities for You
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Explore government schemes, scholarships, internships and fellowships matched to your profile ({profile?.state || 'Bihar'}, {profile?.education_level || 'Undergraduate'}).
            </p>
          </div>

          {/* Filter Bar Component */}
          <OpportunityFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMatchRange={selectedMatchRange}
            setSelectedMatchRange={setSelectedMatchRange}
            selectedDeadlineFilter={selectedDeadlineFilter}
            setSelectedDeadlineFilter={setSelectedDeadlineFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            availableCategories={availableCategories}
            onResetFilters={handleResetFilters}
            totalResultsCount={filteredOpportunities.length}
          />

          {/* Empty / No Data States */}
          {!recommendations ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Recommendation Data Loaded</h3>
                <p className="text-xs text-slate-500">Please setup your profile to discover personalized opportunities.</p>
              </div>
              <Link
                to="/profile-setup"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors"
              >
                <span>Complete Profile Setup</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <SearchX className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Opportunities Match Your Search</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Try adjusting your search query, clearing category filters, or broadening the match percentage range.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl hover:bg-brand-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Cards Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp, idx) => {
                const oppId = opp.id || opp.name || idx;
                return (
                  <OpportunityCard
                    key={oppId}
                    opportunity={opp}
                    onViewDetails={setSelectedOpportunity}
                    onSave={handleSaveToggle}
                    isSaved={savedIds.includes(oppId)}
                  />
                );
              })}
            </div>
          )}

        </main>
      </div>

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSave={handleSaveToggle}
          isSaved={savedIds.includes(selectedOpportunity.id || selectedOpportunity.name)}
        />
      )}

    </div>
  );
};

export default Opportunities;
