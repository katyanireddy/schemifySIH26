import React from 'react';
import EligibilityBadge from '../common/EligibilityBadge';
import MatchScore from '../common/MatchScore';
import { Calendar, ArrowRight, Check, AlertCircle, Bookmark, Award, HelpCircle } from 'lucide-react';

export const OpportunityCard = ({ opportunity, onViewDetails, onSave, isSaved }) => {
  const {
    name,
    type,
    description,
    benefits,
    deadline,
    match_score,
    recommendation_score,
    status,
    matched_conditions = [],
    missing_conditions = [],
    improvements = [],
  } = opportunity || {};

  const displayScore = match_score !== undefined ? match_score : (recommendation_score || 85);
  const normStatus = (status || '').toLowerCase();
  const isNearEligible = normStatus.includes('near');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <EligibilityBadge status={status || 'Eligible'} />
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 capitalize">
              {(type || 'Scheme').replace('_', ' ')}
            </span>
          </div>
          <MatchScore score={displayScore} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
          {name || 'Government Opportunity'}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {description || 'Discover financial support, grants, and skill development opportunities tailored to your eligibility profile.'}
        </p>

        {/* Benefits Pill if present */}
        {benefits && (
          <div className="mt-3 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium border border-emerald-100 dark:border-emerald-900 line-clamp-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{typeof benefits === 'string' ? benefits : 'Financial stipend & support'}</span>
          </div>
        )}

        {/* Matched / Missing Conditions Preview */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
          {matched_conditions && matched_conditions.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate">
                Matched: {Array.isArray(matched_conditions) ? matched_conditions.slice(0, 2).join(', ') : String(matched_conditions)}
              </span>
            </div>
          )}

          {missing_conditions && missing_conditions.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="truncate">
                Missing: {Array.isArray(missing_conditions) ? missing_conditions.slice(0, 2).join(', ') : String(missing_conditions)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>{deadline || 'Ongoing'}</span>
        </div>

        <div className="flex items-center gap-2">
          {onSave && (
            <button
              onClick={() => onSave(opportunity)}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isSaved
                  ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save Opportunity'}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark opportunity'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          )}

          <button
            onClick={() => onViewDetails(opportunity)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-xl transition-all shadow-xs ${
              isNearEligible
                ? 'bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-700 hover:to-saffron-700'
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700'
            }`}
          >
            <span>{isNearEligible ? 'How to Qualify' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default OpportunityCard;
