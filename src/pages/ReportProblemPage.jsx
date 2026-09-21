import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle, CheckCircle2, Clock, MapPin, Camera,
  FileText, Search, ShieldCheck, ArrowRight, RefreshCw, Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { districtsData } from '../data/districtsData';
import Button from '../components/common/Button';

const PROBLEM_CATEGORIES = [
  "Road damage / potholes",
  "Garbage issue",
  "Streetlight problem",
  "Water supply",
  "Electricity issue",
  "Public transport issue",
  "Drainage / Sewage overflow",
  "Other"
];

export default function ReportProblemPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { citizenReports, addCitizenReport } = useApp();

  const tabParam = searchParams.get('tab') === 'track' ? 'track' : 'report';
  const [activeTab, setActiveTab] = useState(tabParam);

  // Form states
  const [category, setCategory] = useState(PROBLEM_CATEGORIES[0]);
  const [district, setDistrict] = useState(districtsData[0].name);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [contact, setContact] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [justSubmittedReport, setJustSubmittedReport] = useState(null);

  // Tracking query state
  const [trackingQuery, setTrackingQuery] = useState('');
  const [searchedReport, setSearchedReport] = useState(null);
  const [trackError, setTrackError] = useState('');

  useEffect(() => {
    if (searchParams.get('tab') === 'track') {
      setActiveTab('track');
    }
  }, [searchParams]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim() || !contact.trim()) {
      alert("Please fill in location, description, and contact number.");
      return;
    }

    const newReport = addCitizenReport({
      category,
      district,
      location,
      description,
      citizenName: citizenName || 'Anonymous Citizen',
      contact
    });

    setJustSubmittedReport(newReport);
    // Reset inputs
    setLocation('');
    setDescription('');
    setCitizenName('');
    setContact('');
    setPhotoPreview(null);
  };

  const handleSearchTracking = (e) => {
    e.preventDefault();
    setTrackError('');
    setSearchedReport(null);

    const query = trackingQuery.trim().toUpperCase();
    if (!query) return;

    const found = citizenReports.find(r => r.id.toUpperCase() === query);
    if (found) {
      setSearchedReport(found);
    } else {
      setTrackError(`No complaint found with Tracking ID: "${query}". Please verify and try again.`);
    }
  };

  // Metrics for demo dashboard
  const pendingCount = citizenReports.filter(r => r.status === 'Pending').length;
  const inProgressCount = citizenReports.filter(r => r.status === 'In Progress').length;
  const resolvedCount = citizenReports.filter(r => r.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
          Citizen Civic Redressal Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          Report a Problem in Your Ward
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Empowering citizens across all 38 districts to notify municipal corporations and village panchayats directly. Every complaint generates an authentic Tracking ID.
        </p>

        {/* Tab Toggle */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              setActiveTab('report');
              setSearchParams({});
            }}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'report'
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            File New Complaint
          </button>
          <button
            onClick={() => {
              setActiveTab('track');
              setSearchParams({ tab: 'track' });
            }}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'track'
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Track Status & Dashboard
          </button>
        </div>
      </div>

      {/* SUCCESS BANNER WHEN SUBMITTED */}
      {justSubmittedReport && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 text-emerald-900 dark:text-emerald-100 shadow-lg animate-fadeIn flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Grievance Registered Successfully!</h3>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1">
                Your Tracking ID is <strong className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-emerald-700 dark:text-emerald-300">{justSubmittedReport.id}</strong>.
                An alert has been dispatched to the municipal ward engineering cell.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setActiveTab('track');
              setTrackingQuery(justSubmittedReport.id);
              setSearchedReport(justSubmittedReport);
              setJustSubmittedReport(null);
            }}
          >
            Track Complaint Now
          </Button>
        </div>
      )}

      {/* VIEW 1: FILE NEW REPORT */}
      {activeTab === 'report' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Problem Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PROBLEM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {districtsData.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.nameTa})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Specific Street Address / Landmark *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Near Bus Stand, 4th Cross Street, Gandhipuram"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Description of the Issue *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the severity, how long it has been broken, and hazards it creates..."
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Photo Upload Placeholder */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Photo Upload (Optional evidence)
              </label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-amber-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="problem-photo-upload"
                />
                <label htmlFor="problem-photo-upload" className="cursor-pointer flex flex-col items-center">
                  <Camera className="w-8 h-8 text-amber-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Click to browse or take a photo
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    PNG, JPG or WEBP up to 5MB
                  </span>
                </label>
                {photoPreview && (
                  <div className="mt-4 max-w-xs mx-auto">
                    <img src={photoPreview} alt="Preview" className="rounded-xl shadow-md max-h-48 object-cover mx-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* Citizen Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g., K. Selvaraj"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Mobile Number (for SMS updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5">
                Submit Civic Grievance
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: TRACK STATUS & DEMO DASHBOARD */}
      {activeTab === 'track' && (
        <div className="space-y-10">
          {/* Tracking Search Form */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center">
              Enter Complaint Tracking ID
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6">
              Sample IDs you can test: <strong className="text-amber-600">TN-REP-78291</strong>, <strong className="text-amber-600">TN-REP-64910</strong>, or any report you submit.
            </p>

            <form onSubmit={handleSearchTracking} className="flex gap-2">
              <input
                type="text"
                value={trackingQuery}
                onChange={(e) => setTrackingQuery(e.target.value)}
                placeholder="e.g. TN-REP-78291"
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none"
              />
              <Button type="submit" variant="primary" icon={Search}>
                Track
              </Button>
            </form>

            {trackError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                {trackError}
              </div>
            )}

            {/* Search Result Card */}
            {searchedReport && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-800 dark:text-slate-200">
                    {searchedReport.id}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    searchedReport.status === 'Resolved'
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : searchedReport.status === 'In Progress'
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                  }`}>
                    {searchedReport.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {searchedReport.category}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {searchedReport.location}, {searchedReport.district}
                  </p>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  {searchedReport.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Reported on: {searchedReport.date}</span>
                  <span>Contact: {searchedReport.contact}</span>
                </div>
              </div>
            )}
          </div>

          {/* DEMO DASHBOARD: PENDING, IN PROGRESS, RESOLVED */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Statewide Civic Redressal Feed
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time demo breakdown of active reports across municipalities
                </p>
              </div>

              {/* Status summary pills */}
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg font-bold">
                  {pendingCount} Pending
                </span>
                <span className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-lg font-bold">
                  {inProgressCount} In Progress
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg font-bold">
                  {resolvedCount} Resolved
                </span>
              </div>
            </div>

            {/* List of Reports */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pending Column */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending Assignment ({pendingCount})</span>
                </div>
                {citizenReports.filter(r => r.status === 'Pending').map(r => (
                  <div key={r.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{r.id}</span>
                      <span className="text-slate-400 text-[10px]">{r.date}</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">{r.category}</div>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{r.description}</p>
                    <div className="text-[11px] text-slate-500">{r.location}, {r.district}</div>
                  </div>
                ))}
              </div>

              {/* In Progress Column */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Work In Progress ({inProgressCount})</span>
                </div>
                {citizenReports.filter(r => r.status === 'In Progress').map(r => (
                  <div key={r.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{r.id}</span>
                      <span className="text-slate-400 text-[10px]">{r.date}</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">{r.category}</div>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{r.description}</p>
                    <div className="text-[11px] text-slate-500">{r.location}, {r.district}</div>
                  </div>
                ))}
              </div>

              {/* Resolved Column */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolved ({resolvedCount})</span>
                </div>
                {citizenReports.filter(r => r.status === 'Resolved').map(r => (
                  <div key={r.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{r.id}</span>
                      <span className="text-slate-400 text-[10px]">{r.date}</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">{r.category}</div>
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{r.description}</p>
                    <div className="text-[11px] text-slate-500">{r.location}, {r.district}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
