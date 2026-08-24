import React from 'react';

export const SevaSetuLogo = ({ size = 'md', showTagline = true, className = '' }) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7 text-xs', title: 'text-base', tagline: 'text-[9px]' },
    md: { icon: 'w-10 h-10 text-base', title: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 'w-12 h-12 text-xl', title: 'text-2xl', tagline: 'text-xs' },
  };

  const curr = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      
      {/* Emblem Geometric Icon */}
      <div className={`${curr.icon} rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-brand-600/25 relative overflow-hidden group`}>
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0,transparent_70%)]"></div>
        <svg className="w-3/5 h-3/5 text-amber-400 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <span className={`${curr.title} font-black tracking-tight bg-gradient-to-r from-brand-900 via-brand-700 to-indigo-800 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent leading-none`}>
          SevaSetu
        </span>
        {showTagline && (
          <span className={`${curr.tagline} font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1`}>
            A Bridge to Government Services
          </span>
        )}
      </div>

    </div>
  );
};

export default SevaSetuLogo;
