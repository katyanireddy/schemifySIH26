import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import SevaSetuLogo from '../components/common/SevaSetuLogo';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Citizen');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both Email and Password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({
        email,
        name: email.split('@')[0].replace('.', ' '),
        role
      });
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-4xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Civic Branding Composition (Inspired by Reference Image 2) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 p-8 lg:p-12 text-white relative flex flex-col justify-between overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/20 rounded-full blur-3xl"></div>

            <div className="space-y-6 relative z-10">
              <SevaSetuLogo size="lg" showTagline={true} />

              <div className="space-y-3 pt-4">
                <h2 className="text-3xl font-black leading-tight text-white">
                  Discover. Connect. Benefit.
                </h2>
                <p className="text-xs sm:text-sm text-brand-100 leading-relaxed font-normal">
                  Find government schemes, scholarships, internships, and services personalized for your exact profile.
                </p>
              </div>

              {/* Pill Highlights */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Personalized 100% eligibility matching</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                  <span>Document Vault & Verification Intelligence</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                  <Sparkles className="w-4 h-4 text-brand-300 flex-shrink-0" />
                  <span>Grounded 24/7 AI Assistant Guidance</span>
                </div>
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-8 border-t border-white/10 relative z-10 text-center">
              <div>
                <p className="text-lg font-black text-saffron-400">500+</p>
                <p className="text-[10px] text-brand-200">Schemes</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-lg font-black text-emerald-400">28</p>
                <p className="text-[10px] text-brand-200">States</p>
              </div>
              <div>
                <p className="text-lg font-black text-brand-300">3L+</p>
                <p className="text-[10px] text-brand-200">Citizens</p>
              </div>
            </div>

          </div>

          {/* Right Side: Login Form */}
          <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center space-y-6">
            
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log in to continue to your citizen services portal
              </p>
            </div>

            {/* Role Distinction */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRole('Citizen')}
                className={`py-2.5 rounded-xl transition-all ${
                  role === 'Citizen'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                User Login
              </button>
              <button
                type="button"
                onClick={() => setRole('Official')}
                className={`py-2.5 rounded-xl transition-all ${
                  role === 'Official'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Admin / Officer Login
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            {/* Social Login Button */}
            <button
              type="button"
              onClick={() => {
                login({ email: 'google.user@example.com', name: 'Google Verified Citizen', role });
                navigate('/dashboard');
              }}
              className="w-full py-3 px-4 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
                Or With Email
              </span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
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
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset placeholder.'); }} className="text-[11px] font-bold text-brand-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
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

              <div className="flex items-center text-xs">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-600/20 transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

            </form>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
                Sign Up
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
