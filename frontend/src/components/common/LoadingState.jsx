import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Analyzing eligibility against government criteria...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-brand-200 dark:border-brand-900 border-t-brand-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-brand-600 rounded-full"></div>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse max-w-sm">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;
