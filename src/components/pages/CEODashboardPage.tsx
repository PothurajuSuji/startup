import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { store } from '../../services/store';
import { 
  Student, 
  School, 
  Program, 
  Certificate, 
  CEODashboardStats, 
  StudentStatus, 
  SchoolStatus, 
  TrainingMode 
} from '../../types';
import { CertificateView } from '../CertificateView';
import { 
  Users, 
  Building2, 
  Award, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Check, 
  X, 
  RefreshCw, 
  BarChart3, 
  Calendar, 
  ShieldCheck, 
  Edit3, 
  FileText,
  Printer,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

interface CEODashboardPageProps {
  stats: CEODashboardStats;
  students: Student[];
  schools: School[];
  programs: Program[];
  certificates: Certificate[];
  onNavigate: (page: PageId) => void;
  onLogoutAdmin: () => void;
}

export const CEODashboardPage: React.FC<CEODashboardPageProps> = ({
  stats,
  students,
  schools,
  programs,
  certificates,
  onNavigate,
  onLogoutAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'schools' | 'certificates' | 'programs'>('overview');

  // Student Management states
  const [studentSearch, setStudentSearch] = useState('');
  const [studentSchoolFilter, setStudentSchoolFilter] = useState('All');
  const [studentClassFilter, setStudentClassFilter] = useState('All');
  const [studentCityFilter, setStudentCityFilter] = useState('All');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);
  const [evaluatingStudent, setEvaluatingStudent] = useState<Student | null>(null);
  const [evalScore, setEvalScore] = useState<number>(90);
  const [evalFeedback, setEvalFeedback] = useState<string>('');

  // School Management states
  const [schoolSearch, setSchoolSearch] = useState('');
  const [selectedSchoolForModal, setSelectedSchoolForModal] = useState<School | null>(null);

  // Certificate Modal & Generation
  const [selectedCertForPreview, setSelectedCertForPreview] = useState<Certificate | null>(null);
  const [generatingForStudentId, setGeneratingForStudentId] = useState<string>('');

  // Program Management states
  const [isCreatingProgram, setIsCreatingProgram] = useState(false);
  const [newProgName, setNewProgName] = useState('14-Day Student Development Program - Winter Cohort');
  const [newProgDuration, setNewProgDuration] = useState(14);
  const [newProgAudience, setNewProgAudience] = useState('School Students (Grades 6 to 10)');
  const [newProgMethod, setNewProgMethod] = useState('Practical, Activity-Based Learning');
  const [newProgCapacity, setNewProgCapacity] = useState(120);
  const [newProgMode, setNewProgMode] = useState<TrainingMode>('Offline');
  const [newProgDesc, setNewProgDesc] = useState('Interactive winter holiday life skills bootcamp.');

  // Notification Banner
  const [notificationMsg, setNotificationMsg] = useState('');

  const triggerToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  // Student filters logic
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.id.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesSchool = studentSchoolFilter === 'All' || s.schoolName === studentSchoolFilter;
    const matchesClass = studentClassFilter === 'All' || s.grade === studentClassFilter;
    const matchesCity = studentCityFilter === 'All' || s.city.toLowerCase() === studentCityFilter.toLowerCase();
    const matchesStatus = studentStatusFilter === 'All' || s.status === studentStatusFilter;
    return matchesSearch && matchesSchool && matchesClass && matchesCity && matchesStatus;
  });

  // Unique lists for dropdowns
  const uniqueSchools = Array.from(new Set(students.map(s => s.schoolName)));
  const uniqueClasses = Array.from(new Set(students.map(s => s.grade)));
  const uniqueCities = Array.from(new Set(students.map(s => s.city)));

  // School filters logic
  const filteredSchools = schools.filter(sch => 
    sch.name.toLowerCase().includes(schoolSearch.toLowerCase()) || 
    sch.id.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    sch.city.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  // Handler: Change student status
  const handleUpdateStudentStatus = (studentId: string, newStatus: StudentStatus) => {
    store.updateStudentStatus(studentId, newStatus);
    triggerToast(`Student status updated to "${newStatus}"`);
    if (selectedStudentForModal && selectedStudentForModal.id === studentId) {
      setSelectedStudentForModal({ ...selectedStudentForModal, status: newStatus });
    }
  };

  // Handler: Attendance increment / decrement
  const handleAttendanceChange = (student: Student, delta: number) => {
    const newDays = Math.max(0, Math.min(14, student.attendanceDays + delta));
    let newStatus = student.status;
    if (newDays === 14 && student.status === 'In Progress') {
      newStatus = 'Completed';
    } else if (newDays > 0 && student.status === 'Enrolled') {
      newStatus = 'In Progress';
    }
    store.updateStudentProgress(student.id, { attendanceDays: newDays, status: newStatus });
    triggerToast(`Updated attendance for ${student.name}: ${newDays}/14 days`);
  };

  // Handler: Save Assessment
  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingStudent) return;
    store.updateStudentProgress(evaluatingStudent.id, {
      assessmentScore: evalScore,
      assessmentFeedback: evalFeedback,
      status: 'Completed'
    });
    triggerToast(`Recorded assessment for ${evaluatingStudent.name} (${evalScore}/100)`);
    setEvaluatingStudent(null);
  };

  // Handler: Issue Certificate
  const handleGenerateCertificate = (studentId: string) => {
    const stu = students.find(s => s.id === studentId);
    if (!stu) return;

    if (stu.attendanceDays < 11 && stu.status !== 'Completed' && stu.status !== 'Certified') {
      const confirmForce = window.confirm(
        `${stu.name} has attended ${stu.attendanceDays}/14 days. Minimum recommended is 80% (11+ days). Generate certificate anyway?`
      );
      if (!confirmForce) return;
    }

    const cert = store.issueCertificate(studentId);
    if (cert) {
      triggerToast(`Certificate ${cert.id} successfully generated and issued to ${stu.name}!`);
      setSelectedCertForPreview(cert);
    }
  };

  // Handler: Export CSV of students
  const handleExportStudentsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Student ID,Name,School,Class,Section,Parent Name,Parent Phone,City,State,Status,Attendance Days,Assessment Score,Certificate ID,Registered Date"]
        .concat(
          filteredStudents.map(s => 
            `"${s.id}","${s.name}","${s.schoolName}","${s.grade}","${s.section || ''}","${s.parentName}","${s.parentContact}","${s.city}","${s.state}","${s.status}","${s.attendanceDays}/14","${s.assessmentScore ?? ''}","${s.certificateId ?? ''}","${s.registeredAt}"`
          )
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HYPER_LEARNX_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Exported student records CSV');
  };

  // Handler: Create Program
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    store.addProgram({
      name: newProgName,
      durationDays: Number(newProgDuration),
      targetAudience: newProgAudience,
      teachingMethod: newProgMethod,
      description: newProgDesc,
      capacity: Number(newProgCapacity),
      mode: newProgMode,
      status: 'Upcoming',
      startDate: new Date().toISOString().split('T')[0],
      assignedSchoolIds: []
    });
    setIsCreatingProgram(false);
    triggerToast(`New batch program "${newProgName}" initialized!`);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* CEO Dashboard Top Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg font-display shadow-md">
                CEO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                    CEO Master Management Console
                  </h1>
                  <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  HYPER LEARNX Executive Operations · Real-Time Dynamic Database
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  store.resetToDefaults();
                  triggerToast('Database re-seeded with fresh sample records!');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                title="Reset sample records for testing"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
              >
                View Public Site
              </button>

              <button
                onClick={onLogoutAdmin}
                className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-semibold border border-rose-800 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-6 border-b border-slate-800/80 overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-white font-bold bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview & Visual Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'students'
                  ? 'border-indigo-500 text-white font-bold bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Management ({students.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('schools')}
              className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'schools'
                  ? 'border-indigo-500 text-white font-bold bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>School Management ({schools.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'border-indigo-500 text-white font-bold bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificate Management ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'programs'
                  ? 'border-indigo-500 text-white font-bold bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Program Management ({programs.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & ANALYTICS                                              */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 8 REQUIRED DASHBOARD CARDS (From Prompt Section 4) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Card 1: Total Registered Students */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Students</span>
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {stats.totalRegisteredStudents}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">1. Total Registered Students</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Across all grades & cohorts</div>
              </div>

              {/* Card 2: Total Registered Schools */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Schools</span>
                  <Building2 className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {stats.totalRegisteredSchools}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">2. Total Registered Schools</div>
                <div className="text-[10px] text-slate-400 mt-0.5">CBSE, ICSE, IB & State</div>
              </div>

              {/* Card 3: Total Certified Students */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Graduates</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                  {stats.totalCertifiedStudents}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">3. Total Certified Students</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Official certs generated</div>
              </div>

              {/* Card 4: Students Currently Enrolled */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Active</span>
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
                  {stats.studentsCurrentlyEnrolled}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">4. Students Currently Enrolled</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Enrolled + In Progress</div>
              </div>

              {/* Card 5: Students Awaiting Approval */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Review</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
                  {stats.studentsAwaitingApproval}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">5. Students Awaiting Approval</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pending registration review</div>
              </div>

              {/* Card 6: Students Who Completed Training */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Finished 14D</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono tabular-nums">
                  {stats.studentsWhoCompletedTraining}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">6. Completed Training</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Completed + Certified</div>
              </div>

              {/* Card 7: Students Pending Assessment */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Jury Rubric</span>
                  <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 font-mono tabular-nums">
                  {stats.studentsPendingAssessment}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">7. Pending Assessment</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Completed without score</div>
              </div>

              {/* Card 8: Total Programs Conducted */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-mono font-semibold uppercase">Programs</span>
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {stats.totalProgramsConducted}
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">8. Total Programs Conducted</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Active & completed tracks</div>
              </div>
            </div>

            {/* 5 VISUAL CHARTS REQUIRED BY SECTION 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chart 1 & 2: Student & School Growth Trends */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Student & School Registration Growth
                    </h3>
                    <p className="text-xs text-slate-500">Monthly cumulative intake trends</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-indigo-700">
                      <span className="w-3 h-3 rounded-full bg-indigo-600" />
                      Students
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-3 h-3 rounded-full bg-slate-400" />
                      Schools
                    </span>
                  </div>
                </div>

                {/* SVG Visual Growth Chart */}
                <div className="h-56 w-full pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180">
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Area under student curve */}
                    <path
                      d="M 50 150 Q 150 135 250 110 T 450 60 T 550 30 L 550 160 L 50 160 Z"
                      fill="url(#indigoGrad)"
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Student Growth Line */}
                    <path
                      d="M 50 150 Q 150 135 250 110 T 450 60 T 550 30"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                    />

                    {/* School Growth Line */}
                    <path
                      d="M 50 158 Q 150 152 250 144 T 450 125 T 550 110"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Data Points */}
                    <circle cx="50" cy="150" r="4" fill="#4f46e5" />
                    <circle cx="250" cy="110" r="4" fill="#4f46e5" />
                    <circle cx="450" cy="60" r="4" fill="#4f46e5" />
                    <circle cx="550" cy="30" r="5" fill="#4f46e5" stroke="#fff" strokeWidth="2" />

                    {/* Labels */}
                    <text x="50" y="175" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">Aug</text>
                    <text x="180" y="175" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">Sep</text>
                    <text x="310" y="175" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">Oct</text>
                    <text x="440" y="175" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">Nov (Current)</text>
                    <text x="550" y="175" textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="bold" fontFamily="sans-serif">Target Q4</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Current Enrollment Velocity: <strong>+{Math.round((students.length / 30) * 10)} students / week</strong></span>
                  <span className="text-emerald-600 font-semibold">↑ +140% QoQ School Inbound</span>
                </div>
              </div>

              {/* Chart 3: Certified vs Non-Certified Ratio */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Certified vs. Non-Certified Ratio
                </h3>
                <p className="text-xs text-slate-500">Student graduation pipeline</p>

                {/* Donut / Ratio Visualization */}
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeDasharray={`${(stats.totalCertifiedStudents / Math.max(1, stats.totalRegisteredStudents)) * 100} 100`}
                        strokeDashoffset="0"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-bold font-mono text-slate-900 block tabular-nums">
                        {Math.round((stats.totalCertifiedStudents / Math.max(1, stats.totalRegisteredStudents)) * 100)}%
                      </span>
                      <span className="text-[9px] uppercase font-mono text-slate-400">Certified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Certified Graduates
                    </span>
                    <strong className="font-mono text-slate-900">{stats.totalCertifiedStudents}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      In Training / Completed
                    </span>
                    <strong className="font-mono text-slate-900">{stats.studentsCurrentlyEnrolled + stats.studentsPendingAssessment}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Pending Approval
                    </span>
                    <strong className="font-mono text-slate-900">{stats.studentsAwaitingApproval}</strong>
                  </div>
                </div>
              </div>

              {/* Chart 4: School-wise Student Participation */}
              <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  School-Wise Student Participation
                </h3>
                <p className="text-xs text-slate-500">Registered candidates per institution</p>

                <div className="space-y-3 pt-1">
                  {schools.slice(0, 5).map(sch => {
                    const count = students.filter(s => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()).length;
                    const maxVal = Math.max(1, ...schools.map(s => students.filter(stu => stu.schoolId === s.id).length));
                    const pct = Math.max(15, Math.round((count / maxVal) * 100));

                    return (
                      <div key={sch.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-800 truncate max-w-[240px]">{sch.name}</span>
                          <span className="font-mono font-bold text-indigo-700">{count} Students</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 5: Program-wise Enrollment */}
              <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Program-Wise Enrollment & Capacity Utilization
                </h3>
                <p className="text-xs text-slate-500">Seat absorption across active tracks</p>

                <div className="space-y-3 pt-1">
                  {programs.map(prog => {
                    const pct = Math.round((prog.enrolledCount / prog.capacity) * 100);

                    return (
                      <div key={prog.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 truncate max-w-[220px]">{prog.name}</span>
                          <span className="font-mono text-slate-600">{prog.enrolledCount} / {prog.capacity} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>{prog.durationDays} Days · {prog.mode}</span>
                          <span className="uppercase text-indigo-600 font-semibold">{prog.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RECENT REGISTRATIONS FEED (Required by Section 4) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Recent Registrations Activity Feed
                  </h3>
                  <p className="text-xs text-slate-500">Latest student and school submissions</p>
                </div>
                <button
                  onClick={() => setActiveTab('students')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Manage All Students →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {students.slice(0, 5).map(stu => (
                  <div key={stu.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold font-display shrink-0">
                        {stu.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">{stu.name}</strong>
                          <span className="font-mono text-[10px] text-slate-400">{stu.id}</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">
                          {stu.grade} · {stu.schoolName} ({stu.city})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        stu.status === 'Certified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : stu.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {stu.status}
                      </span>
                      <button
                        onClick={() => setSelectedStudentForModal(stu)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STUDENT MANAGEMENT (Section 5 Requirement)                        */}
        {/* ========================================================================= */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Student Management System
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Approve registrations, track 14-day attendance, record assessment rubrics, and certify candidates
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportStudentsCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Student Records (CSV)</span>
                </button>
                <button
                  onClick={() => onNavigate('student-register')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>

            {/* Filter Bar (Search, School, Class, City, Status) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search name or ID..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <select
                  value={studentSchoolFilter}
                  onChange={(e) => setStudentSchoolFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
                >
                  <option value="All">All Schools ({uniqueSchools.length})</option>
                  {uniqueSchools.map(sch => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={studentClassFilter}
                  onChange={(e) => setStudentClassFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Classes</option>
                  {uniqueClasses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={studentCityFilter}
                  onChange={(e) => setStudentCityFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Cities</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={studentStatusFilter}
                  onChange={(e) => setStudentStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending Approval</option>
                  <option value="Approved">Approved</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed Training</option>
                  <option value="Certified">Certified</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student ID</th>
                    <th className="px-4 py-3 font-semibold">Student & School</th>
                    <th className="px-4 py-3 font-semibold">Grade & City</th>
                    <th className="px-4 py-3 font-semibold">14D Attendance</th>
                    <th className="px-4 py-3 font-semibold">Rubric Score</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">CEO Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.map(stu => {
                    const cert = stu.certificateId ? certificates.find(c => c.id === stu.certificateId) : null;

                    return (
                      <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-500">
                          <button
                            onClick={() => setSelectedStudentForModal(stu)}
                            className="text-indigo-600 hover:underline font-bold cursor-pointer"
                          >
                            {stu.id}
                          </button>
                        </td>

                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{stu.name}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px]" title={stu.schoolName}>
                            {stu.schoolName}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className="text-slate-800">{stu.grade}</span>
                          <span className="text-slate-400 block text-[11px]">{stu.city}</span>
                        </td>

                        {/* Interactive Attendance Stepper */}
                        <td className="px-4 py-3 font-mono">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleAttendanceChange(stu, -1)}
                              disabled={stu.attendanceDays <= 0}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                              title="Decrease day"
                            >
                              -
                            </button>
                            <span className="font-bold text-slate-900 w-12 text-center">
                              {stu.attendanceDays}/14
                            </span>
                            <button
                              onClick={() => handleAttendanceChange(stu, 1)}
                              disabled={stu.attendanceDays >= 14}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                              title="Increase day"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Assessment Score Column */}
                        <td className="px-4 py-3 font-mono">
                          {stu.assessmentScore !== undefined ? (
                            <span className="text-emerald-700 font-bold">{stu.assessmentScore}%</span>
                          ) : (
                            <button
                              onClick={() => {
                                setEvaluatingStudent(stu);
                                setEvalScore(92);
                                setEvalFeedback('Demonstrated active collaboration, confident voice projection, and great leadership.');
                              }}
                              className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold cursor-pointer underline"
                            >
                              + Grade Rubric
                            </button>
                          )}
                        </td>

                        {/* Status Column */}
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            stu.status === 'Certified'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : stu.status === 'Completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : stu.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : stu.status === 'Approved'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {stu.status}
                          </span>
                        </td>

                        {/* CEO Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {stu.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStudentStatus(stu.id, 'Approved')}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                                  title="Approve registration"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateStudentStatus(stu.id, 'Enrolled')}
                                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                                  title="Enroll directly"
                                >
                                  Enroll
                                </button>
                              </>
                            )}

                            {stu.status === 'Approved' && (
                              <button
                                onClick={() => handleUpdateStudentStatus(stu.id, 'Enrolled')}
                                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                              >
                                Enroll
                              </button>
                            )}

                            {stu.status === 'Enrolled' && (
                              <button
                                onClick={() => handleUpdateStudentStatus(stu.id, 'In Progress')}
                                className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                              >
                                Start 14D
                              </button>
                            )}

                            {(stu.status === 'In Progress' || stu.status === 'Completed') && !cert && (
                              <button
                                onClick={() => handleGenerateCertificate(stu.id)}
                                className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                                title="Issue official certificate"
                              >
                                <Award className="w-3 h-3" />
                                Certify
                              </button>
                            )}

                            {cert && (
                              <button
                                onClick={() => setSelectedCertForPreview(cert)}
                                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold cursor-pointer flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                Cert
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedStudentForModal(stu)}
                              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                              title="View full profile"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SCHOOL MANAGEMENT (Section 6 Requirement)                         */}
        {/* ========================================================================= */}
        {activeTab === 'schools' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  School Management & Institution Partnerships
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review partner applications, inspect enrolled student numbers, and verify performance statistics
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('school-register')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register School</span>
                </button>
              </div>
            </div>

            {/* School Search */}
            <div className="max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                placeholder="Search school name, ID, or city..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map(sch => {
                const schoolStudents = students.filter(s => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase());
                const completed = schoolStudents.filter(s => s.status === 'Completed' || s.status === 'Certified').length;
                const certified = schoolStudents.filter(s => s.status === 'Certified').length;

                return (
                  <div
                    key={sch.id}
                    className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-300 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-[10px] text-slate-400 font-semibold">{sch.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          sch.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {sch.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">
                        {sch.name}
                      </h3>

                      <p className="text-xs text-slate-500 mb-3">
                        {sch.type} · {sch.city}, {sch.state}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 mb-4">
                        <div>Principal: <strong>{sch.principalName}</strong></div>
                        <div>Contact: {sch.contactPerson}</div>
                        <div className="font-mono text-[11px] text-slate-500">{sch.contactNumber}</div>
                        <div className="text-[11px] text-indigo-700 font-semibold">Mode: {sch.preferredMode}</div>
                      </div>

                      {/* 3 Metrics: Registered, Completed, Certified (Section 6 Requirement) */}
                      <div className="grid grid-cols-3 gap-2 text-center py-2 border-t border-slate-200/80">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Registered</span>
                          <span className="font-bold text-slate-900 font-mono text-sm">{schoolStudents.length}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Completed</span>
                          <span className="font-bold text-blue-700 font-mono text-sm">{completed}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Certified</span>
                          <span className="font-bold text-emerald-600 font-mono text-sm">{certified}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                      {sch.status === 'Pending' ? (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            onClick={() => {
                              store.updateSchoolStatus(sch.id, 'Approved');
                              triggerToast(`School ${sch.name} approved!`);
                            }}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold cursor-pointer"
                          >
                            Approve School
                          </button>
                          <button
                            onClick={() => {
                              store.updateSchoolStatus(sch.id, 'Rejected');
                              triggerToast(`School ${sch.name} rejected.`);
                            }}
                            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded text-xs font-semibold cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-emerald-700 font-semibold text-[11px]">✓ Active Partner</span>
                          <button
                            onClick={() => setSelectedSchoolForModal(sch)}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                          >
                            View Full Report →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CERTIFICATE MANAGEMENT (Section 7 Requirement)                     */}
        {/* ========================================================================= */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Official Certificate Management System
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generate, authorize, and verify digital credentials with tamper-proof security hash
                </p>
              </div>

              {/* Quick Issue Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={generatingForStudentId}
                  onChange={(e) => setGeneratingForStudentId(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
                >
                  <option value="">-- Choose Eligible Student to Certify --</option>
                  {students.filter(s => s.status !== 'Certified').map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.schoolName} - {s.attendanceDays}/14D)
                    </option>
                  ))}
                </select>
                <button
                  disabled={!generatingForStudentId}
                  onClick={() => {
                    handleGenerateCertificate(generatingForStudentId);
                    setGeneratingForStudentId('');
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Generate Certificate
                </button>
              </div>
            </div>

            {/* 4 Summary Cards (Section 7 Requirement) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Generated</span>
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {certificates.length}
                </span>
                <span className="text-[11px] text-slate-500 block">Active certificates in ledger</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Eligible for Certification</span>
                <span className="text-2xl font-bold text-blue-700 font-mono tabular-nums">
                  {students.filter(s => s.status === 'Completed' || (s.attendanceDays >= 11 && s.status !== 'Certified')).length}
                </span>
                <span className="text-[11px] text-slate-500 block">Passed 80% criteria</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Pending Assessment</span>
                <span className="text-2xl font-bold text-amber-600 font-mono tabular-nums">
                  {stats.studentsPendingAssessment}
                </span>
                <span className="text-[11px] text-slate-500 block">Awaiting jury rubric score</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Certificates Issued</span>
                <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">
                  {certificates.filter(c => c.status === 'Issued').length}
                </span>
                <span className="text-[11px] text-slate-500 block">Authenticated & verifiable</span>
              </div>
            </div>

            {/* Certificates Master Registry Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Certificate ID</th>
                    <th className="px-4 py-3 font-semibold">Recipient Student</th>
                    <th className="px-4 py-3 font-semibold">School Name</th>
                    <th className="px-4 py-3 font-semibold">Program</th>
                    <th className="px-4 py-3 font-semibold">Score & Honors</th>
                    <th className="px-4 py-3 font-semibold">Issued Date</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {certificates.map(cert => (
                    <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-700">{cert.id}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{cert.studentName}</td>
                      <td className="px-4 py-3 text-slate-600 truncate max-w-[200px]" title={cert.schoolName}>
                        {cert.schoolName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 truncate max-w-[180px]">{cert.programName}</td>
                      <td className="px-4 py-3 font-mono">
                        <span className="text-emerald-700 font-bold">{cert.score}%</span> ·{' '}
                        <span className="text-slate-600 text-[11px]">{cert.grade}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{cert.issuedDate}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedCertForPreview(cert)}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview & Print</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PROGRAM MANAGEMENT (Section 8 Requirement)                         */}
        {/* ========================================================================= */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Program & Batch Management
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the 14-Day Student Development Program, track capacity, and assign schools
                </p>
              </div>

              <button
                onClick={() => setIsCreatingProgram(true)}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Program Batch</span>
              </button>
            </div>

            {/* Create Program Modal */}
            {isCreatingProgram && (
              <form onSubmit={handleCreateProgram} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900">Create New Program Batch</h3>
                  <button type="button" onClick={() => setIsCreatingProgram(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Program Name</label>
                    <input
                      type="text"
                      required
                      value={newProgName}
                      onChange={(e) => setNewProgName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={newProgDuration}
                      onChange={(e) => setNewProgDuration(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                    <input
                      type="text"
                      required
                      value={newProgAudience}
                      onChange={(e) => setNewProgAudience(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Teaching Method</label>
                    <input
                      type="text"
                      required
                      value={newProgMethod}
                      onChange={(e) => setNewProgMethod(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enrollment Capacity</label>
                    <input
                      type="number"
                      required
                      value={newProgCapacity}
                      onChange={(e) => setNewProgCapacity(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Training Mode</label>
                    <select
                      value={newProgMode}
                      onChange={(e) => setNewProgMode(e.target.value as TrainingMode)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Offline">In-Campus Offline</option>
                      <option value="Online">Live Online Cohort</option>
                      <option value="Hybrid">Hybrid Delivery</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Description</label>
                    <textarea
                      rows={2}
                      value={newProgDesc}
                      onChange={(e) => setNewProgDesc(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingProgram(false)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Save Program Batch
                  </button>
                </div>
              </form>
            )}

            {/* Programs List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map(prog => (
                <div
                  key={prog.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400 font-semibold">{prog.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        prog.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : prog.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {prog.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {prog.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
                      <div><strong>Duration:</strong> {prog.durationDays} Days</div>
                      <div><strong>Audience:</strong> {prog.targetAudience}</div>
                      <div><strong>Method:</strong> {prog.teachingMethod}</div>
                      <div><strong>Mode:</strong> {prog.mode}</div>
                      <div><strong>Capacity:</strong> {prog.enrolledCount} / {prog.capacity} seats</div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const newStatus = prog.status === 'Upcoming' ? 'In Progress' : prog.status === 'In Progress' ? 'Completed' : 'Upcoming';
                        store.updateProgram(prog.id, { status: newStatus });
                        triggerToast(`Program status set to ${newStatus}`);
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold cursor-pointer"
                    >
                      Advance Status
                    </button>
                    <button
                      onClick={() => {
                        const newCap = prompt('Enter new capacity for this batch:', String(prog.capacity));
                        if (newCap && !isNaN(Number(newCap))) {
                          store.updateProgram(prog.id, { capacity: Number(newCap) });
                          triggerToast(`Capacity updated to ${newCap}`);
                        }
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold cursor-pointer"
                    >
                      Edit Capacity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: STUDENT FULL PROFILE MODAL                                      */}
      {/* ========================================================================= */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedStudentForModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-lg flex items-center justify-center font-display">
                {selectedStudentForModal.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedStudentForModal.name}
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {selectedStudentForModal.id} · Registered {selectedStudentForModal.registeredAt.split('T')[0]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">School</span>
                <strong className="text-slate-900">{selectedStudentForModal.schoolName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Class & Section</span>
                <span className="text-slate-800">{selectedStudentForModal.grade} {selectedStudentForModal.section ? `(${selectedStudentForModal.section})` : ''}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Parent / Guardian</span>
                <span className="text-slate-800">{selectedStudentForModal.parentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Contact Phone</span>
                <span className="text-slate-800 font-mono">{selectedStudentForModal.parentContact}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Location</span>
                <span className="text-slate-800">{selectedStudentForModal.city}, {selectedStudentForModal.state}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Program</span>
                <span className="text-slate-800">{selectedStudentForModal.programName}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase font-mono">
                Update Student Status:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Pending', 'Approved', 'Enrolled', 'In Progress', 'Completed', 'Certified'] as StudentStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStudentStatus(selectedStudentForModal.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedStudentForModal.status === st
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {selectedStudentForModal.certificateId && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                <span>Certificate ID: <strong>{selectedStudentForModal.certificateId}</strong></span>
                <button
                  onClick={() => {
                    const cert = certificates.find(c => c.id === selectedStudentForModal.certificateId);
                    if (cert) {
                      setSelectedStudentForModal(null);
                      setSelectedCertForPreview(cert);
                    }
                  }}
                  className="font-bold underline cursor-pointer"
                >
                  View Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ASSESSMENT EVALUATION RUBRIC                                     */}
      {/* ========================================================================= */}
      {evaluatingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveAssessment} className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-5">
            <button
              type="button"
              onClick={() => setEvaluatingStudent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold">Day 14 Capstone Rubric</span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Record Assessment for {evaluatingStudent.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation across 14 practical skills, peer collaboration, and stage presentation
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>Overall Assessment Score (0 - 100):</span>
                <span className="font-mono text-base font-extrabold text-indigo-700">{evalScore} / 100</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={evalScore}
                onChange={(e) => setEvalScore(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>50 (Pass)</span>
                <span>80 (Distinction)</span>
                <span>100 (Exceptional)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mentor Jury Feedback & Remarks
              </label>
              <textarea
                required
                rows={3}
                value={evalFeedback}
                onChange={(e) => setEvalFeedback(e.target.value)}
                placeholder="Write constructive observations on communication, teamwork, and capstone presentation..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEvaluatingStudent(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                Save Rubric & Mark Completed
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CERTIFICATE PRINT / PDF PREVIEW                                  */}
      {/* ========================================================================= */}
      {selectedCertForPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedCertForPreview(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors no-print"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <CertificateView
              certificate={selectedCertForPreview}
              onClose={() => setSelectedCertForPreview(null)}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SCHOOL FULL REPORT MODAL                                        */}
      {/* ========================================================================= */}
      {selectedSchoolForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedSchoolForModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl font-display">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedSchoolForModal.name}
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {selectedSchoolForModal.id} · {selectedSchoolForModal.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Principal</span>
                <strong className="text-slate-900">{selectedSchoolForModal.principalName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Coordinator</span>
                <span className="text-slate-800">{selectedSchoolForModal.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Official Phone</span>
                <span className="text-slate-800 font-mono">{selectedSchoolForModal.contactNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Official Email</span>
                <span className="text-slate-800">{selectedSchoolForModal.email}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Campus Address</span>
                <span className="text-slate-800">{selectedSchoolForModal.address}, {selectedSchoolForModal.city}, {selectedSchoolForModal.state}</span>
              </div>
            </div>

            {/* Student breakdown for this school */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold text-slate-900 mb-2">
                Student Enrollment Roster ({students.filter(s => s.schoolId === selectedSchoolForModal.id).length} Students)
              </h4>
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg text-xs divide-y divide-slate-100">
                {students.filter(s => s.schoolId === selectedSchoolForModal.id).map(stu => (
                  <div key={stu.id} className="p-2.5 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900">{stu.name}</strong> ({stu.grade})
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500">{stu.attendanceDays}/14 Days</span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {stu.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSchoolForModal(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
