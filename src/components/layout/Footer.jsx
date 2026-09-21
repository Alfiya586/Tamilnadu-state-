import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, ArrowUp, ExternalLink, Globe, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { language, t } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
                TN
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TAMIL NADU ONE
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              Tamil Nadu's unified digital platform connecting 38 districts, e-governance welfare services, student scholarships, tourism corridors, industrial job listings, and 24/7 civic grievance resolution.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Emergency Helplines</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Ambulance: <strong className="text-white">108</strong> • Police: <strong className="text-white">100/112</strong> • Fire: <strong className="text-white">101</strong> • Women SOS: <strong className="text-white">181</strong>
              </p>
            </div>

            <div className="mt-4 text-[11px] text-emerald-400 font-medium">
              Built as a digital platform concept for Tamil Nadu.
            </div>
          </div>

          {/* Col: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.services}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-white transition-colors">e-Sevai Portal</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Patta & Chitta Land Records</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Smart Ration Card</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Birth & Community Certs</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">TNSTC Bus Booking</Link></li>
              <li><Link to="/report-problem" className="text-amber-400 hover:text-amber-300 font-medium">Report Civic Problem</Link></li>
            </ul>
          </div>

          {/* Col: Explore & Districts */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore & Culture
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/districts" className="hover:text-white transition-colors">38 Districts Explorer</Link></li>
              <li><Link to="/tourism" className="hover:text-white transition-colors">Tourism & Hill Stations</Link></li>
              <li><Link to="/tourism?category=Temples" className="hover:text-white transition-colors">Chola Temple Architecture</Link></li>
              <li><Link to="/culture" className="hover:text-white transition-colors">Tamil Classical Literature</Link></li>
              <li><Link to="/culture" className="hover:text-white transition-colors">Bharatanatyam & Arts</Link></li>
              <li><Link to="/culture" className="hover:text-white transition-colors">Festivals & Traditional Food</Link></li>
            </ul>
          </div>

          {/* Col: Education & Youth */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Education & Jobs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/students?tab=Scholarships" className="hover:text-white transition-colors">Naan Mudhalvan Scheme</Link></li>
              <li><Link to="/students?tab=Scholarships" className="hover:text-white transition-colors">Puthumai Penn Financial Aid</Link></li>
              <li><Link to="/students?tab=Colleges" className="hover:text-white transition-colors">NIRF Top TN Colleges</Link></li>
              <li><Link to="/students?tab=Government+Exams" className="hover:text-white transition-colors">TNPSC Group 1/2/4</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Private Tech & EV Jobs</Link></li>
              <li><Link to="/jobs?tab=Business" className="hover:text-white transition-colors">MSME & NEEDS Subsidies</Link></li>
            </ul>
          </div>

          {/* Col: Emergency & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Governance & Safety
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency Network</Link></li>
              <li><Link to="/news-alerts" className="hover:text-white transition-colors">Public Weather Alerts</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Civic Analytics Dashboard</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Citizen Profile</Link></li>
              <li><span className="text-slate-500">Privacy Policy</span></li>
              <li><span className="text-slate-500">Terms of Governance</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TAMIL NADU ONE. All rights reserved. Designed for digital excellence.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded">
              Demonstration Platform Prototype
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
