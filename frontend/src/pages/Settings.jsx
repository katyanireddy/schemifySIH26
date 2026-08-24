import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { Settings as SettingsIcon, User, ShieldCheck, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-4xl">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Account & Portal Settings
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your preferences, active profile data, and notifications.
            </p>
          </div>

          <div className="space-y-4">
            {/* Account Summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-brand-600" />
                Citizen Account Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Name:</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{user?.name || 'Priya Sharma'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Email:</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{user?.email || 'priya@example.com'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Role:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{user?.role || 'Citizen'}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">State / Domicile:</span>
                  <p className="font-bold text-slate-900 dark:text-white">{profile?.state || 'Bihar'}</p>
                </div>
              </div>
            </div>

            {/* Theme Preference */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-600" />}
                  Interface Appearance Mode
                </h2>
                <p className="text-xs text-slate-500">Toggle between Light and Government Dark mode</p>
              </div>

              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Settings;
