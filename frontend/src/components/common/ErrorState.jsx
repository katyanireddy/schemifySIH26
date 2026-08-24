import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ title = 'Unable to Load Recommendations', message, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center space-y-4 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-300 flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-red-900 dark:text-red-200">{title}</h3>
        <p className="text-sm text-red-700 dark:text-red-300">
          {message || 'Unable to connect to SevaSetu recommendations service. Please verify backend status or try again.'}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
