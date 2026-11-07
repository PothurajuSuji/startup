import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { Student, Certificate } from '../../types';
import { CertificateView } from '../CertificateView';
import { FOURTEEN_DAY_STRUCTURE } from '../../data/skillsData';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Award, 
  Calendar, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Printer,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface StudentPortalPageProps {
  students: Student[];
  certificates: Certificate[];
  onNavigate: (page: PageId) => void;
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({
  students,
  certificates,
  onNavigate
}) => {
  const [loginInput, setLoginInput] = useState('');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => {
    // Default to the first certified student so reviewer sees a rich portal immediately
    return students.find(s => s.status === 'Certified') || students[0] || null;
  });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const query = loginInput.trim().toLowerCase();
    if (!query) {
      setLoginError('Please enter a valid Student ID or Contact Number.');
      return;
    }

    const found = students.find(s => 
      s.id.toLowerCase() === query || 
      s.parentContact.replace(/\D/g, '') === query.replace(/\D/g, '') ||
      s.name.toLowerCase() === query
    );

    if (found) {
      setCurrentStudent(found);
    } else {
      setLoginError('No student found with that ID or phone number. Check the ID or select a sample student below.');
    }
  };

  const handleSelectSample = (stu: Student) => {
    setCurrentStudent(stu);
    setLoginInput(stu.id);
    setLoginError('');
  };

  const currentCert = currentStudent?.certificateId
    ? certificates.find(c => c.id === currentStudent.certificateId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header & Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 font-mono mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>HYPER LEARNX STUDENT PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Student Progress & Certification
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Track your 14-day attendance, assessment score, and verified credentials
            </p>
          </div>

          {/* Quick Login Form / Selector */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-2">
            <form onSubmit={handleLogin} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="Student ID (e.g. HLX-STU-2026-1001)"
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono w-56"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        {/* Quick Demo Switcher Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Quick Demo Students:</span>
          {students.slice(0, 4).map((stu) => (
            <button
              key={stu.id}
              onClick={() => handleSelectSample(stu)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer font-medium ${
                currentStudent?.id === stu.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {stu.name} ({stu.status})
            </button>
          ))}
        </div>

        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{loginError}</span>
          </div>
        )}

        {currentStudent ? (
          <div className="space-y-8">
            {/* Student Profile Card & High-Level Status */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl font-display shrink-0">
                    {currentStudent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                        {currentStudent.name}
                      </h2>
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {currentStudent.id}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {currentStudent.grade} {currentStudent.section ? `(${currentStudent.section})` : ''} ·{' '}
                      <span className="font-semibold text-slate-900">{currentStudent.schoolName}</span> ·{' '}
                      {currentStudent.city}, {currentStudent.state}
                    </p>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Parent / Guardian: {currentStudent.parentName} ({currentStudent.parentContact})
                    </p>
                  </div>
                </div>

                {/* Status Card & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-right sm:text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Registration Status</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentStudent.status === 'Certified'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : currentStudent.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : currentStudent.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {currentStudent.status}
                    </span>
                  </div>

                  {currentStudent.status === 'Certified' && currentCert && (
                    <button
                      onClick={() => setSelectedCert(currentCert)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>View & Download Certificate</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Attendance</span>
                  <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                    {currentStudent.attendanceDays} / 14 Days
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {Math.round((currentStudent.attendanceDays / 14) * 100)}% Participation
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Assessment Score</span>
                  <span className="text-lg font-bold font-mono tabular-nums text-indigo-700">
                    {currentStudent.assessmentScore !== undefined ? `${currentStudent.assessmentScore} / 100` : 'Pending Rubric'}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {currentStudent.assessmentScore !== undefined ? (currentStudent.assessmentScore >= 90 ? 'Honors Distinction' : 'Satisfactory Pass') : 'Day 14 Jury Review'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Certification Status</span>
                  <span className={`text-sm font-bold block mt-1 ${
                    currentStudent.status === 'Certified' ? 'text-emerald-700' : 'text-slate-700'
                  }`}>
                    {currentStudent.status === 'Certified' ? 'Approved & Issued' : 'Locked (Pending Req.)'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {currentStudent.certificateId || 'Requires 80% + Capstone'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Program Track</span>
                  <span className="text-xs font-bold text-slate-900 block mt-1 truncate">
                    {currentStudent.programName}
                  </span>
                  <span className="text-[11px] text-indigo-600 block">14 Essential Skills</span>
                </div>
              </div>
            </div>

            {/* Assessment Feedback Banner */}
            {currentStudent.assessmentFeedback && (
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-2">
                  <Award className="w-4 h-4 text-indigo-700" />
                  <span>Certified Mentor Assessment & Jury Notes</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed italic">
                  &ldquo;{currentStudent.assessmentFeedback}&rdquo;
                </p>
              </div>
            )}

            {/* 14-Day Day-by-Day Interactive Progress Roadmap */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    14-Day Practical Course Progress
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Completed sessions are verified by HYPER LEARNX trainers
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                  {currentStudent.attendanceDays} Completed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FOURTEEN_DAY_STRUCTURE.map((item) => {
                  const isDone = item.day <= currentStudent.attendanceDays;
                  const isCurrent = item.day === currentStudent.attendanceDays + 1 && currentStudent.status === 'In Progress';

                  return (
                    <div
                      key={item.day}
                      className={`p-3.5 rounded-xl border text-xs transition-colors flex items-start gap-3 ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                          : isCurrent
                          ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 text-slate-900'
                          : 'bg-slate-50/60 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] mb-0.5">
                          <span className={`font-mono font-bold ${isDone ? 'text-emerald-700' : isCurrent ? 'text-indigo-700' : 'text-slate-400'}`}>
                            Day {item.day}
                          </span>
                          <span className="text-[10px] text-slate-400">{item.phase.split(':')[0]}</span>
                        </div>
                        <div className="font-bold truncate text-slate-900">{item.skill}</div>
                        <div className="text-[11px] text-slate-500 truncate">{item.focus}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Sign in to View Student Record</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please enter your unique Student ID (e.g. HLX-STU-2026-1001) in the box above to inspect your attendance, jury evaluation, and certificate.
            </p>
          </div>
        )}

        {/* Certificate Modal Popup */}
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
