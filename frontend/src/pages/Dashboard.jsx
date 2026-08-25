import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import recommendationService from '../services/recommendationService';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import StatCard from '../components/common/StatCard';
import OpportunityCard from '../components/dashboard/OpportunityCard';
import OpportunityDetailsModal from '../components/dashboard/OpportunityDetailsModal';
import ChatbotDrawer from '../components/ai/ChatbotDrawer';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Briefcase, 
  HelpCircle, 
  Bot, 
  ArrowRight, 
  RefreshCw, 
  UserCheck,
  Clock,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SMART_CATEGORIES = [
  { label: 'Scholarships', icon: GraduationCap },
  { label: 'Government Schemes', icon: Award },
  { label: 'Internships', icon: Briefcase },
  { label: 'Jobs', icon: Briefcase },
  { label: 'Learning Programs', icon: BookOpen },
  { label: 'Skill Development', icon: Sparkles },
  { label: 'Fellowships', icon: Award },
  { label: 'Innovation & Competitions', icon: Sparkles },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const { profile, recommendations, setRecommendations } = useProfile();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('sevasetu_saved_ids')) || []);
  const [loading, setLoading] = useState(!recommendations);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await recommendationService.getRecommendations(profile);
      setRecommendations(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to recommendation backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!recommendations) {
      fetchRecommendations();
    }
  }, []);

  const handleSaveToggle = (opp) => {
    const id = opp.id || opp.name;
    setSavedIds((prev) => {
      let updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('sevasetu_saved_ids', JSON.stringify(updated));
      return updated;
    });
  };

  const rawTopOpportunities = recommendations?.top_recommendations || [];
  const topOpportunities = selectedCategory === 'All' 
    ? rawTopOpportunities.slice(0, 3) 
    : rawTopOpportunities.filter(o => (o.type || o.category || '').toLowerCase().includes(selectedCategory.toLowerCase())).slice(0, 3);

  const totalEligibleCount = recommendations?.eligible?.length || (rawTopOpportunities.filter(o => (o.status || '').toLowerCase() === 'eligible').length) || 12;
  const totalNearEligibleCount = recommendations?.near_eligible?.length || (rawTopOpportunities.filter(o => (o.status || '').toLowerCase().includes('near')).length) || 8;
  const totalMatchesCount = (recommendations?.top_recommendations?.length || 0) + (recommendations?.eligible?.length || 0) + (recommendations?.near_eligible?.length || 0) || 24;

  const upcomingDeadlinesMock = [
    { title: 'National Scholarship Portal 2026', date: '30 Sep 2026', daysLeft: '2 days left', urgency: 'High' },
    { title: 'PM Government Research Internship', date: '15 Oct 2026', daysLeft: '17 days left', urgency: 'Medium' },
    { title: 'AI & Data Science Skill Grant', date: '20 Oct 2026', daysLeft: '22 days left', urgency: 'Medium' },
    { title: 'Young Innovator Student Fellowship', date: '25 Oct 2026', daysLeft: '27 days left', urgency: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex transition-colors font-sans">
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Workspace */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
          
          {/* Smart Education Greeting Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl"></div>

            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-saffron-300 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Education Student Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Good morning, {user?.name || 'Praneel'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-brand-200">
                Here are opportunities matched to your education ({profile.course || 'B.Tech'}), skills, and career goals.
              </p>
            </div>

            {/* Profile Match Indicator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 relative z-10">
              <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-200">Profile Strength</span>
                  <span className="font-black text-emerald-400">92%</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <span className="text-emerald-400">Edu ✓</span> • 
                  <span className="text-emerald-400">Skills ✓</span> • 
                  <span className="text-emerald-400">Interests ✓</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/profile-setup"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 transition-colors flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Edit Profile</span>
                </Link>
                <button
                  onClick={fetchRecommendations}
                  className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-xs"
                  title="Refresh Recommendations"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/opportunities">
              <StatCard
                title="Total Student Matches"
                value={totalMatchesCount}
                subtitle="+12 this week"
                icon={Sparkles}
                color="brand"
              />
            </Link>
            <Link to="/opportunities">
              <StatCard
                title="Eligible Schemes & Grants"
                value={totalEligibleCount}
                subtitle="View all"
                icon={CheckCircle2}
                color="emerald"
              />
            </Link>
            <Link to="/near-eligible">
              <StatCard
                title="Near Eligible Opportunities"
                value={totalNearEligibleCount}
                subtitle="View all"
                icon={AlertTriangle}
                color="amber"
              />
            </Link>
            <Link to="/reminders">
              <StatCard
                title="Upcoming Deadlines"
                value="4"
                subtitle="View all"
                icon={Calendar}
                color="indigo"
              />
            </Link>
          </div>

          {/* Smart Category Filter Strip */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Explore Opportunities by Category</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500'
                }`}
              >
                All Opportunities
              </button>
              {SMART_CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.label
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Dashboard Grid: Top Opportunities (Left) & Upcoming Deadlines (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Top Opportunities Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    Recommended For You
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Matched to your education, eligibility, skills ({profile.skills?.slice(0, 2).join(', ')}) and career goals.
                  </p>
                </div>

                <Link
                  to="/opportunities"
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <LoadingState message="Analyzing student recommendations from SevaSetu Engine..." />
              ) : error ? (
                <ErrorState message={error} onRetry={fetchRecommendations} />
              ) : topOpportunities.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No opportunities matched your selected category.</p>
                  <button onClick={() => setSelectedCategory('All')} className="text-xs font-bold text-brand-600 hover:underline">
                    View All Categories
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topOpportunities.map((opp, idx) => {
                    const oppId = opp.id || opp.name || idx;
                    const isSaved = savedIds.includes(oppId);
                    return (
                      <OpportunityCard
                        key={oppId}
                        opportunity={opp}
                        onViewDetails={setSelectedOpportunity}
                        onSave={handleSaveToggle}
                        isSaved={isSaved}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upcoming Deadlines Column */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400" />
                  Upcoming Deadlines
                </h3>
                <Link to="/reminders" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingDeadlinesMock.map((dl, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:shadow-xs transition-shadow">
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{dl.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{dl.date}</p>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      dl.urgency === 'High'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                    }`}>
                      {dl.daysLeft}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Student Quick Action Tiles */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Student Quick Actions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <Link
                to="/documents"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600">Documents Vault</h4>
                  <p className="text-[11px] text-slate-500">Upload & manage marksheets</p>
                </div>
              </Link>

              <Link
                to="/applications"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">Applications</h4>
                  <p className="text-[11px] text-slate-500">Track scholarship applications</p>
                </div>
              </Link>

              <Link
                to="/grievances"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600">Grievances</h4>
                  <p className="text-[11px] text-slate-500">Report portal & stipend delays</p>
                </div>
              </Link>

              <Link
                to="/ai-assistant"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">AI Assistant</h4>
                  <p className="text-[11px] text-slate-500">Ask student opportunity FAQs</p>
                </div>
              </Link>

            </div>
          </div>

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

      {/* Floating AI Assistant Drawer */}
      <ChatbotDrawer />

    </div>
  );
};

export default Dashboard;
