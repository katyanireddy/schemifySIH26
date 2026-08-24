import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import grievanceService from '../services/grievanceService';
import { HelpCircle, Plus, Send, Clock, CheckCircle2, Paperclip, ShieldAlert, ArrowRight } from 'lucide-react';

export const Grievances = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Scholarship Portal');
  const [schemeName, setSchemeName] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [submittedGrievance, setSubmittedGrievance] = useState(null);

  const loadGrievances = async () => {
    setLoading(true);
    const data = await grievanceService.getGrievances();
    setGrievances(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description) return;

    const newGrievance = await grievanceService.createGrievance({
      subject,
      category,
      schemeName,
      description,
      attachmentName
    });

    setSubmittedGrievance(newGrievance);
    setSubject('');
    setSchemeName('');
    setDescription('');
    setAttachmentName('');
    loadGrievances();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Citizen Grievance Redressal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Register complaints regarding portal delays, missing scholarship disbursements, or document verification issues directly with nodal officers.
            </p>
          </div>

          {/* Submission Confirmation Banner */}
          {submittedGrievance && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Grievance Registered Successfully!
                </span>
                <span className="font-mono font-bold text-xs bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-emerald-300">
                  ID: {submittedGrievance.id}
                </span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-300">
                Assigned to: <strong>{submittedGrievance.assignedAuthority}</strong>. You can track resolution steps below.
              </p>
            </div>
          )}

          {/* Register Grievance Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-brand-600" />
              File New Citizen Grievance
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Verification pending at Block Office"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Grievance Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Scholarship Portal">Scholarship Portal Issue</option>
                    <option value="Document Verification">Document Verification Delay</option>
                    <option value="Disbursement">Disbursement / Stipend Delay</option>
                    <option value="Eligibility Query">Eligibility Criteria Query</option>
                    <option value="Technical Bug">Technical Portal Bug</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Related Scheme Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Post-Matric OBC Scholarship"
                    value={schemeName}
                    onChange={(e) => setSchemeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Detailed Description</label>
                <textarea
                  placeholder="Explain the problem clearly, including application dates or officer interaction..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Optional attachment name (e.g. ack_receipt.pdf)"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  />
                  <Paperclip className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Grievance</span>
                </button>
              </div>

            </form>
          </div>

          {/* Grievance Dashboard List */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Registered Grievance Tickets ({grievances.length})</h2>

            {loading ? (
              <div className="p-12 text-center text-xs text-slate-500">Loading grievances...</div>
            ) : grievances.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-500">
                No grievances registered yet.
              </div>
            ) : (
              <div className="space-y-4">
                {grievances.map((g) => (
                  <div
                    key={g.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">{g.id}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {g.category}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{g.subject}</h3>
                      </div>

                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        g.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {g.status === 'Resolved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {g.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{g.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
                      <p>Submitted On: <strong>{g.submittedDate}</strong></p>
                      <p>Assigned Authority: <strong>{g.assignedAuthority}</strong></p>
                    </div>

                    {g.timeline && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 overflow-x-auto">
                        {g.timeline.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] font-medium whitespace-nowrap">
                            <span className={`w-2 h-2 rounded-full ${step.completed ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                            <span className={step.completed ? 'text-slate-800 dark:text-slate-200 font-bold' : 'text-slate-400'}>{step.step}</span>
                            {i < g.timeline.length - 1 && <span className="text-slate-300">→</span>}
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

export default Grievances;
