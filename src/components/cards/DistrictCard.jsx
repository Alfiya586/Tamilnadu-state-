import React from 'react';
import { MapPin, Users, Building, Landmark, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DistrictCard({ district, isSelected, onSelect }) {
  const { language } = useApp();

  return (
    <div
      onClick={() => onSelect(district)}
      className={`group relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
          : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/60 shadow-xs hover:shadow-lg"
      }`}
    >
      <div>
        {/* Zone Badge & HQ */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
            {district.zone} Zone
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            HQ: {district.hq}
          </span>
        </div>

        {/* District Name */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
          <span>{language === 'ta' && district.nameTa ? district.nameTa : district.name}</span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            {language === 'ta' ? district.name : district.nameTa}
          </span>
        </h3>

        {/* Population & Area */}
        <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{district.population}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{district.area}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
          {district.description}
        </p>

        {/* Top 2 attractions */}
        <div className="mt-3 flex flex-wrap gap-1">
          {district.majorAttractions.slice(0, 2).map((att, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
            >
              {att}
            </span>
          ))}
        </div>
      </div>

      {/* Select footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
        <span className={isSelected ? "text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-500"}>
          {isSelected ? "Currently Selected" : "Click to view full data"}
        </span>
        <div className="flex items-center gap-1 text-emerald-600 group-hover:translate-x-1 transition-transform">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
