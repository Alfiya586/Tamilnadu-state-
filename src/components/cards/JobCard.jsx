import React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, Bookmark, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function JobCard({ job, onApply }) {
  const { savedJobs, toggleSaveJob } = useApp();
  const isSaved = savedJobs.includes(job.id);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header: Company & Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-0.5 rounded-md">
              {job.category}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 hover:text-emerald-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{job.company}</p>
          </div>
          <button
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Saved to dashboard" : "Save job"}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Quick details */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.type} • {job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <IndianRupee className="w-3.5 h-3.5 shrink-0" />
            <span>{job.salary}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{job.posted}</span>
        </div>
        <button
          onClick={() => onApply && onApply(job)}
          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors text-xs shadow-xs"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
