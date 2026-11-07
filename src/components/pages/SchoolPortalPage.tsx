import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { School, Student, Certificate } from '../../types';
import { CertificateView } from '../CertificateView';
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle2, 
  Search, 
  Filter, 
  AlertCircle,
  Clock,
  Download,
  Mail,
  Phone,
  X
} from 'lucide-react';

interface SchoolPortalPageProps {
  schools: School[];
  students: Student[];
  certificates: Certificate[];
  onNavigate: (page: PageId) => void;
}

export const SchoolPortalPage: React.FC<SchoolPortalPageProps> = ({
  schools,
  students,
  certificates,
  onNavigate
}) => {
  const [loginInput, setLoginInput] = useState('');
  const [currentSchool, setCurrentSchool] = useState<School | null>(() => schools[0] || null);
  const [searchRoster, setSearchRoster] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [loginError, setLoginError] = useState('');
  const [batchRequested, setBatchRequested] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const query = loginInput.trim().toLowerCase();
    if (!query) {
      setLoginError('Please enter a valid School ID or Email.');
      return;
    }

    const found = schools.find(s => 
      s.id.toLowerCase() === query || 
      s.email.toLowerCase() === query ||
      s.name.toLowerCase().includes(query)
    );

    if (found) {
      setCurrentSchool(found);
    } else {
      setLoginError('No registered school found with those credentials. Select a sample school below.');
    }
  };

  // Filter students belonging to this school
  const schoolStudents = currentSchool 
    ? students.filter(s => s.schoolId === currentSchool.id || s.schoolName.toLowerCase() === currentSchool.name.toLowerCase())
    : [];

  const completedCount = schoolStudents.filter(s => s.status === 'Completed' || s.status === 'Certified').length;
  const certifiedCount = schoolStudents.filter(s => s.status === 'Certified').length;
  const enrolledCount = schoolStudents.filter(s => s.status === 'Enrolled' || s.status === 'In Progress').length;

  const filteredRoster = schoolStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchRoster.toLowerCase()) || s.id.toLowerCase().includes(searchRoster.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || s.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleExportRoster = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Student ID,Name,Grade,Section,Parent Name,Contact,Status,Attendance,Score,Certificate ID"]
        .concat(
          schoolStudents.map(s => 
            `"${s.id}","${s.name}","${s.grade}","${s.section || ''}","${s.parentName}","${s.parentContact}","${s.status}","${s.attendanceDays}/14","${s.assessmentScore ?? 'N/A'}","${s.certificateId ?? 'N/A'}"`
          )
        ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${currentSchool?.name.replace(/\s+/g, '_')}_student_roster.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 font-mono mb-1">
              <Building2 className="w-4 h-4" />
              <span>HYPER LEARNX SCHOOL PARTNER PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              School Management & Student Statistics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitor student enrollments, attendance, and official certification records
            </p>
          </div>

          {/* Quick Login Form */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <form onSubmit={handleLogin} className="flex items-center gap-2">
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="School ID (e.g. HLX-SCH-2026-101)"
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono w-56"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        {/* Demo School Selector */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Quick Demo Schools:</span>
          {schools.slice(0, 4).map((sch) => (
            <button
              key={sch.id}
              onClick={() => {
                setCurrentSchool(sch);
                setLoginInput(sch.id);
                setLoginError('');
              }}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer font-medium ${
                currentSchool?.id === sch.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {sch.name} ({sch.type})
            </button>
          ))}
        </div>

        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{loginError}</span>
          </div>
        )}

        {currentSchool ? (
          <div className="space-y-8">
            {/* School Profile Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl font-display shrink-0">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                        {currentSchool.name}
                      </h2>
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {currentSchool.id}
                      </span>
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {currentSchool.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {currentSchool.address}, {currentSchool.city}, {currentSchool.state}
                    </p>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Principal: <strong className="text-slate-800">{currentSchool.principalName}</strong> · Coordinator: {currentSchool.contactPerson} ({currentSchool.contactNumber})
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Approval Status</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentSchool.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {currentSchool.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setBatchRequested(true)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Request New Batch / Trainers
                  </button>
                </div>
              </div>

              {batchRequested && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
                  <span>
                    ✓ Batch request received for <strong>{currentSchool.name}</strong>. Our academic team will contact {currentSchool.contactPerson} within 24 hours.
                  </span>
                  <button onClick={() => setBatchRequested(false)} className="text-emerald-700 font-bold hover:underline cursor-pointer">
                    Dismiss
                  </button>
                </div>
              )}

              {/* 4 School Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Registered Students</span>
                  <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {schoolStudents.length}
                  </span>
                  <span className="text-[11px] text-slate-500 block">From your campus</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Currently Enrolled</span>
                  <span className="text-2xl font-bold text-indigo-700 font-mono tabular-nums">
                    {enrolledCount}
                  </span>
                  <span className="text-[11px] text-slate-500 block">Active in training</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Completed Training</span>
                  <span className="text-2xl font-bold text-blue-700 font-mono tabular-nums">
                    {completedCount}
                  </span>
                  <span className="text-[11px] text-slate-500 block">Finished 14 days</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Certified Students</span>
                  <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">
                    {certifiedCount}
                  </span>
                  <span className="text-[11px] text-slate-500 block">Official certificates issued</span>
                </div>
              </div>
            </div>

            {/* Enrolled Students Roster Table (Prompt Section 3.B & 6 Requirement) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Enrolled Student Roster & Certification Statistics
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Individual attendance, assessment scores, and verified certificates
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportRoster}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download CSV Roster</span>
                  </button>
                  <button
                    onClick={() => onNavigate('student-register')}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    + Register Student
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchRoster}
                    onChange={(e) => setSearchRoster(e.target.value)}
                    placeholder="Search by student name or Student ID..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 whitespace-nowrap">Class:</span>
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Grades</option>
                    {['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Roster Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Student ID</th>
                      <th className="px-4 py-3 font-semibold">Student Name</th>
                      <th className="px-4 py-3 font-semibold">Class</th>
                      <th className="px-4 py-3 font-semibold">Parent Contact</th>
                      <th className="px-4 py-3 font-semibold">Attendance</th>
                      <th className="px-4 py-3 font-semibold">Score</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Certificate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredRoster.map((stu) => {
                      const cert = stu.certificateId ? certificates.find(c => c.id === stu.certificateId) : null;

                      return (
                        <tr key={stu.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-mono text-slate-500">{stu.id}</td>
                          <td className="px-4 py-3 font-bold text-slate-900">{stu.name}</td>
                          <td className="px-4 py-3 text-slate-600">{stu.grade} {stu.section ? `(${stu.section})` : ''}</td>
                          <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{stu.parentContact}</td>
                          <td className="px-4 py-3 font-mono text-slate-800">
                            {stu.attendanceDays} / 14 Days
                          </td>
                          <td className="px-4 py-3 font-mono">
                            {stu.assessmentScore !== undefined ? (
                              <span className="text-emerald-700 font-bold">{stu.assessmentScore}%</span>
                            ) : (
                              <span className="text-slate-400">Pending</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              stu.status === 'Certified'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : stu.status === 'Completed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : stu.status === 'In Progress'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {stu.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {cert ? (
                              <button
                                onClick={() => setSelectedCert(cert)}
                                className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs cursor-pointer inline-flex items-center gap-1"
                              >
                                <Award className="w-3.5 h-3.5" />
                                <span>View Cert</span>
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Not yet issued</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredRoster.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400 text-xs">
                          No students registered from this school matching filters. Click &ldquo;Register Student&rdquo; to add candidates.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Sign in to View School Record</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please enter your School ID or official email in the top bar to inspect enrolled student attendance and certificates.
            </p>
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors no-print"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <CertificateView
                certificate={selectedCert}
                onClose={() => setSelectedCert(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
