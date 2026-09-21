import React, { useState, useMemo } from 'react';
import { Search, X, Building2, MapPin, Compass, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { allDetailedServices } from '../../data/servicesData';
import { districtsData } from '../../data/districtsData';
import { tourismData } from '../../data/tourismData';
import { jobsData } from '../../data/jobsBusinessData';
import { scholarshipsData, collegesData } from '../../data/studentsData';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return { services: [], districts: [], tourism: [], jobs: [], education: [] };

    const services = allDetailedServices.filter(s =>
      s.title.toLowerCase().includes(term) ||
      (s.titleTa && s.titleTa.includes(term)) ||
      s.description.toLowerCase().includes(term)
    );

    const districts = districtsData.filter(d =>
      d.name.toLowerCase().includes(term) ||
      (d.nameTa && d.nameTa.includes(term)) ||
      d.description.toLowerCase().includes(term) ||
      d.majorAttractions.some(a => a.toLowerCase().includes(term))
    );

    const tourism = tourismData.filter(t =>
      t.name.toLowerCase().includes(term) ||
      t.location.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.category.toLowerCase().includes(term)
    );

    const jobs = jobsData.filter(j =>
      j.title.toLowerCase().includes(term) ||
      j.company.toLowerCase().includes(term) ||
      j.location.toLowerCase().includes(term) ||
      j.skills.some(sk => sk.toLowerCase().includes(term))
    );

    const education = [
      ...scholarshipsData.filter(s =>
        s.title.toLowerCase().includes(term) || s.benefit.toLowerCase().includes(term)
      ),
      ...collegesData.filter(c =>
        c.name.toLowerCase().includes(term) || c.location.toLowerCase().includes(term)
      )
    ];

    return { services, districts, tourism, jobs, education };
  }, [searchTerm]);

  const totalResultsCount =
    results.services.length +
    results.districts.length +
    results.tourism.length +
    results.jobs.length +
    results.education.length;

  const handleSelect = (url) => {
    setIsSearchOpen(false);
    navigate(url);
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 absolute left-5" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across Services, Districts, Tourism, Jobs, Education..."
            autoFocus
            className="w-full pl-9 pr-10 py-1.5 text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 overflow-x-auto text-xs">
          {["All", "Services", "Districts", "Tourism", "Jobs", "Education"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
          {searchTerm && (
            <span className="ml-auto text-[11px] text-slate-400 font-medium shrink-0">
              {totalResultsCount} results found
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!searchTerm.trim() ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Universal Search Across Tamil Nadu
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Search for scholarships, hospitals in Madurai, government certificates, Ooty tourism, or jobs near you.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Scholarships", "Patta Chitta", "Marina Beach", "Madurai", "Zoho Jobs", "Emergency 108"].map(example => (
                  <button
                    key={example}
                    onClick={() => setSearchTerm(example)}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching records found for "{searchTerm}". Try a different keyword.
            </div>
          ) : (
            <>
              {/* Services Section */}
              {(activeCategory === 'All' || activeCategory === 'Services') && results.services.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Government Services ({results.services.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.services.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('/services')}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Districts Section */}
              {(activeCategory === 'All' || activeCategory === 'Districts') && results.districts.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Districts ({results.districts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.districts.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(`/districts?id=${item.id}`)}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {item.name} District ({item.nameTa})
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</div>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {item.zone} Zone
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tourism Section */}
              {(activeCategory === 'All' || activeCategory === 'Tourism') && results.tourism.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Tourism & Heritage ({results.tourism.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.tourism.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('/tourism')}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{item.location} • {item.category}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs Section */}
              {(activeCategory === 'All' || activeCategory === 'Jobs') && results.jobs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Job Openings ({results.jobs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.jobs.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect('/jobs')}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{item.company} • {item.location}</div>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                          {item.salary}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {(activeCategory === 'All' || activeCategory === 'Education') && results.education.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student Hub & Education ({results.education.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.education.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        onClick={() => handleSelect('/students')}
                        className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                            {item.title || item.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {item.category || item.type} • {item.benefit || item.ranking || item.location}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
