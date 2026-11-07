import React from 'react';
import { PageId } from '../Navbar';
import { Program } from '../../types';
import { 
  Calendar, 
  Users, 
  Award, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Sparkles,
  BookOpen,
  ShieldCheck,
  Target,
  ArrowRight
} from 'lucide-react';

interface ProgramsPageProps {
  programs: Program[];
  onNavigate: (page: PageId) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ programs, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
            HYPER LEARNX Offerings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Programs & Training Formats
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our programs are specifically engineered for school environments to transform hesitation into confidence, confusion into clarity, and passive listeners into articulate, ethical future leaders.
          </p>
        </div>

        {/* Flagship Program Card (Section 8 Requirement) */}
        <div className="bg-white rounded-2xl border-2 border-indigo-600/60 p-6 sm:p-10 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl font-mono">
            Flagship National Program
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">
                  CORE PROGRAM
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
                  14-Day Student Development Program
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  A high-impact, activity-driven journey designed to build the foundational social, emotional, and cognitive life skills that school textbooks do not teach.
                </p>
              </div>

              {/* 4 Required Metadata Points from prompt: Name, Duration, Target Audience, Teaching Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>DURATION</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    14 Days (1 Session / Day)
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">60 to 90 mins daily active session</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>TARGET AUDIENCE</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    School Students (Grades 5 to 12)
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Junior (Grades 5-8) & Senior (Grades 9-12)</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span>TEACHING METHOD</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    Practical, Activity-Based Learning
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2 font-medium">
                    <span className="text-indigo-700">Learn</span>
                    <span>→</span>
                    <span className="text-indigo-700">Practise</span>
                    <span>→</span>
                    <span className="text-indigo-700">Participate</span>
                    <span>→</span>
                    <span className="text-indigo-700">Perform</span>
                    <span>→</span>
                    <span className="text-indigo-700">Get Assessed</span>
                    <span>→</span>
                    <span className="text-indigo-700">Get Certified</span>
                  </div>
                </div>
              </div>

              {/* What students receive */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-900 font-mono">
                  Every Enrolled Student Receives:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Physical Activity Workbook & Daily Reflection Journal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Interactive Public Speaking Stage Pass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certified Mentor Rubric Evaluation & Feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Official Authenticated Certificate with Verification ID</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('student-register')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Enroll Individual Student
                </button>
                <button
                  onClick={() => onNavigate('school-register')}
                  className="px-5 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Book for Entire School Batch
                </button>
                <button
                  onClick={() => onNavigate('skills')}
                  className="px-4 py-2.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  View 14-Day Day-by-Day Syllabus →
                </button>
              </div>
            </div>

            {/* Right Column: Training Modes */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Delivery Modes for Schools
              </h3>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>1. In-Campus Offline Workshop</span>
                    <span className="text-[10px] font-mono text-indigo-600 uppercase">Most Popular</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified HYPER LEARNX trainers visit your school campus daily for 14 days. Full physical staging, group drills, and live auditorium showcase.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>2. Live Interactive Online Cohort</span>
                    <span className="text-[10px] font-mono text-emerald-600 uppercase">Flexible</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Live video breakout rooms, digital whiteboard activities, and national peer networking for individual registrations or remote schools.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>3. Hybrid Model</span>
                    <span className="text-[10px] font-mono text-purple-600 uppercase">Blended</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Online interactive weekday drills paired with weekend physical masterclasses and mock debate tournaments on campus.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="text-[11px] text-slate-500">
                  <strong>Assessment Criterion:</strong> Students must maintain $\ge 80\%$ attendance and present their Capstone on Day 14 to receive the official certificate.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Conducted Programs & Workshops */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              All Programs & Conducted Batches
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active, upcoming, and completed batches managed via the CEO Dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                    <span>{prog.id}</span>
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

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {prog.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <strong className="text-slate-800">{prog.durationDays} Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Mode:</span>
                      <strong className="text-slate-800">{prog.mode}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Audience:</span>
                      <span className="text-slate-700 truncate max-w-[160px]">{prog.targetAudience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enrolled Capacity:</span>
                      <span className="font-mono text-slate-900 font-semibold">{prog.enrolledCount} / {prog.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('student-register')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Enroll in Batch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
