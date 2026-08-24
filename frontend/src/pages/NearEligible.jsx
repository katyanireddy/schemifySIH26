import React, { useState, useMemo } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import OpportunityCard from '../components/dashboard/OpportunityCard';
import OpportunityDetailsModal from '../components/dashboard/OpportunityDetailsModal';
import { useProfile } from '../context/ProfileContext';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NearEligible = () => {
  const { recommendations, profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('sevasetu_saved_ids')) || []);

  // Extract near-eligible opportunities from backend response
  const nearEligibleList = useMemo(() => {
    if (!recommendations) return [];

    // Primary: use backend's near_eligible array
    if (recommendations.near_eligible && recommendations.near_eligible.length > 0) {
      return recommendations.near_eligible;
    }

    // Fallback: check top_recommendations for status containing 'near'
    const topList = recommendations.top_recommendations || [];
    return topList.filter((opp) => (opp.status || '').toLowerCase().includes('near'));
  }, [recommendations]);

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
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-saffron-950 p-6 sm:p-8 rounded-2xl text-white shadow-lg space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-xs font-semibold text-amber-200 border border-amber-400/30">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Personalized Eligibility Engine</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Almost There
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
              These opportunities are close to matching your profile. See what's missing and how you can become eligible.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-300">
              <span className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-700/50">
                {nearEligibleList.length} opportunities you're close to qualifying for
              </span>
            </div>
          </div>

          {/* Near-Eligible Cards Spotlight Grid */}
          {!recommendations ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No profile data available.</p>
              <Link
                to="/profile-setup"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
              >
                Setup Profile First
              </Link>
            </div>
          ) : nearEligibleList.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                You're Currently Eligible for All Available Matches!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You have no near-eligible opportunities because your profile meets 100% of criteria for your primary matched schemes.
              </p>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl"
              >
                View Eligible Schemes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearEligibleList.map((opp, idx) => {
                const oppId = opp.id || opp.name || idx;
                const matchedCount = (opp.matched_conditions || []).length;
                const missingCount = (opp.missing_conditions || []).length;
                const totalConditions = matchedCount + missingCount || 5;

                return (
                  <div
                    key={oppId}
                    className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/60 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
                  >
                    
                    {/* Header: Title & Match Badge */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          {opp.match_score || 82}% MATCH — Almost Eligible
                        </span>
                        
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                          {(opp.type || 'Scheme').replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {opp.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {opp.description}
                      </p>
                    </div>

                    {/* Conditions Met Summary Strip */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Conditions Met Ratio:</span>
                      <span className="text-slate-900 dark:text-white font-extrabold">
                        {matchedCount} / {totalConditions} Criteria Satisfied
                      </span>
                    </div>

                    {/* Matched vs Missing Conditions List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      
                      {/* Matched */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] uppercase tracking-wider block mb-1">
                          Matched Conditions:
                        </span>
                        {(opp.matched_conditions || ['State', 'Category', 'Income', 'Course']).map((cond, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{cond}</span>
                          </div>
                        ))}
                      </div>

                      {/* Missing */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                        <span className="font-bold text-amber-800 dark:text-amber-300 text-[11px] uppercase tracking-wider block mb-1">
                          Missing Requirements:
                        </span>
                        {(opp.missing_conditions || ['Year of study condition']).map((cond, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-medium">
                            <X className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span className="truncate">{cond}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* How Can I Become Eligible (Improvements block from backend) */}
                    {opp.improvements && (
                      <div className="p-3.5 rounded-xl bg-amber-100/50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>How Can I Become Eligible?</span>
                        </div>
                        <p className="text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                          {Array.isArray(opp.improvements) ? opp.improvements.join('. ') : opp.improvements}
                        </p>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-500">
                        Deadline: {opp.deadline || '30 Sep 2026'}
                      </span>

                      <button
                        onClick={() => setSelectedOpportunity(opp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-700 hover:to-saffron-700 rounded-xl transition-all shadow-xs"
                      >
                        <span>See How to Qualify</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>

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

export default NearEligible;
