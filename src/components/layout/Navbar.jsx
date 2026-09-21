import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Menu, X, Search, Bot, Globe, Sun, Moon, User,
  ShieldAlert, AlertCircle, LayoutDashboard, LogOut, ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    t,
    user,
    logout,
    setIsSearchOpen,
    setIsAIChatOpen
  } = useApp();
  const navigate = useNavigate();

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.services, path: "/services" },
    { name: t.districts, path: "/districts" },
    { name: t.tourism, path: "/tourism" },
    { name: t.students, path: "/students" },
    { name: t.jobs, path: "/jobs" },
    { name: t.culture, path: "/culture" },
    { name: t.emergency, path: "/emergency", highlight: true }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-800 text-white text-[11px] px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-emerald-600 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded">Official Concept</span>
          <span className="truncate">Government of Tamil Nadu • Unified Digital State Portal</span>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-xs">
          <Link to="/report-problem" className="hover:underline flex items-center gap-1 text-amber-300 font-semibold">
            <AlertCircle className="w-3 h-3" />
            <span>Report Civic Problem</span>
          </Link>
          <span className="hidden sm:inline text-emerald-400">|</span>
          <Link to="/news-alerts" className="hidden sm:inline hover:underline text-emerald-100">
            Public Alerts
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {/* Stylized TN Emblem Stamp Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-sm tracking-tighter">TN</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                TAMIL NADU ONE
              </span>
              <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                {language === 'ta' ? "தமிழ்நாடு அரசு மின் தளம்" : "Digital State Platform"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    link.highlight
                      ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold"
                      : isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Search Trigger */}
            <button
              id="nav-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              title="Global Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </span>
            </button>

            {/* Language Toggle */}
            <button
              id="nav-language-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Switch Language / மொழி மாற்றம்"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? "தமிழ்" : "English"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="nav-theme-btn"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              id="nav-ai-btn"
              onClick={() => setIsAIChatOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 transition-colors"
              title="Open Tamil Nadu AI"
            >
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>AI Assistant</span>
            </button>

            {/* User Auth or Dashboard */}
            {user ? (
              <div className="relative">
                <button
                  id="nav-user-dropdown-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-sm animate-scaleUp"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>{t.dashboard}</span>
                    </Link>
                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                      <span>{t.admin} Dashboard</span>
                    </Link>
                    <Link
                      to="/report-problem"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span>Track Complaints</span>
                    </Link>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>{t.login}</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 animate-fadeIn"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  link.highlight
                    ? "text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30 font-bold"
                    : isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/report-problem"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-sm font-semibold"
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Report a Problem (Road, Water, Garbage)</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span>Admin Analytics Dashboard</span>
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAIChatOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-xs"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Tamil Nadu AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
