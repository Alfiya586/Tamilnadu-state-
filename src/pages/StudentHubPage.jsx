import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GraduationCap, Award, BookOpen, Briefcase, FileCheck2,
  Cpu, Library, Search, ExternalLink, Bookmark, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  studentSections,
  scholarshipsData,
  collegesData,
  examsData,
  internshipsSkillsData
} from '../data/studentsData';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

export default function StudentHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t, savedScholarships, toggleSaveScholarship } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const tabParam = searchParams.get('tab') || 'All';
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && studentSections.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'All' ? {} : { tab });
  };

  // Filtered lists
  const filteredScholarships = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return scholarshipsData.filter(s =>
      (!term || s.title.toLowerCase().includes(term) || s.benefit.toLowerCase().includes(term) || s.eligibility.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const filteredColleges = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return collegesData.filter(c =>
      (!term || c.name.toLowerCase().includes(term) || c.location.toLowerCase().includes(term) || c.courses.some(cr => cr.toLowerCase().includes(term)))
    );
  }, [searchTerm]);

  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return examsData.filter(e =>
      (!term || e.title.toLowerCase().includes(term) || e.qualification.toLowerCase().includes(term) || e.syllabusFocus.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const filteredInternshipsSkills = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return internshipsSkillsData.filter(i =>
      (!term || i.title.toLowerCase().includes(term) || i.role.toLowerCase().includes(term) || i.host.toLowerCase().includes(term)) &&
      (activeTab === 'All' || i.category === activeTab)
    );
  }, [searchTerm, activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-full border border-teal-500/20">
          Youth & Higher Education Ecosystem
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
          {t.studentHubTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Scholarships like Naan Mudhalvan and Puthumai Penn, premier university counseling, TNPSC government exams syllabus, and emerging tech internships.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search scholarships, exams, colleges..."
          />
        </div>

        {/* Tab Navigation */}
        <div className="w-full md:flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {studentSections.map(sec => (
            <button
              key={sec}
              onClick={() => handleTabChange(sec)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                activeTab === sec
                  ? "bg-teal-600 text-white shadow-xs font-bold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Content */}
      <div className="space-y-12">
        {/* 1. SCHOLARSHIPS SECTION */}
        {(activeTab === 'All' || activeTab === 'Scholarships') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>State Scholarships & Financial Grants</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredScholarships.length} schemes available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredScholarships.map(sch => {
                const isSaved = savedScholarships.includes(sch.id);
                return (
                  <div
                    key={sch.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded">
                          {sch.provider}
                        </span>
                        <button
                          onClick={() => toggleSaveScholarship(sch.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved ? "text-teal-600 bg-teal-50 dark:bg-teal-950/40" : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        {sch.title}
                      </h3>

                      <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                        <p><strong className="text-slate-700 dark:text-slate-200">Benefit:</strong> {sch.benefit}</p>
                        <p><strong className="text-slate-700 dark:text-slate-200">Eligibility:</strong> {sch.eligibility}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {sch.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Deadline: {sch.deadline}</span>
                      <a
                        href={sch.officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. COLLEGES SECTION */}
        {(activeTab === 'All' || activeTab === 'Colleges' || activeTab === 'Courses') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                <span>Premier Colleges & Universities in Tamil Nadu</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredColleges.length} institutions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredColleges.map(col => (
                <div
                  key={col.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-600">{col.location}</span>
                      <span>{col.ranking}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {col.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      {col.type}
                    </p>

                    <div className="mb-4">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Offered Courses:</div>
                      <div className="flex flex-wrap gap-1">
                        {col.courses.map((course, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">{col.intakeVia}</span>
                    <a
                      href={col.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. GOVERNMENT EXAMS SECTION */}
        {(activeTab === 'All' || activeTab === 'Government Exams') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <span>TNPSC & State Competitive Recruitment Exams</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredExams.length} active exam tracks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredExams.map(ex => (
                <div
                  key={ex.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    {ex.conductor}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                    {ex.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl mb-4">
                    <div><strong>Min. Qualification:</strong> {ex.qualification}</div>
                    <div><strong>Age Requirement:</strong> {ex.ageLimit}</div>
                    <div><strong>Selection Stages:</strong> {ex.stages}</div>
                    <div><strong>Syllabus Core:</strong> {ex.syllabusFocus}</div>
                  </div>

                  <a
                    href={ex.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    <span>Official Notification & Syllabus PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. INTERNSHIPS, SKILLS & CAREER RESOURCES */}
        {(activeTab === 'All' || activeTab === 'Internships' || activeTab === 'Skill Development' || activeTab === 'Career Resources') && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span>Internships & Innovation Fellowships</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredInternshipsSkills.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span>{item.duration}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {item.title}
                    </h3>
                    <div className="text-xs text-slate-500 mb-3">Host: {item.host}</div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {item.role}
                    </p>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs text-slate-700 dark:text-slate-300 mb-4">
                      <div><strong>Stipend / Value:</strong> {item.stipend}</div>
                      <div className="mt-1"><strong>Eligibility:</strong> {item.eligibility}</div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => alert(`Redirecting to registration portal for ${item.title}`)}
                  >
                    Apply for Internship
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
