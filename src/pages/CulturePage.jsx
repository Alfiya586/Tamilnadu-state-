import React, { useState, useMemo } from 'react';
import {
  BookOpen, Sparkles, Music, Flame, Coffee, Landmark,
  Quote, Heart, ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cultureData, thirukkuralOfTheDay } from '../data/cultureData';

const CULTURE_CATEGORIES = [
  "All",
  "Language & Literature",
  "Art & Dance",
  "Festivals",
  "Traditional Food",
  "Heritage Architecture"
];

export default function CulturePage() {
  const { language } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filteredItems = useMemo(() => {
    return cultureData.filter(item => {
      return selectedCat === 'All' || item.category === selectedCat;
    });
  }, [selectedCat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
          Classical Heritage & Living Legacy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          Tamil Nadu Culture & Heritage
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Celebrating over 3,000 years of unbroken Tamil civilization, Sangam poetry, Bharatanatyam mudras, Chola granites, and aromatic culinary mastery.
        </p>
      </div>

      {/* Thirukkural Daily Feature Card */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">
            <Quote className="w-4 h-4" />
            <span>Thirukkural of the Day • குறள் {thirukkuralOfTheDay.kuralNo}</span>
          </div>
          <div className="text-lg sm:text-2xl font-serif font-bold text-white leading-relaxed mt-2">
            "{thirukkuralOfTheDay.tamilLine1}"<br />
            "{thirukkuralOfTheDay.tamilLine2}"
          </div>
          <p className="text-xs sm:text-sm text-amber-100 italic mt-3">
            "{thirukkuralOfTheDay.englishMeaning}"
          </p>
          <div className="mt-3 text-xs text-amber-200">
            Section: <strong>{thirukkuralOfTheDay.chapter}</strong> (அதிகாரம்: {thirukkuralOfTheDay.chapterTa})
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto">
          <div className="text-3xl font-extrabold font-serif">1330</div>
          <div className="text-xs text-amber-100 uppercase tracking-wider mt-1">Couplets of Wisdom</div>
          <div className="text-[11px] text-white/70 mt-1">By Sage Thiruvalluvar</div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
        {CULTURE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedCat === cat
                ? "bg-amber-600 text-white shadow-xs font-bold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Culture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs text-amber-700 dark:text-amber-400 font-bold mb-1">
                  {item.period}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Significance & Key Elements:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-500">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Tradition: <strong>{item.category.split('&')[0].trim()}</strong></span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Pride of Tamil Nadu</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
