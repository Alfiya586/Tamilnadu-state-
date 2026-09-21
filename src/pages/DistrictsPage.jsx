import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin, Users, Building, Landmark, Stethoscope, GraduationCap,
  Briefcase, Compass, Search, Filter, Info, ChevronRight, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { districtsData } from '../data/districtsData';
import TamilNaduMap from '../components/districts/TamilNaduMap';
import DistrictCard from '../components/cards/DistrictCard';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';

const ZONES = ["All Zones", "Northern", "Western (Kongu Nadu)", "Central (Cauvery Delta)", "Southern", "Western Ghats", "Cape Comorin"];

export default function DistrictsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');

  // Selected district state
  const initialDistrictId = searchParams.get('id') || 'chennai';
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    return districtsData.find(d => d.id === initialDistrictId) || districtsData[0];
  });

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId) {
      const match = districtsData.find(d => d.id === queryId);
      if (match) setSelectedDistrict(match);
    }
  }, [searchParams]);

  const filteredDistricts = useMemo(() => {
    return districtsData.filter(d => {
      const matchesZone = selectedZone === 'All Zones' || d.zone.includes(selectedZone.split(' ')[0]);
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        d.name.toLowerCase().includes(term) ||
        (d.nameTa && d.nameTa.includes(term)) ||
        d.majorAttractions.some(a => a.toLowerCase().includes(term));
      return matchesZone && matchesSearch;
    });
  }, [searchTerm, selectedZone]);

  const handleSelectDistrict = (dist) => {
    setSelectedDistrict(dist);
    setSearchParams({ id: dist.id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full border border-blue-500/20">
          Geographic & Demographic Intelligence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          {t.districtExplorerTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Explore infrastructure, key tourist destinations, major healthcare facilities, top universities, and industrial sectors for each Tamil Nadu district.
        </p>

        {/* Demo data badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs px-3 py-1 rounded-md border border-amber-300/40">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>{t.demoDataNotice}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search districts, temples, or towns..."
          />
        </div>

        <div className="w-full md:flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {ZONES.map(z => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedZone === z
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Selected District Detailed Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <TamilNaduMap
            districts={districtsData}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={handleSelectDistrict}
          />

          {/* District list preview cards */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              All Districts Directory ({filteredDistricts.length})
            </h3>
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredDistricts.map(dist => (
                <div
                  key={dist.id}
                  onClick={() => handleSelectDistrict(dist)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    selectedDistrict?.id === dist.id
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-300 dark:border-emerald-700"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-sm">{dist.name}</span>
                    <span className="text-xs text-slate-400">({dist.nameTa})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deep District Information Panel */}
        <div className="lg:col-span-7">
          {selectedDistrict ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
                      {selectedDistrict.zone} Zone
                    </span>
                    <span className="text-xs text-slate-500">
                      Headquarters: <strong>{selectedDistrict.hq}</strong>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                    {selectedDistrict.name}{" "}
                    <span className="text-xl font-normal text-slate-500 dark:text-slate-400">
                      ({selectedDistrict.nameTa})
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <div className="text-slate-400">Population (est.)</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {selectedDistrict.population}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <div className="text-slate-400">Total Area</div>
                    <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {selectedDistrict.area}
                    </div>
                  </div>
                </div>
              </div>

              {/* District summary */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedDistrict.description}
              </p>

              {/* Data Category Cards Grid */}
              <div className="space-y-6">
                {/* 1. Major Attractions & Tourist Places */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>Major Attractions & Tourist Destinations</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistrict.majorAttractions.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Hospitals & Healthcare Infrastructure */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-rose-500" />
                    <span>Key Hospitals & Trauma Centres</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedDistrict.hospitals.map((hosp, idx) => (
                      <li
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        {hosp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Premier Colleges & Universities */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-500" />
                    <span>Colleges & Educational Institutions</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedDistrict.colleges.map((col, idx) => (
                      <li
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        {col}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Jobs & Thriving Businesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>Key Employment Sectors</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {selectedDistrict.jobs.map((j, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                          <span>{j}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Building className="w-4 h-4" />
                      <span>Major Industrial Enterprises</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {selectedDistrict.businesses.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. Key Government Services & Collectorate */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>Principal Administrative Offices</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedDistrict.govtOffices.map((off, idx) => (
                      <span
                        key={idx}
                        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {off}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No district selected"
              description="Click any district on the map or list to view its complete profile."
            />
          )}
        </div>
      </div>
    </div>
  );
}
