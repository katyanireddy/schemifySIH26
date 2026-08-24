import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export const EligibilityBadge = ({ status }) => {
  const normStatus = (status || '').toLowerCase();

  if (normStatus === 'eligible' || normStatus === 'top recommendation') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        Eligible
      </span>
    );
  }

  if (normStatus === 'near eligible' || normStatus === 'near_eligible') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        Near Eligible
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <XCircle className="w-3.5 h-3.5 text-slate-500" />
      Not Eligible
    </span>
  );
};

export default EligibilityBadge;
