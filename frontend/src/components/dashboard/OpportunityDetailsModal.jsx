import React from 'react';
import EligibilityBadge from '../common/EligibilityBadge';
import MatchScore from '../common/MatchScore';
import { X, ExternalLink, Calendar, CheckCircle2, AlertTriangle, FileText, ListOrdered, Award, ArrowUpRight, Bookmark, CheckSquare } from 'lucide-react';
import { applicationService } from '../../services/applicationService';

export const OpportunityDetailsModal = ({ opportunity, onClose, onSave, isSaved }) => {
  if (!opportunity) return null;

  const {
    id,
    name,
    type,
    description,
    benefits,
    deadline,
    official_url,
    match_score,
    recommendation_score,
    status,
    matched_conditions = [],
    missing_conditions = [],
    explanations = [],
    recommendation_reasons = [],
    improvements = [],
    documents_required = [],
    application_steps = [],
  } = opportunity;

  const displayScore = match_score || recommendation_score || 85;

  const handleApply = async () => {
    await applicationService.applyForOpportunity(opportunity);
    if (official_url && official_url.startsWith('http')) {
      window.open(official_url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Application tracked in your SevaSetu portal. Official link: ${official_url || 'https://india.gov.in'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <EligibilityBadge status={status || 'Eligible'} />
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {type || 'Scheme'}
              </span>
              <MatchScore score={displayScore} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {name || 'Government Scheme Details'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200 text-sm">
          
          {/* Description */}
          {description && (
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Overview</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Benefits */}
          {benefits && (
            <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4>Scheme Benefits & Financial Assistance</h4>
              </div>
              <p className="text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                {typeof benefits === 'string' ? benefits : JSON.stringify(benefits)}
              </p>
            </div>
          )}

          {/* Matched Criteria */}
          {matched_conditions && matched_conditions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Matched Eligibility Conditions
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Array.isArray(matched_conditions) ? matched_conditions : [matched_conditions]).map((cond, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-100 dark:border-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Criteria & Improvements for Near Eligible */}
          {missing_conditions && missing_conditions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Missing Eligibility Requirements
              </h4>
              <ul className="space-y-2">
                {(Array.isArray(missing_conditions) ? missing_conditions : [missing_conditions]).map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-100 dark:border-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>

              {improvements && improvements.length > 0 && (
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Recommended Action to Become Eligible:</span>
                  <p className="text-slate-600 dark:text-slate-300">
                    {Array.isArray(improvements) ? improvements.join('. ') : improvements}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Required Documents */}
          {documents_required && documents_required.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Required Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(documents_required) ? documents_required : [documents_required]).map((doc, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application Steps */}
          {application_steps && application_steps.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Step-by-Step Application Process
              </h4>
              <ol className="space-y-2">
                {(Array.isArray(application_steps) ? application_steps : [application_steps]).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Key Dates */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Official Application Deadline: <strong className="text-slate-900 dark:text-white">{deadline || '30 September 2026'}</strong></span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
          <button
            onClick={() => onSave && onSave(opportunity)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved to Bookmarks' : 'Save Opportunity'}</span>
          </button>

          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-md shadow-brand-500/20 transition-all"
          >
            <span>Apply via Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default OpportunityDetailsModal;
