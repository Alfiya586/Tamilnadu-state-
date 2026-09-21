import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import DistrictsPage from './pages/DistrictsPage';
import TourismPage from './pages/TourismPage';
import StudentHubPage from './pages/StudentHubPage';
import JobsBusinessPage from './pages/JobsBusinessPage';
import ReportProblemPage from './pages/ReportProblemPage';
import EmergencyPage from './pages/EmergencyPage';
import CulturePage from './pages/CulturePage';
import NewsAlertsPage from './pages/NewsAlertsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="districts" element={<DistrictsPage />} />
            <Route path="tourism" element={<TourismPage />} />
            <Route path="students" element={<StudentHubPage />} />
            <Route path="jobs" element={<JobsBusinessPage />} />
            <Route path="report-problem" element={<ReportProblemPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="culture" element={<CulturePage />} />
            <Route path="news-alerts" element={<NewsAlertsPage />} />
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
