import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Bot, Sparkles, MapPin, ShieldAlert,
  GraduationCap, Briefcase, HeartHandshake, AlertCircle, Compass,
  ChevronRight, CheckCircle2, Building2, TrendingUp, Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { quickServices } from '../data/servicesData';
import { tourismData } from '../data/tourismData';
import { districtsData } from '../data/districtsData';
import { newsData } from '../data/newsData';
import { cultureData } from '../data/cultureData';
import ServiceCard from '../components/cards/ServiceCard';
import TourismCard from '../components/cards/TourismCard';
import Button from '../components/common/Button';

export default function HomePage() {
  const { t, language, setIsSearchOpen, openAIChatWithPrompt } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const exampleSearches = [
    "Find scholarships",
    "Tourist places near Madurai",
    "Government services",
    "Jobs near me",
    "Hospitals near me"
  ];

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setIsSearchOpen(true);
    }
  };

  const handleExampleClick = (query) => {
    setHeroSearch(query);
    openAIChatWithPrompt(query);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-emerald-950/80">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Official badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border border-emerald-600/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.brandSubtitle}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
            Everything Tamil Nadu,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
              In One Place.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Large Search Box */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearchSubmit}
              className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl shadow-black/40 border border-slate-200 dark:border-slate-700"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                id="hero-main-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full px-3 py-3 text-slate-900 dark:text-white placeholder-slate-400 bg-transparent text-sm sm:text-base focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Example Searches */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Popular:</span>
              {exampleSearches.map((term, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleExampleClick(term)}
                  className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 transition-colors text-[11px] sm:text-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link to="/services">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                Explore Services
              </Button>
            </Link>
            <Link to="/districts">
              <Button size="lg" variant="secondary" icon={MapPin}>
                Explore Tamil Nadu
              </Button>
            </Link>
            <Button
              size="lg"
              variant="accent"
              icon={Bot}
              onClick={() => openAIChatWithPrompt("What can Tamil Nadu ONE do for me?")}
            >
              Ask Tamil Nadu AI
            </Button>
          </div>

          {/* Key Quick Metrics */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">38</div>
              <div className="text-xs text-slate-400 mt-0.5">Districts Mapped</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">200+</div>
              <div className="text-xs text-slate-400 mt-0.5">Digital e-Services</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">₹1,000/mo</div>
              <div className="text-xs text-slate-400 mt-0.5">Youth Scholarships</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-xs text-slate-400 mt-0.5">Grievance Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEWS & ALERTS TICKER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              <span>Public Alert</span>
            </span>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium line-clamp-1 flex-1">
            {newsData[0].title}
          </div>
          <Link
            to="/news-alerts"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 shrink-0 flex items-center gap-1"
          >
            <span>View All Alerts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. QUICK CITIZEN SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Direct Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.quickServicesTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {t.quickServicesSubtitle}
            </p>
          </div>
          <Link to="/services">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All 200+ Services
            </Button>
          </Link>
        </div>

        {/* Grid of 8 Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={() => navigate('/services')}
            />
          ))}
        </div>
      </section>

      {/* 4. CITIZEN PROBLEM REPORTING FEATURE HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/30">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Direct Citizen Grievance Redressal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Report Civic Problems in Your Ward
            </h2>
            <p className="mt-3 text-white/90 text-sm sm:text-base leading-relaxed">
              Found a pothole, overflow of garbage, broken streetlight, or drinking water leakage? Snap a photo and submit. Get a <strong>Tracking ID</strong> to monitor real-time repair progress.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/report-problem">
                <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 font-bold shadow-lg">
                  Report a Problem Now
                </Button>
              </Link>
              <Link to="/report-problem?tab=track">
                <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white/10">
                  Track Existing Report
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full lg:max-w-sm space-y-3 text-xs">
            <div className="font-bold text-sm text-amber-100 uppercase tracking-wide">
              Recent civic resolutions
            </div>
            <div className="p-3 bg-white/15 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">Anna Salai Pothole Patching</div>
                <div className="text-white/70 text-[11px]">Chennai • TN-REP-78291</div>
              </div>
              <span className="bg-emerald-400 text-slate-900 font-bold px-2 py-0.5 rounded text-[10px]">
                In Progress
              </span>
            </div>
            <div className="p-3 bg-white/15 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">Gandhipuram Streetlights</div>
                <div className="text-white/70 text-[11px]">Coimbatore • TN-REP-64910</div>
              </div>
              <span className="bg-white text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                Resolved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DISTRICT EXPLORER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              State Geography & Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.districtExplorerTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {t.districtExplorerSubtitle}
            </p>
          </div>
          <Link to="/districts">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Open Interactive Map Explorer
            </Button>
          </Link>
        </div>

        {/* Selected 3 District Cards Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {districtsData.slice(0, 3).map((dist) => (
            <div
              key={dist.id}
              onClick={() => navigate(`/districts?id=${dist.id}`)}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  <span>{dist.zone} Zone</span>
                  <span className="text-slate-400">Pop: {dist.population}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {dist.name} ({dist.nameTa})
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {dist.description}
                </p>

                <div className="mt-4 space-y-1 text-xs">
                  <div className="text-slate-500 font-medium">Key Attractions:</div>
                  <div className="flex flex-wrap gap-1">
                    {dist.majorAttractions.slice(0, 2).map((att, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px]">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>View District Hub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TOURISM HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Explore Destinations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.tourismTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {t.tourismSubtitle}
            </p>
          </div>
          <Link to="/tourism">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Tourism Categories
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourismData.slice(0, 3).map((place) => (
            <TourismCard
              key={place.id}
              place={place}
              onExplore={() => navigate('/tourism')}
            />
          ))}
        </div>
      </section>

      {/* 7. CULTURE & HERITAGE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Living Traditions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {t.cultureTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {t.cultureSubtitle}
              </p>
            </div>
            <Link to="/culture">
              <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                Explore Culture & Arts
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cultureData.slice(0, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => navigate('/culture')}
                className="bg-slate-800/80 hover:bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/80 transition-all cursor-pointer group flex flex-col"
              >
                <div className="aspect-16/9 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {c.category}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>Read Chronicle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EMERGENCY IMMEDIATE ACCESS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/20">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                24/7 Citizen Emergency Hub
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Medical, Police, Fire, or Disaster Crisis?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Quickly dial <strong>108</strong> (Ambulance), <strong>100</strong> (Police), <strong>101</strong> (Fire), or <strong>1070</strong> (Disaster Support).
              </p>
            </div>
          </div>
          <Link to="/emergency">
            <Button size="lg" variant="danger" icon={ShieldAlert}>
              Open Emergency Network
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
