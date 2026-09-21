import React from 'react';
import { MapPin, Calendar, Star, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TourismCard({ place, onExplore }) {
  const { savedPlaces, toggleSavePlace, language } = useApp();
  const isSaved = savedPlaces.includes(place.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      {/* Image Banner */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold tracking-wide bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
            {place.category}
          </span>
        </div>

        {/* Favorite/Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSavePlace(place.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isSaved
              ? "bg-rose-500 text-white"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
          aria-label="Save Place"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
        </button>

        {/* Rating badge */}
        {place.rating && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md text-amber-400 px-2 py-0.5 rounded-md text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{place.rating}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1">{place.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {language === 'ta' && place.nameTa ? place.nameTa : place.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {place.description}
          </p>

          {/* Best time to visit */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Best Season: <strong className="text-slate-700 dark:text-slate-200">{place.bestTimeToVisit}</strong></span>
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex gap-1 overflow-hidden">
            {place.tags && place.tags.slice(0, 2).map((t, idx) => (
              <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                #{t}
              </span>
            ))}
          </div>
          <button
            onClick={() => onExplore && onExplore(place)}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors group-hover:translate-x-0.5"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
