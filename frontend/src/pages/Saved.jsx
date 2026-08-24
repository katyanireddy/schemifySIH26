import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import OpportunityCard from '../components/dashboard/OpportunityCard';
import OpportunityDetailsModal from '../components/dashboard/OpportunityDetailsModal';
import savedService from '../services/savedService';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Saved = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const loadSaved = async () => {
    setLoading(true);
    const data = await savedService.getSavedOpportunities();
    setSavedOpportunities(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemove = async (opp) => {
    const oppId = opp.id || opp.name;
    await savedService.removeSavedOpportunity(oppId);
    loadSaved();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
              Saved Opportunities ({savedOpportunities.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Bookmarked government schemes and scholarships saved for easy reference.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500">Loading saved bookmarks...</div>
          ) : savedOpportunities.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">No Saved Opportunities Yet</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark icon on any opportunity card in the Opportunities or Dashboard pages to save it here.
              </p>
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
              >
                <span>Browse Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOpportunities.map((opp, idx) => (
                <OpportunityCard
                  key={opp.id || opp.name || idx}
                  opportunity={opp}
                  onViewDetails={setSelectedOpportunity}
                  onSave={() => handleRemove(opp)}
                  isSaved={true}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onSave={() => handleRemove(selectedOpportunity)}
          isSaved={true}
        />
      )}
    </div>
  );
};

export default Saved;
