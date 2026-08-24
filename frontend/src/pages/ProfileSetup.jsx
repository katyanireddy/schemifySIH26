import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useProfile } from '../context/ProfileContext';
import recommendationService from '../services/recommendationService';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { User, GraduationCap, IndianRupee, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh'
];

const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'];
const EDUCATION_LEVELS = ['High School (10th)', 'Higher Secondary (12th)', 'Undergraduate', 'Postgraduate', 'Doctorate (Ph.D)', 'Diploma', 'ITI'];
const INSTITUTION_TYPES = ['Recognized regular college/university', 'Government College', 'Private University', 'Deemed University', 'Autonomous Institute'];

export const ProfileSetup = () => {
  const { profile, saveProfileData } = useProfile();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.age || !formData.state || !formData.category) {
        setError('Please complete all required demographic fields.');
        return;
      }
    } else if (step === 2) {
      if (!formData.education_level || !formData.course || !formData.year_of_study) {
        setError('Please fill in your current education details.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.annual_income === undefined || formData.annual_income === '') {
      setError('Please provide your annual family income.');
      return;
    }

    setLoading(true);
    try {
      // Execute POST /recommendations to live FastAPI backend
      const recommendations = await recommendationService.getRecommendations(formData);
      saveProfileData(formData, recommendations);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to analyze recommendations. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
        
        {/* Page Title */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Eligibility Match Engine
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Set Up Your Citizen Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Your profile details are matched against real government eligibility criteria to unlock personalized scheme recommendations.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-8 max-w-md mx-auto w-full relative">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0"></div>
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-300 -z-0"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>

          {[
            { id: 1, label: 'Demographics', icon: User },
            { id: 2, label: 'Education', icon: GraduationCap },
            { id: 3, label: 'Income & Submit', icon: IndianRupee },
          ].map((s) => {
            const Icon = s.icon;
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5 z-10 bg-slate-50 dark:bg-slate-900 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isCurrent
                      ? 'bg-brand-600 text-white shadow-lg ring-4 ring-brand-100 dark:ring-brand-900/50'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[11px] font-semibold ${isCurrent ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl relative">
          
          {loading ? (
            <LoadingState message="Sending profile to SevaSetu FastAPI Engine (POST /recommendations)..." />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* STEP 1: DEMOGRAPHICS */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    Step 1: Personal & Demographic Profile
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Age (Years) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={formData.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender</label>
                      <select
                        value={formData.gender || 'female'}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* State */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Current State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* Domicile State */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Domicile State</label>
                      <select
                        value={formData.domicile_state || formData.state}
                        onChange={(e) => handleChange('domicile_state', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select Domicile State</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Social Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      >
                        <option value="">Select Category</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Disability */}
                    <div className="space-y-1 sm:col-span-2 pt-2">
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(formData.disability)}
                          onChange={(e) => handleChange('disability', e.target.checked)}
                          className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Person with Disability (PwD) / Specially Abled Criteria
                        </span>
                      </label>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 2: EDUCATION */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    Step 2: Educational Qualifications
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Education Level */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Current Education Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.education_level}
                        onChange={(e) => handleChange('education_level', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      >
                        <option value="">Select Education Level</option>
                        {EDUCATION_LEVELS.map((ed) => (
                          <option key={ed} value={ed}>{ed}</option>
                        ))}
                      </select>
                    </div>

                    {/* Course */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Course / Stream <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. B.Tech, B.Sc, BA, Class XII"
                        value={formData.course}
                        onChange={(e) => handleChange('course', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      />
                    </div>

                    {/* Year of Study */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Year of Study <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.year_of_study}
                        onChange={(e) => handleChange('year_of_study', Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      >
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
                        <option value={5}>5th Year</option>
                      </select>
                    </div>

                    {/* Percentage */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Academic Marks / Percentage (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="e.g. 90"
                        value={formData.percentage || ''}
                        onChange={(e) => handleChange('percentage', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    {/* Institution Type */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Institution Type
                      </label>
                      <select
                        value={formData.institution_type || ''}
                        onChange={(e) => handleChange('institution_type', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select Institution Type</option>
                        {INSTITUTION_TYPES.map((inst) => (
                          <option key={inst} value={inst}>{inst}</option>
                        ))}
                      </select>
                    </div>

                    {/* Previous Qualification */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Previous Qualification
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Class XII, Class X, Diploma"
                        value={formData.previous_qualification || ''}
                        onChange={(e) => handleChange('previous_qualification', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3: INCOME & SUBMIT */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    Step 3: Annual Family Income
                  </h2>

                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Annual Family Income (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        placeholder="e.g. 240000"
                        value={formData.annual_income}
                        onChange={(e) => handleChange('annual_income', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                        required
                      />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Government scholarships use annual income limits (e.g. ₹2.5 Lakhs or ₹8 Lakhs) to establish financial eligibility.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Ready to Analyze Recommendations</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        Submitting will trigger a live API call to <code>POST /recommendations</code> on <code>https://schemify-backend.onrender.com</code>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-700 hover:to-brand-700 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <span>Analyze Opportunities</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProfileSetup;
