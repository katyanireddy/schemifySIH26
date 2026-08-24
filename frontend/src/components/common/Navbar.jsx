import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import SevaSetuLogo from './SevaSetuLogo';
import { Sun, Moon, Globe, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-navy-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <SevaSetuLogo size="md" showTagline={true} />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link 
            to="/" 
            className={`hover:text-brand-600 dark:hover:text-white transition-colors ${location.pathname === '/' ? 'text-brand-600 dark:text-white font-bold' : ''}`}
          >
            Home
          </Link>
          <a href="#about" className="hover:text-brand-600 dark:hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-brand-600 dark:hover:text-white transition-colors">Services</a>
          <a href="#schemes" className="hover:text-brand-600 dark:hover:text-white transition-colors">Schemes</a>
          <a href="#grievance" className="hover:text-brand-600 dark:hover:text-white transition-colors">Grievances</a>
          <a href="#contact" className="hover:text-brand-600 dark:hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Language Selector */}
          <button 
            type="button" 
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Language Preferences"
          >
            <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="hidden sm:inline">English</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200/60 dark:border-slate-800/60"
            title="Toggle theme"
            aria-label="Toggle light and dark theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl transition-all shadow-md shadow-brand-600/20 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-600/20 transition-all hover:scale-[1.02]"
              >
                Get Started →
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
