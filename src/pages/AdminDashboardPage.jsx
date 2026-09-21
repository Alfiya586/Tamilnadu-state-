import React, { useState } from 'react';
import {
  LayoutDashboard, CheckCircle2, Clock, AlertTriangle, Users,
  BarChart3, PieChart as PieIcon, TrendingUp, Download, RefreshCw
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';

const PIE_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4'];

export default function AdminDashboardPage() {
  const { citizenReports, updateReportStatus } = useApp();
  const [selectedFilterStatus, setSelectedFilterStatus] = useState('All');

  // Compute metrics from actual citizenReports state
  const totalReports = citizenReports.length;
  const pendingCount = citizenReports.filter(r => r.status === 'Pending').length;
  const inProgressCount = citizenReports.filter(r => r.status === 'In Progress').length;
  const resolvedCount = citizenReports.filter(r => r.status === 'Resolved').length;
  const resolutionRate = totalReports ? Math.round((resolvedCount / totalReports) * 100) : 0;

  // Aggregate Category Breakdown for Bar Chart
  const categoryCounts = citizenReports.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat.split('/')[0].trim(),
    count
  }));

  // Aggregate District-wise Breakdown for Chart
  const districtCounts = citizenReports.reduce((acc, curr) => {
    acc[curr.district] = (acc[curr.district] || 0) + 1;
    return acc;
  }, {});

  const districtChartData = Object.entries(districtCounts).map(([dist, count]) => ({
    district: dist,
    count
  }));

  // Status breakdown for Pie Chart
  const statusChartData = [
    { name: 'Resolved', value: resolvedCount, color: '#10b981' },
    { name: 'In Progress', value: inProgressCount, color: '#f59e0b' },
    { name: 'Pending', value: pendingCount, color: '#3b82f6' }
  ];

  const filteredReports = citizenReports.filter(r => {
    return selectedFilterStatus === 'All' || r.status === selectedFilterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded">
              Command & Control Center
            </span>
            <span className="text-xs text-slate-400 font-medium">Internal Demo View</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            State Civic Governance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry and resolution audits across Tamil Nadu municipal administration wards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Download}
            onClick={() => alert("Downloading State Civic Telemetry Report (CSV/PDF)...")}
          >
            Export Audit CSV
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Grievances</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">{totalReports}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Statewide active wards</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Resolved Cases</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-3">{resolvedCount}</div>
          <div className="text-xs text-slate-500 mt-1">{resolutionRate}% resolution SLA achieved</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">In Progress</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-3">{inProgressCount}</div>
          <div className="text-xs text-slate-500 mt-1">Field engineers dispatched</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-blue-600 mt-3">{pendingCount}</div>
          <div className="text-xs text-slate-500 mt-1">Awaiting nodal officer dispatch</div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart 1: Category Breakdown Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>Top Problem Categories</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Complaints by civil department</p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Resolution Status Donut Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <PieIcon className="w-5 h-5 text-emerald-600" />
              <span>Grievance Status Ratio</span>
            </h3>
            <p className="text-xs text-slate-400">Current progress lifecycle</p>
          </div>

          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* District-wise problem count chart */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          District-wise Grievance Volume
        </h3>
        <p className="text-xs text-slate-400 mb-6">Aggregate complaint distribution across registered districts</p>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtChartData}>
              <XAxis dataKey="district" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Civic Action Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Grievance Administration Management
            </h3>
            <p className="text-xs text-slate-400">Update officer status or close civic tickets</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter Status:</span>
            <select
              value={selectedFilterStatus}
              onChange={(e) => setSelectedFilterStatus(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">ID</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Citizen Contact</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3 rounded-r-xl text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredReports.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{r.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.district}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[180px] truncate">{r.location}</td>
                  <td className="px-4 py-3 text-slate-500">{r.contact}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      r.status === 'Resolved'
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : r.status === 'In Progress'
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1.5">
                      {r.status !== 'In Progress' && r.status !== 'Resolved' && (
                        <button
                          onClick={() => updateReportStatus(r.id, 'In Progress')}
                          className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-1 rounded hover:bg-amber-100 transition-colors"
                        >
                          Dispatch
                        </button>
                      )}
                      {r.status !== 'Resolved' && (
                        <button
                          onClick={() => updateReportStatus(r.id, 'Resolved')}
                          className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded hover:bg-emerald-100 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
