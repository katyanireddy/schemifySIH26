import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ChatbotDrawer from '../components/ai/ChatbotDrawer';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  Award,
  Users,
  Building2,
  ChevronRight,
  Zap,
  Lock,
  Globe,
  Layers
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-brand-50/60 via-slate-50 to-slate-50 dark:from-navy-950 dark:via-navy-950 dark:to-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Top Tag Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-saffron-500" />
                <span>Smart Government Opportunities Platform</span>
              </div>

              {/* Main Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Connecting Citizens to Opportunities. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-saffron-500 bg-clip-text text-transparent">
                  Empowering Futures.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover government schemes, scholarships, internships, and services personalized for you. SevaSetu matches your profile against thousands of verified central and state opportunities in seconds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 hover:from-brand-700 hover:to-indigo-800 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Explore Services</span>
                  <Search className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Verified Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 mt-8 max-w-lg mx-auto lg:mx-0">
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-brand-600 dark:text-brand-400">500+</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Schemes & Grants</p>
                </div>
                <div className="space-y-0.5 border-x border-slate-200 dark:border-slate-800 px-4">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">28</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">States Covered</p>
                </div>
                <div className="space-y-0.5 pl-2">
                  <p className="text-2xl font-black text-saffron-500">3L+</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Happy Citizens</p>
                </div>
              </div>

            </div>

            {/* Right Composition Column (Arch Mask Visual Storytelling) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Outer Saffron Glowing Ring Accent */}
              <div className="absolute -inset-4 rounded-[120px] bg-gradient-to-tr from-saffron-500/20 via-brand-500/20 to-indigo-500/20 blur-2xl -z-10"></div>

              {/* Arch Visual Container */}
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] bg-gradient-to-b from-brand-900 via-brand-800 to-indigo-950 arch-clip p-3 shadow-2xl overflow-hidden border-4 border-white/20 dark:border-slate-800">
                
                {/* SVG Monument Arch Artwork Composition */}
                <div className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-overlay">
                  <svg className="w-full h-full text-brand-400/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Monument Render Artwork Overlay */}
                <div className="w-full h-full rounded-[999px_999px_1.5rem_1.5rem] bg-gradient-to-b from-amber-600/20 via-brand-900/60 to-indigo-950 flex flex-col justify-end p-6 relative overflow-hidden text-white">
                  
                  {/* Sunset Glow Effect */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-saffron-500/30 rounded-full blur-3xl"></div>

                  <div className="space-y-2 relative z-10 text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30">
                      Smart India Hackathon Edition
                    </span>
                    <h3 className="text-xl font-black leading-tight text-white drop-shadow-md">
                      Digital Public Infrastructure
                    </h3>
                    <p className="text-xs text-brand-100 leading-relaxed drop-shadow-sm">
                      Transparent eligibility matching with zero middlemen friction.
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1: 94% Match */}
                <div className="absolute top-8 -left-4 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 animate-bounce duration-1000">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    94%
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">Scholarship Match</p>
                    <p className="text-[9px] text-emerald-600 font-semibold">100% Eligible</p>
                  </div>
                </div>

                {/* Floating Badge 2: AI Assistance */}
                <div className="absolute bottom-12 -right-4 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white">AI Assistant</p>
                    <p className="text-[9px] text-slate-500">24/7 Scheme Help</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* What SevaSetu Can Do Section */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              One Platform • Maximum Impact
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              What You Can Do on SevaSetu
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              End-to-end digital assistance connecting every Indian citizen to verified opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Discover Opportunities
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter schemes, scholarships, internships, and fellowships matching your personal profile.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Check Eligibility
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyze eligibility criteria in seconds and see near-eligible conditions met.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Apply with Confidence
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Get required documents, application steps, and deadlines in one central vault.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-saffron-500 text-white flex items-center justify-center shadow-md shadow-saffron-500/20 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AI Assistant
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ask questions in simple plain language and get instant grounded answers.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Grievance Redressal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Raise and track your complaints with transparent nodal officer support.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Civic Journey Banner */}
      <section className="py-16 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 rounded-4xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Your Journey. Our Responsibility.</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                SevaSetu is your personal assistant for all government services.
              </h2>
              <p className="text-xs sm:text-sm text-brand-200 leading-relaxed">
                100% data safe. Available across all desktop, tablet, and mobile devices.
              </p>
            </div>

            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl font-bold text-brand-900 bg-white hover:bg-slate-100 shadow-lg transition-all flex items-center gap-2 text-sm whitespace-nowrap hover:scale-105"
            >
              <span>Create Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-10 text-slate-500 dark:text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center text-sm">S</div>
            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-base">SevaSetu</span>
            <span className="text-slate-400">— A Bridge to Government Services</span>
          </div>
          <p>© 2026 SevaSetu Platform. Grounded in Official Public Government Data.</p>
        </div>
      </footer>

      {/* Floating AI Assistant Drawer */}
      <ChatbotDrawer />

    </div>
  );
};

export default Landing;
