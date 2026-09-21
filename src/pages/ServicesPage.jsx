import React, { useState, useMemo } from 'react';
import {
  Building2, Search, Filter, ExternalLink, CheckCircle2,
  Clock, FileText, ArrowRight, ShieldCheck, Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allDetailedServices } from '../data/servicesData';
import ServiceCard from '../components/cards/ServiceCard';
import SearchBar from '../components/common/SearchBar';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const CATEGORIES = [
  "All",
  "Governance",
  "Certificates",
  "Education",
  "Health",
  "Employment",
  "Transport",
  "Agriculture",
  "Safety",
  "Utilities",
  "Housing",
  "Registration"
];

export default function ServicesPage() {
  const { t, language, savedServices, toggleSaveService } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);

  const filteredServices = useMemo(() => {
    return allDetailedServices.filter(s => {
      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        s.title.toLowerCase().includes(term) ||
        (s.titleTa && s.titleTa.includes(term)) ||
        s.description.toLowerCase().includes(term) ||
        (s.popularItems && s.popularItems.some(item => item.toLowerCase().includes(term)));
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
          Citizen e-Governance Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          {t.quickServicesTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Apply online for certificates, land records, welfare pensions, driving licenses, and public utilities across Tamil Nadu.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search certificates, patta, ration card..."
          />
        </div>

        {/* Categories Bar */}
        <div className="w-full md:flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="No services match your search"
          description={`We couldn't find any service matching "${searchTerm}". Try browsing another category or resetting filters.`}
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={(s) => setActiveModalService(s)}
            />
          ))}
        </div>
      )}

      {/* Service Details Modal */}
      <Modal
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        title={activeModalService ? (language === 'ta' && activeModalService.titleTa ? activeModalService.titleTa : activeModalService.title) : ""}
        subtitle={activeModalService?.category ? `Category: ${activeModalService.category}` : ""}
      >
        {activeModalService && (
          <div className="space-y-6 text-sm">
            {/* Description */}
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'ta' && activeModalService.descriptionTa ? activeModalService.descriptionTa : activeModalService.description}
            </p>

            {/* Quick specifications */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Processing SLA</div>
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeModalService.processingTime || "2 to 5 days"}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Application Fee</div>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  ₹0 to ₹60 (Statutory e-Sevai fee)
                </div>
              </div>
            </div>

            {/* Popular Sub-services */}
            {activeModalService.popularItems && (
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Available Applications & Certificates</span>
                </h5>
                <ul className="space-y-2">
                  {activeModalService.popularItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Documents Checklist */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
              <h5 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Mandatory Documents Required</span>
              </h5>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                1. Aadhaar Card / Virtual ID<br />
                2. Smart Family Ration Card Copy<br />
                3. Passport Size Photograph (under 50KB)<br />
                4. Self-declaration affidavit (auto-generated)
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Bookmark}
                onClick={() => {
                  toggleSaveService(activeModalService.id);
                  setActiveModalService(null);
                }}
              >
                {savedServices.includes(activeModalService.id) ? "Bookmarked in Profile" : "Bookmark Service"}
              </Button>
              <a
                href={activeModalService.officialPortal || "https://www.tnesevai.tn.gov.in"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <span>Proceed to e-Sevai Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
