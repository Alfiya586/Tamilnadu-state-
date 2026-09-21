import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Bookmark, Heart, Briefcase, AlertCircle, Award,
  MapPin, CheckCircle2, Trash2, ArrowRight, ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { allDetailedServices } from '../data/servicesData';
import { tourismData } from '../data/tourismData';
import { jobsData } from '../data/jobsBusinessData';
import { scholarshipsData } from '../data/studentsData';
import Button from '../components/common/Button';

export default function UserDashboardPage() {
  const {
    user,
    savedServices,
    toggleSaveService,
    savedPlaces,
    toggleSavePlace,
    savedJobs,
    toggleSaveJob,
    savedScholarships,
    toggleSaveScholarship,
    citizenReports,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState('services');

  // Hydrate saved entities
  const bookmarkedServices = allDetailedServices.filter(s => savedServices.includes(s.id));
  const bookmarkedPlaces = tourismData.filter(p => savedPlaces.includes(p.id));
  const bookmarkedJobs = jobsData.filter(j => savedJobs.includes(j.id));
  const bookmarkedScholarships = scholarshipsData.filter(s => savedScholarships.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {user?.name ? user.name.charAt(0) : "C"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {user?.name || "Citizen of Tamil Nadu"}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Verified Citizen
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {user?.email || "citizen@tn.gov.in"} • District: <strong>Chennai</strong> • Smart Card: <strong>TN-RATION-98214</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/report-problem">
            <Button size="sm" variant="outline" icon={AlertCircle}>
              Report Civic Issue
            </Button>
          </Link>
          <Link to="/services">
            <Button size="sm" variant="primary" icon={Bookmark}>
              Browse Services
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'services'
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Services ({bookmarkedServices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'complaints'
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Tracked Complaints ({citizenReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tourism')}
          className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'tourism'
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Places ({bookmarkedPlaces.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'jobs'
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Saved Jobs ({bookmarkedJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scholarships')}
          className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'scholarships'
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Scholarships ({bookmarkedScholarships.length})</span>
        </button>
      </div>

      {/* Tab 1: Saved Services */}
      {activeTab === 'services' && (
        <div>
          {bookmarkedServices.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <Bookmark className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No saved services</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Bookmark certificates, schemes, and e-governance services to access them rapidly here.
              </p>
              <div className="mt-4">
                <Link to="/services">
                  <Button size="sm" variant="primary">Browse Services</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookmarkedServices.map(s => (
                <div key={s.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {s.category}
                      </span>
                      <button
                        onClick={() => toggleSaveService(s.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{s.processingTime}</span>
                    <a
                      href={s.officialPortal}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Tracked Complaints */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          {citizenReports.map(rep => (
            <div
              key={rep.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded">
                    {rep.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    rep.status === 'Resolved'
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : rep.status === 'In Progress'
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                  }`}>
                    {rep.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {rep.category}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {rep.description}
                </p>
                <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-3">
                  <span>Location: {rep.location}, {rep.district}</span>
                  <span>Date: {rep.date}</span>
                </div>
              </div>

              <Link to={`/report-problem?tab=track`}>
                <Button size="sm" variant="outline" icon={ArrowRight} iconPosition="right">
                  Detailed Status
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Saved Places */}
      {activeTab === 'tourism' && (
        <div>
          {bookmarkedPlaces.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <Heart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No saved places</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore hill stations, temple architecture, and beaches and save them for your next itinerary.
              </p>
              <div className="mt-4">
                <Link to="/tourism">
                  <Button size="sm" variant="primary">Explore Tourism</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookmarkedPlaces.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div className="relative aspect-16/9">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleSavePlace(p.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-rose-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-emerald-600 font-medium">{p.location}</div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Saved Jobs */}
      {activeTab === 'jobs' && (
        <div>
          {bookmarkedJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No saved jobs</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Save vacancies across tech, automotive, and semiconductor clusters to review later.
              </p>
              <div className="mt-4">
                <Link to="/jobs">
                  <Button size="sm" variant="primary">Find Jobs</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bookmarkedJobs.map(j => (
                <div key={j.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                        {j.company}
                      </span>
                      <button onClick={() => toggleSaveJob(j.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-2">{j.title}</h4>
                    <div className="text-xs text-slate-500 mt-1">{j.location} • {j.salary}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Link to="/jobs">
                      <Button size="sm" variant="outline">View Listing</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Saved Scholarships */}
      {activeTab === 'scholarships' && (
        <div>
          {bookmarkedScholarships.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">No saved scholarships</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Bookmark higher education schemes to monitor application deadlines.
              </p>
              <div className="mt-4">
                <Link to="/students">
                  <Button size="sm" variant="primary">Browse Scholarships</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bookmarkedScholarships.map(sc => (
                <div key={sc.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                        {sc.provider}
                      </span>
                      <button onClick={() => toggleSaveScholarship(sc.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-2">{sc.title}</h4>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Benefit: {sc.benefit}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Deadline: {sc.deadline}</span>
                    <a href={sc.officialLink} target="_blank" rel="noreferrer" className="text-teal-600 font-bold hover:underline">
                      Portal
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
