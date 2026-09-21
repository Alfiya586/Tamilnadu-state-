import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase, Building2, MapPin, Search, Filter,
  ArrowUpRight, Award, Factory, TrendingUp, CheckCircle, ExternalLink, Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  jobsData,
  businessSupportData,
  industrialZonesData,
  jobCategories,
  jobLocations
} from '../data/jobsBusinessData';
import JobCard from '../components/cards/JobCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';

export default function JobsBusinessPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, language } = useApp();

  const tabParam = searchParams.get('tab') === 'Business' ? 'Business' : 'Jobs';
  const [activeMainTab, setActiveMainTab] = useState(tabParam);

  const [jobSearch, setJobSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [activeJobModal, setActiveJobModal] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (searchParams.get('tab') === 'Business') {
      setActiveMainTab('Business');
    }
  }, [searchParams]);

  const handleTabToggle = (tab) => {
    setActiveMainTab(tab);
    setSearchParams(tab === 'Business' ? { tab: 'Business' } : {});
  };

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesLoc = selectedLocation === 'All' || job.location.includes(selectedLocation);
      const term = jobSearch.toLowerCase().trim();
      const matchesSearch = !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.skills.some(s => s.toLowerCase().includes(term));
      return matchesCat && matchesLoc && matchesSearch;
    });
  }, [jobSearch, selectedCategory, selectedLocation]);

  const handleApply = (job) => {
    setActiveJobModal(job);
  };

  const confirmApplication = () => {
    if (activeJobModal) {
      setAppliedJobs(prev => [...prev, activeJobModal.id]);
      alert(`Application submitted successfully for ${activeJobModal.title} at ${activeJobModal.company}!`);
      setActiveJobModal(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-500/20">
          State Commerce & Careers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          {t.jobsTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Find top career opportunities in EV, Software, SaaS, Hardware, and Automotive corridors, or launch and fund your MSME in Tamil Nadu.
        </p>

        {/* Main Tab Toggle: Jobs vs Business */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => handleTabToggle('Jobs')}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === 'Jobs'
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Careers & Job Openings
          </button>
          <button
            onClick={() => handleTabToggle('Business')}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === 'Business'
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Business & MSME Support
          </button>
        </div>
      </div>

      {/* VIEW 1: CAREERS & JOBS */}
      {activeMainTab === 'Jobs' && (
        <div className="space-y-8">
          {/* Filter and Search Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-80">
                <SearchBar
                  value={jobSearch}
                  onChange={setJobSearch}
                  placeholder="Search role, skills, or company..."
                />
              </div>

              {/* Location filter */}
              <div className="w-full md:w-auto flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Location:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl focus:outline-none"
                >
                  {jobLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {jobCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Listing Grid */}
          {filteredJobs.length === 0 ? (
            <EmptyState
              title="No jobs found"
              description="No open vacancies match your criteria. Try adjusting the category or location filter."
              actionLabel="Reset Search"
              onAction={() => {
                setJobSearch('');
                setSelectedCategory('All');
                setSelectedLocation('All');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: BUSINESS & MSME SUPPORT */}
      {activeMainTab === 'Business' && (
        <div className="space-y-12">
          {/* Top Entrepreneur Guidance Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl border border-indigo-950/80 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/30">
                Single Window Clearance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Start a Business in Tamil Nadu
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Tamil Nadu ranks #1 in India for manufacturing output and #2 in overall GDP. Obtain all industrial licenses, electricity power sanctions, pollution board clearances, and land allocations in under 30 days via <strong>TN BizBuddy</strong>.
              </p>
            </div>
            <a
              href="https://easybusiness.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg shrink-0"
            >
              <span>Access TN Single Window 2.0</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Subsidies & Government Schemes */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <span>Government Subsidies & Entrepreneur Grants</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Direct capital subsidies, subsidized loan interests, and state grant packages for first-generation founders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessSupportData.map(scheme => (
                <div
                  key={scheme.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                        {scheme.portal}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {scheme.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {scheme.description}
                    </p>

                    <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl mb-4">
                      <div><strong className="text-slate-700 dark:text-slate-200">Subsidy / Financial Aid:</strong> {scheme.subsidy}</div>
                      <div><strong className="text-slate-700 dark:text-slate-200">Who is Eligible:</strong> {scheme.eligibility}</div>
                    </div>
                  </div>

                  <a
                    href={scheme.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    <span>Scheme Guidelines & Application Form</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Industrial Corridors & SIPCOT / SIDCO Parks */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Factory className="w-6 h-6 text-emerald-600" />
                <span>Specialized Industrial Hubs & SIPCOT Corridors</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                World-class industrial parks equipped with dedicated substations, water pipelines, and transport rail linkages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {industrialZonesData.map(zone => (
                <div
                  key={zone.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      {zone.location}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                      Sector: {zone.focus}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Anchor firms: <strong className="text-slate-700 dark:text-slate-300">{zone.keyCompanies}</strong>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                    SLA: Allotment in 15 days
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      <Modal
        isOpen={!!activeJobModal}
        onClose={() => setActiveJobModal(null)}
        title={activeJobModal ? `Apply for ${activeJobModal.title}` : ""}
        subtitle={activeJobModal ? `${activeJobModal.company} • ${activeJobModal.location}` : ""}
      >
        {activeJobModal && (
          <div className="space-y-4 text-sm">
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Review your details before forwarding your profile to {activeJobModal.company}.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 text-xs">
              <div><strong>Salary:</strong> {activeJobModal.salary}</div>
              <div><strong>Experience required:</strong> {activeJobModal.experience}</div>
              <div><strong>Category:</strong> {activeJobModal.category}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Contact Number
              </label>
              <input
                type="text"
                defaultValue="+91 98765 43210"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Upload Resume / Profile (PDF)
              </label>
              <input
                type="file"
                className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setActiveJobModal(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={confirmApplication}>
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
