import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import SevaSetuLogo from '../components/common/SevaSetuLogo';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Citizen');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!agreed) {
      setError('You must accept the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({
        fullName,
        email,
        role
      });
      setLoading(false);
      navigate('/profile-setup');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-4xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Storytelling Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 p-8 lg:p-12 text-white relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-saffron-500/20 rounded-full blur-3xl"></div>

            <div className="space-y-6 relative z-10">
              <SevaSetuLogo size="lg" showTagline={true} />

              <div className="space-y-3 pt-4">
                <h2 className="text-2xl font-black leading-tight text-white">
                  Join SevaSetu Today
                </h2>
                <p className="text-xs sm:text-sm text-brand-100 leading-relaxed font-normal">
                  Create your citizen account to unlock direct access to government schemes and scholarships.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Free & Secure Public Service</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                  <span>Direct Link to Official Portals</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Sparkles className="w-4 h-4 text-brand-300 flex-shrink-0" />
                  <span>AI Powered Plain-Language Support</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10 text-xs text-brand-200 text-center">
              Trusted by 3 Lakh+ Indian Citizens
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center space-y-6">
            
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Create Your Account
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Join SevaSetu and start your personalized journey today
              </p>
            </div>

            {/* Role Distinction */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRole('Citizen')}
                className={`py-2 rounded-xl transition-all ${
                  role === 'Citizen'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => setRole('Official')}
                className={`py-2 rounded-xl transition-all ${
                  role === 'Official'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Government Official
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Priya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="leading-snug">
                  I agree to the Terms of Service & Privacy Policy for Citizen Data.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-600/20 transition-all"
              >
                {loading ? 'Creating Account...' : 'Create Account & Setup Profile'}
              </button>

            </form>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
                Sign In
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
