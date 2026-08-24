import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import applicationService from '../services/applicationService';
import { Briefcase, CheckCircle2, Clock, Calendar, ExternalLink, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const Applications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    setLoading(true);
    const data = await applicationService.getApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Applications Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Track the progress, nodal officer verifications, and disbursement stages of your submitted scheme applications.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-500 space-y-2">
              <p className="font-bold text-slate-700 dark:text-slate-300">No active applications found.</p>
              <p>Apply for eligible schemes on the Opportunities page to begin tracking.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6"
                >
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                          {app.trackingNumber}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {app.type}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{app.opportunityName}</h2>
                      <p className="text-xs text-slate-500">{app.department}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                          : app.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                          : 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 border border-brand-300'
                      }`}>
                        {app.status === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Dates Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Applied On:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{app.appliedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Portal Deadline:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{app.deadline}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Application ID:</span>
                      <span className="font-mono text-slate-600 dark:text-slate-400">{app.id}</span>
                    </div>
                  </div>

                  {/* Progress Stepper Timeline */}
                  {app.timeline && app.timeline.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Verification Status Timeline
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {app.timeline.map((st, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              st.completed
                                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 font-bold">
                              {st.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-slate-400" />}
                              <span>{st.step}</span>
                            </div>
                            <p className="text-[10px] opacity-80">{st.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Applications;
