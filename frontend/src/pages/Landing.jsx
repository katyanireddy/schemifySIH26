import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ChatbotDrawer from '../components/ai/ChatbotDrawer';
import heroMonument from '../assets/hero_monument.jpg';
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
  Briefcase,
  GraduationCap,
  Scale,
  Clock,
  Lock,
  Globe,
  Heart,
  Layers
} from 'lucide-react';

export const Landing = () => {
  
  // Intersection Observer for scroll-reveal motion
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Header (No top utility bar) */}
      <Navbar />

      {/* Cinematic Hero Section (Exact Visual Treatment from Reference) */}
      <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center bg-navy-950 text-white">
        
        {/* Right-Aligned Government Building Photograph */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] h-full z-0 overflow-hidden">
          <img 
            src={heroMonument} 
            alt="Government Secretariat Building" 
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          {/* Top & Bottom subtle vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40 pointer-events-none"></div>
        </div>

        {/* Left Surface Gradient Overlay: Solid Deep Navy (Left) -> Smooth Transition -> Clear Image (Right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-transparent w-full lg:w-[65%] z-10 pointer-events-none"></div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 lg:py-24 w-full">
          <div className="max-w-2xl space-y-6 text-left">
            
            {/* Small Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
              <span className="uppercase tracking-wider">Smart Government Opportunities Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Connecting Citizens to <br />
              <span className="text-white">Opportunities.</span> <br />
              <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-saffron-400 bg-clip-text text-transparent">
                Empowering Futures.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
              Discover government schemes, scholarships, internships, and services personalized for you. SevaSetu matches your profile against thousands of verified central and state opportunities in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-lg shadow-brand-600/30 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/opportunities"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Schemes</span>
                <Search className="w-4 h-4 text-slate-300" />
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* Hero Category Navigation (Large Elevated Card Overlapping Bottom of Hero) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            <Link 
              to="/opportunities" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-500 dark:hover:border-brand-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                Government Schemes
              </span>
            </Link>

            <Link 
              to="/opportunities" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Scholarships
              </span>
            </Link>

            <Link 
              to="/opportunities" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-amber-500 dark:hover:border-amber-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                Internships & Jobs
              </span>
            </Link>

            <Link 
              to="/documents" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Documents
              </span>
            </Link>

            <Link 
              to="/applications" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-rose-500 dark:hover:border-rose-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Applications
              </span>
            </Link>

            <Link 
              to="/grievances" 
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-saffron-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-saffron-500 dark:hover:border-saffron-500 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-saffron-600 dark:group-hover:text-saffron-400">
                Grievances
              </span>
            </Link>

          </div>

        </div>
      </div>

      {/* Clean Statistics Strip */}
      <section className="py-12 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">500+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Schemes & Grants</p>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">28</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">States Covered</p>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">3L+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Happy Citizens</p>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">24/7</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Digital Assistance</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Explore Government Opportunities & Services Section */}
      <section id="services" className="py-16 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                EXPLORE BY CATEGORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Explore Government Opportunities & Services
              </h2>
            </div>

            <Link
              to="/opportunities"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-navy-900 dark:bg-slate-800 hover:bg-navy-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Scholarships */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1">
              <div className="h-44 relative bg-gradient-to-br from-indigo-900 to-brand-900 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${heroMonument})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Scholarships
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Find scholarships for students across India based on your academic eligibility and income parameters.
                  </p>
                </div>
                <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline pt-2">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Government Schemes */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 group rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1">
              <div className="h-44 relative bg-gradient-to-br from-brand-900 to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${heroMonument})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    Government Schemes
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Discover central and state government schemes that match your personal profile and demographics.
                  </p>
                </div>
                <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:underline pt-2">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Internships & Jobs */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 group rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1">
              <div className="h-44 relative bg-gradient-to-br from-amber-900 to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${heroMonument})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Internships & Jobs
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Find verified internships, fellowships, and skill training opportunities for your career growth.
                  </p>
                </div>
                <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:underline pt-2">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 4: Citizen Services */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 group rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1">
              <div className="h-44 relative bg-gradient-to-br from-emerald-900 to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${heroMonument})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Citizen Services
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Access important public services, document verification vaults, and grievances in one place.
                  </p>
                </div>
                <Link to="/documents" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline pt-2">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose SevaSetu Section */}
      <section className="py-16 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              WHY CHOOSE SEVASETU?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              A Smarter Way to Discover Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Feature 1 */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Personalized Matching</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We match opportunities based on your exact profile, course, income, and demographics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Transparent Eligibility</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Know where you stand before you apply and view near-eligible conditions met.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Document Readiness</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Get a clear list of required documents and stay updated on renewal dates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Application Tracking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track your applications with unique IDs and stay updated at every review stage.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs hover:border-saffron-500 dark:hover:border-saffron-500 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">AI-Powered Assistance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Get instant answers and smart recommendations from our 24/7 AI Assistant.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 rounded-4xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
            
            <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-saffron-400">
                <Building2 className="w-4 h-4 text-saffron-400" />
                <span>Your Journey. Our Responsibility.</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                Join SevaSetu today and unlock a world of government opportunities.
              </h2>
              <p className="text-xs sm:text-sm text-brand-200 leading-relaxed">
                Seamless digital public infrastructure designed specifically for every citizen of India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full lg:w-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-extrabold text-xs text-brand-900 bg-white hover:bg-slate-100 shadow-lg transition-all text-center hover:scale-105"
              >
                Get Started Now →
              </Link>
              <Link
                to="/opportunities"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-center"
              >
                Explore Services
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-center gap-2 p-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>Secure & Trusted</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 border-l border-slate-200 dark:border-slate-800">
              <Globe className="w-4 h-4 text-brand-500" />
              <span>Accessible Anywhere</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 border-l border-slate-200 dark:border-slate-800">
              <Users className="w-4 h-4 text-saffron-500" />
              <span>Multilingual Support</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 border-l border-slate-200 dark:border-slate-800">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Citizen First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-brand-600 text-white font-black flex items-center justify-center text-xs">S</div>
                <span className="font-black text-white text-lg">SevaSetu</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                A Bridge to Government Services. Empowering citizens through direct access to verified public opportunities.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Quick Navigation</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link to="/opportunities" className="hover:text-white">Services & Schemes</Link></li>
                <li><Link to="/documents" className="hover:text-white">Documents Vault</Link></li>
                <li><Link to="/applications" className="hover:text-white">Applications Tracker</Link></li>
                <li><Link to="/grievances" className="hover:text-white">Grievance Portal</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Support & Help</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link to="/reminders" className="hover:text-white">Help & Support</Link></li>
                <li><a href="#" className="hover:text-white">Accessibility Statement</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Contact Info</h4>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li>Toll Free: <strong className="text-white">1800 123 4567</strong></li>
                <li>Email: <strong className="text-white">support@sevasetu.gov.in</strong></li>
                <li>Location: <strong className="text-white">New Delhi, India</strong></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500">
            © 2026 SevaSetu Platform. Smart India Hackathon Edition. Grounded in Official Public Government Data.
          </div>

        </div>
      </footer>

      {/* Floating AI Assistant Drawer */}
      <ChatbotDrawer />

    </div>
  );
};

export default Landing;
