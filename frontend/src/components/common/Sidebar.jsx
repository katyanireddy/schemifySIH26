import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Briefcase, 
  Bookmark, 
  Bell, 
  HelpCircle, 
  Settings, 
  LogOut,
  Bot
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SevaSetuLogo from './SevaSetuLogo';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Opportunities', path: '/opportunities', icon: Sparkles },
    { name: 'Near Eligible', path: '/near-eligible', icon: CheckCircle2 },
    { name: 'Applications', path: '/applications', icon: Briefcase },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Saved', path: '/saved', icon: Bookmark },
    { name: 'Reminders', path: '/reminders', icon: Bell },
    { name: 'Grievances', path: '/grievances', icon: HelpCircle },
    { name: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-navy-950 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/80">
          <SevaSetuLogo size="sm" showTagline={false} />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
          <NavLink
            to="/settings"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
