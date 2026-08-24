import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import reminderService from '../services/reminderService';
import { Bell, Calendar, Clock, AlertTriangle, Plus, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Reminders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for creating custom citizen reminder
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Deadline Alert');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const loadReminders = async () => {
    setLoading(true);
    const data = await reminderService.getReminders();
    setReminders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    await reminderService.createReminder({
      title,
      category,
      dueDate,
      notes,
      relatedLink: category === 'Document Expiry' ? '/documents' : '/opportunities'
    });

    setTitle('');
    setDueDate('');
    setNotes('');
    loadReminders();
  };

  const handleDelete = async (id) => {
    await reminderService.deleteReminder(id);
    loadReminders();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Reminders & Deadline Alerts ({reminders.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Never miss a scholarship portal deadline or document renewal date with automated alerts.
            </p>
          </div>

          {/* Create Custom Reminder */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-brand-600" />
              Set Custom Reminder Alert
            </h2>

            <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reminder Title</label>
                <input
                  type="text"
                  placeholder="e.g. Renew Caste Certificate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                >
                  <option value="Deadline Alert">Scholarship Deadline Alert</option>
                  <option value="Document Expiry">Document Expiry Alert</option>
                  <option value="Application Reminder">Application Stage Reminder</option>
                  <option value="General Alert">General Alert</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reminder</span>
                </button>
              </div>
            </form>
          </div>

          {/* Reminders List */}
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500">Loading reminders...</div>
          ) : reminders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-500">
              No active reminders set.
            </div>
          ) : (
            <div className="space-y-3">
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    rem.urgency === 'High'
                      ? 'border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                        {rem.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        rem.urgency === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                      }`}>
                        {rem.urgency} Urgency
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {rem.daysRemaining} Days Left
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{rem.title}</h3>
                    {rem.notes && <p className="text-xs text-slate-600 dark:text-slate-400">{rem.notes}</p>}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Calendar className="w-4 h-4 text-brand-600" />
                      <span>{rem.dueDate}</span>
                    </div>

                    {rem.relatedLink && (
                      <Link
                        to={rem.relatedLink}
                        className="px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(rem.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Reminders;
