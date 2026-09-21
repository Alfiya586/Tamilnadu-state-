import React, { useState, useMemo } from 'react';
import {
  Bell, CloudRain, AlertTriangle, Award, Briefcase, FileCheck2,
  Calendar, ArrowRight, ExternalLink, Filter
} from 'lucide-react';
import { newsData, newsCategories } from '../data/newsData';
import SearchBar from '../components/common/SearchBar';

export default function NewsAlertsPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCat = selectedCat === 'All' || item.category === selectedCat;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term);
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/20">
          Information & Public Relations Department
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          State News, Weather & Public Announcements
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Verified press releases from the Secretariat, India Meteorological Department (IMD) coastal bulletins, and official gazette notifications.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search news, weather, gazette..."
          />
        </div>

        <div className="w-full md:flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {newsCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? "bg-rose-600 text-white shadow-xs font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Feeds List */}
      <div className="space-y-4">
        {filteredNews.map(item => (
          <div
            key={item.id}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all duration-200 shadow-xs hover:shadow-md ${
              item.isAlert
                ? "border-l-4 border-l-rose-500 border-slate-200/80 dark:border-slate-800"
                : "border-slate-200/80 dark:border-slate-800"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  item.category === 'Weather Alerts'
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : item.category === 'Government Schemes'
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                }`}>
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {item.department}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-rose-600 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {item.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Source: Information & PR Secretariat, Chennai</span>
              <button
                onClick={() => alert(`Opening press bulletin: ${item.title}`)}
                className="inline-flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400"
              >
                <span>Read Full Circular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
