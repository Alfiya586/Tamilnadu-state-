import React, { useState } from 'react';
import {
  ShieldAlert, PhoneCall, HeartPulse, Search, MapPin,
  Droplet, AlertTriangle, LifeBuoy, Users, Building, ExternalLink
} from 'lucide-react';
import { emergencyNumbers, bloodBanksData, hospitalNetworks } from '../data/emergencyData';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';

export default function EmergencyPage() {
  const [districtFilter, setDistrictFilter] = useState('All');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('All');
  const [searchHospital, setSearchHospital] = useState('');

  const filteredHospitals = hospitalNetworks.filter(h => {
    const matchesDist = districtFilter === 'All' || h.district === districtFilter;
    const term = searchHospital.toLowerCase();
    const matchesSearch = !term || h.name.toLowerCase().includes(term) || h.specialty.toLowerCase().includes(term);
    return matchesDist && matchesSearch;
  });

  const filteredBloodBanks = bloodBanksData.filter(b => {
    const matchesDist = districtFilter === 'All' || b.district === districtFilter;
    const matchesBlood = bloodGroupFilter === 'All' || b.availableGroups.includes(bloodGroupFilter);
    return matchesDist && matchesBlood;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* High visual priority top emergency banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-red-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white text-red-600 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <span>Statewide 24/7 Rapid Response</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tamil Nadu Emergency Network
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl leading-relaxed">
              If life, health, safety, or disaster is at stake, call directly immediately. Free toll-free lines operate without cellular balance across all mobile networks.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-red-50 font-black px-6 py-3.5 rounded-2xl text-base shadow-lg transition-transform hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call 108 Ambulance</span>
          </a>
          <a
            href="tel:100"
            className="flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-black px-6 py-3.5 rounded-2xl text-base shadow-lg transition-transform hover:scale-105"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>Call 100 Police</span>
          </a>
        </div>
      </div>

      {/* Grid of Essential Emergency Helplines */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Direct Public Helplines & Toll-Free Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tap on any helpline card on mobile to dial instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {emergencyNumbers.map(item => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 border transition-all duration-200 shadow-xs hover:shadow-lg flex flex-col justify-between ${
                item.priority === 'Critical'
                  ? "bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60"
                  : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    item.priority === 'Critical'
                      ? "bg-rose-600 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}>
                    {item.priority}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{item.type}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                  {item.number}
                </span>
                <a
                  href={`tel:${item.number.split('/')[0].trim()}`}
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Dial</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Finder Placeholder Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <span>Nearest Hospital & Trauma Network Finder</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Locate government multi-super specialty institutions and casualty departments across districts.
            </p>
          </div>

          {/* District filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Tamil Nadu</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Tiruchirappalli">Tiruchirappalli</option>
              <option value="Salem">Salem</option>
              <option value="Kanyakumari">Kanyakumari</option>
            </select>
          </div>
        </div>

        {/* Hospital listings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredHospitals.map(hosp => (
            <div key={hosp.id} className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                    {hosp.district}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {hosp.name}
                  </h4>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>Specialty: <strong>{hosp.specialty}</strong></div>
                <div>Casualty Beds: <strong>{hosp.beds}</strong></div>
                <div className="text-slate-500">{hosp.address}</div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={`tel:${hosp.phone}`}
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{hosp.phone}</span>
                </a>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  24/7 ER Open
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Bank Availability Lookup Placeholder */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-red-500 fill-current" />
              <span>State Blood Bank Directory & Stock Lookup</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verify blood unit availability and connect with authorized transfusion officers.
            </p>
          </div>

          {/* Blood group filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Blood Group:</span>
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Groups</option>
              <option value="O+">O Positive (O+)</option>
              <option value="O-">O Negative (O-)</option>
              <option value="A+">A Positive (A+)</option>
              <option value="B+">B Positive (B+)</option>
              <option value="AB+">AB Positive (AB+)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredBloodBanks.map(bank => (
            <div key={bank.id} className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded">
                  {bank.district}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {bank.name}
                </h4>
              </div>

              <div>
                <div className="text-[11px] font-medium text-slate-500 mb-1">Available Units:</div>
                <div className="flex flex-wrap gap-1">
                  {bank.availableGroups.map(grp => (
                    <span key={grp} className="text-xs font-bold bg-white dark:bg-slate-800 text-red-600 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">
                      {grp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={`tel:${bank.phone}`}
                  className="font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{bank.phone}</span>
                </a>
                <span className="text-[11px] text-slate-400">Stock: {bank.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
