import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import AIChat from '../components/common/AIChat';

export default function MainLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Comprehensive Official Concept Footer */}
      <Footer />

      {/* Global Interactive Modals and Floating Assistants */}
      <GlobalSearchModal />
      <AIChat />
    </div>
  );
}
