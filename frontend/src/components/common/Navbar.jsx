import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import SevaSetuLogo from './SevaSetuLogo';
import { 
  Sun, 
  Moon, 
  Globe, 
  LogOut, 
  LayoutDashboard, 
  Phone, 
  Clock, 
  ChevronDown,
  HelpCircle,
  FileText,
  ShieldAlert
} from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col font-sans">
      
      {/* Top Utility Bar (Thin Dark Navy Strip matching IMAGE 2) */}
      <div className="bg-navy-950 text-slate-300 border-b border-white/10 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Helpline & Working Hours */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-saffron-400" />
              <span>Helpline: <strong className="text-white">1800 123 4567</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-brand-400" />
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-4 text-slate-300">
            <Link to="/opportunities" className="hover:text-white transition-colors hidden md:inline">Schemes</Link>
            <Link to="/grievances" className="hover:text-white transition-colors hidden md:inline">Grievances</Link>
            <Link to="/reminders" className="hover:text-white transition-colors hidden md:inline">Help & Support</Link>
            
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white">
              <span>Quick Links</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              
              <div className="absolute right-0 top-full mt-1 w-44 bg-navy-900 border border-slate-700 rounded-xl shadow-xl p-2 hidden group-hover:block z-50 text-xs">
                <Link to="/opportunities" className="block px-3 py-1.5 hover:bg-slate-800 rounded-lg text-slate-200">State Schemes</Link>
                <Link to="/documents" className="block px-3 py-1.5 hover:bg-slate-800 rounded-lg text-slate-200">Document Vault</Link>
                <Link to="/grievances" className="block px-3 py-1.5 hover:bg-slate-800 rounded-lg text-slate-200">Grievance Portal</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-md shadow-lg border-slate-200/80 dark:border-slate-800/80 py-3' 
          : 'bg-white dark:bg-navy-950 border-slate-200/80 dark:border-slate-800/80 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <SevaSetuLogo size="md" showTagline={true} />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Link 
              to="/" 
              className={`hover:text-brand-600 dark:hover:text-white transition-colors relative py-1 ${
                location.pathname === '/' ? 'text-brand-600 dark:text-white font-black' : ''
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full"></span>
              )}
            </Link>
            <a href="#about" className="hover:text-brand-600 dark:hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-brand-600 dark:hover:text-white transition-colors">Services</a>
            <Link to="/opportunities" className="hover:text-brand-600 dark:hover:text-white transition-colors">Schemes</Link>
            <Link to="/grievances" className="hover:text-brand-600 dark:hover:text-white transition-colors">Grievances</Link>
            <a href="#contact" className="hover:text-brand-600 dark:hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <button 
              type="button" 
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-200/80 dark:border-slate-800"
              title="Language Preferences"
            >
              <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span className="hidden sm:inline">English</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
              title="Toggle Light/Dark Theme"
              aria-label="Toggle light and dark theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
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
      </div>

    </header>
  );
};

export default Navbar;
