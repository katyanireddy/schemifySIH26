import React from 'react';

export const MatchScore = ({ score }) => {
  const numericScore = typeof score === 'number' ? Math.round(score > 1 ? score : score * 100) : 0;
  
  let colorClass = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  if (numericScore < 85 && numericScore >= 70) {
    colorClass = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (numericScore < 70) {
    colorClass = 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${colorClass}`}>
      <span>{numericScore}%</span>
      <span className="font-normal text-[11px] opacity-80">Match</span>
    </div>
  );
};

export default MatchScore;
