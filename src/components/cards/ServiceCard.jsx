import React from 'react';
import {
  Building2, GraduationCap, HeartPulse, Briefcase, Bus, Sprout, FileCheck, ShieldAlert,
  Droplets, Zap, Home, FileText, ArrowRight, Bookmark, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ICON_MAP = {
  Building2,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Bus,
  Sprout,
  FileCheck,
  ShieldAlert,
  Droplets,
  Zap,
  Home,
  FileText
};

export default function ServiceCard({ service, onSelect }) {
  const { savedServices, toggleSaveService, language } = useApp();
  const IconComponent = ICON_MAP[service.icon] || Building2;
  const isSaved = savedServices.includes(service.id);

  return (
    <div
      onClick={() => onSelect && onSelect(service)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar with Icon & Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveService(service.id);
            }}
            title={isSaved ? "Saved to your dashboard" : "Bookmark service"}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            aria-label="Bookmark service"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {language === 'ta' && service.titleTa ? service.titleTa : service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {language === 'ta' && service.descriptionTa ? service.descriptionTa : service.description}
        </p>

        {/* Popular quick tags if present */}
        {service.popularItems && service.popularItems.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {service.popularItems.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom link with arrow and hover animation */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <span>{service.processingTime || "Instant Digital Access"}</span>
        <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Access</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
