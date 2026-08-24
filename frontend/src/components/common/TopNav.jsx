import React from 'react';
import { Menu, Sun, Moon, Bell, Search, Globe, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const TopNav = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-navy-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      
      {/* Search & Menu Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search schemes, scholarships, services..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-brand-500 placeholder-slate-400 text-slate-900 dark:text-slate-100 transition-all"
            aria-label="Search schemes"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Language selector */}
        <button 
          type="button" 
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-1.5 text-xs font-bold border border-slate-200/60 dark:border-slate-800/60"
        >
          <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span className="hidden md:inline">EN</span>
        </button>

        {/* Notifications Icon */}
        <Link 
          to="/reminders"
          className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-800/60"
          title="Notifications & Deadline Alerts"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-saffron-500 rounded-full animate-ping"></span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-saffron-500 rounded-full"></span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-800/60"
          title="Toggle Theme Mode"
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
        </button>

        {/* Profile Pill */}
        <Link to="/settings" className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-700 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-brand-600/20">
            {user?.name ? user.name[0].toUpperCase() : 'P'}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              {user?.name || 'Priya Sharma'}
            </span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              {user?.role || 'Citizen'}
            </span>
          </div>
        </Link>

      </div>
    </header>
  );
};

export default TopNav;
