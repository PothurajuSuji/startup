import React from 'react';
import { PageId } from '../Navbar';
import { SKILLS_LIST, FOURTEEN_DAY_STRUCTURE } from '../../data/skillsData';
import { CEODashboardStats } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Building2, 
  Award, 
  BookOpen, 
  Target,
  Compass,
  GraduationCap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  stats: CEODashboardStats;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, stats }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Headline, Subheading, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>India&apos;s Dedicated 14-Day School Skill Development Program</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.15] text-balance">
                Beyond Classrooms. Beyond Textbooks. Building Future-Ready Students.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                We empower school students with essential life skills, confidence, communication and practical knowledge to succeed in the real world.
              </p>

              {/* 3 Main Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('student-register')}
                  className="px-5 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-md hover:shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  Register as a Student
                </button>
                <button
                  onClick={() => onNavigate('school-register')}
                  className="px-5 py-3 text-sm font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  Register Your School
                </button>
                <button
                  onClick={() => onNavigate('programs')}
                  className="px-5 py-3 text-sm font-bold text-slate-300 hover:text-white bg-transparent hover:bg-slate-900 border border-slate-800 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Our Programs
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Grades 5 to 12
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Practical & Activity-Based
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Official Verifiable Certificate
                </span>
              </div>
            </div>

            {/* Right 5 cols: Hero Image Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[420px]">
                <img
                  src="/src/assets/images/hero_school_students_1794046194489.jpg"
                  alt="School students in modern uniforms actively engaged in HYPER LEARNX public speaking and collaboration workshop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl text-xs text-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">14-Day Practical Immersion</span>
                    <span className="text-slate-400 text-[11px]">Real stages, real teamwork, zero rote learning</span>
                  </div>
                  <span className="text-indigo-400 font-mono font-bold text-xs uppercase px-2 py-0.5 bg-indigo-950/80 rounded border border-indigo-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Statistics (Section 10 Requirement: Live registration statistics) */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
              Live Real-Time Impact
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-display">
              Transforming Classrooms Across the Nation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dynamically aggregated from current registrations and batch completions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {stats.totalRegisteredStudents.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Total Registered Students</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Grades 5 - 12</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <Building2 className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {stats.totalRegisteredSchools.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Partner Schools</div>
              <div className="text-[11px] text-slate-400 mt-0.5">CBSE, ICSE, IB & State</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                {stats.totalCertifiedStudents.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Certified Graduates</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Verified Life Skill Badges</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <Target className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {stats.totalProgramsConducted}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">Programs & Batches</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Activity-Based Bootcamps</div>
            </div>
          </div>
        </div>
      </section>

      {/* About HYPER LEARNX & Our 6-Step Teaching Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
                About HYPER LEARNX
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
                Practical, Activity-Based Life Skills for Every School Student
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Regular academics focus heavily on textbook memorization and exam scores. Yet in higher education, careers, and personal life, success depends on self-confidence, effective speaking, emotional mastery, teamwork, and critical problem-solving.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                HYPER LEARNX bridges this gap. Our <strong>14-Day Student Development Program</strong> replaces lectures with interactive challenges, mock stage debriefs, and real peer collaborations that build character for a lifetime.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <span>Read Founder&apos;s Note & Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Our 6-Step Teaching Approach
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Methodology</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { step: '01', title: 'Learn', desc: 'Core concept discovery without tedious jargon.' },
                    { step: '02', title: 'Practise', desc: 'Hands-on drills and guided exercises.' },
                    { step: '03', title: 'Participate', desc: 'Interactive group discussions and mock roles.' },
                    { step: '04', title: 'Perform', desc: 'Live stage, presentation, and team pitch.' },
                    { step: '05', title: 'Get Assessed', desc: 'Constructive rubric scoring and feedback.' },
                    { step: '06', title: 'Get Certified', desc: 'Official authenticated HYPER LEARNX credential.' },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="bg-white p-4 rounded-xl border border-slate-200/80 hover:border-indigo-300 transition-colors"
                    >
                      <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-1">
                        {item.step}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our 14 Skills Showcase */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
                Curriculum Overview
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display mt-1">
                Our 14 Future-Ready Skills
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Each day focuses on a distinct pillar of personal excellence through real-world simulation, active practice, and personalized mentor debriefs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap self-start md:self-end"
            >
              <span>Explore All 14 Skills & Outcomes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SKILLS_LIST.map((skill) => (
              <div
                key={skill.id}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>Day {skill.dayNumber}</span>
                    <span className="text-indigo-600 font-semibold">Skill #{skill.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {skill.explanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium truncate max-w-[170px]">
                    Outcome: {skill.expectedOutcome.substring(0, 32)}...
                  </span>
                  <button
                    onClick={() => onNavigate('skills')}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer shrink-0"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Program Action Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Asset */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/src/assets/images/students_collaborating_1794046194475.jpg"
                  alt="High school students actively collaborating on innovation table with cards"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Hands-On Collaboration Drills</span>
                  <span className="text-emerald-700 font-semibold">100% Practical</span>
                </div>
              </div>
            </div>

            {/* Right Reasons */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
                Why Schools & Parents Choose HYPER LEARNX
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                Built Specifically for the Developmental Needs of Modern School Students
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero Rote Learning — 100% Activity-Based</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Students don&apos;t sit through boring powerpoints. Every module involves roleplays, debates, team engineering tasks, and stage talks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">School In-Campus & Hybrid Friendly</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      We integrate directly with school calendars without disrupting regular examinations or academic syllabi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Safe, Monitored & Parent-Transparent</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Strict child privacy protection, verified adult mentor credentials, and daily parent progress visibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Tamper-Proof Verifiable Certification</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Each student receives a unique certificate ID verifiable anytime on our official website by schools, colleges, and scholarship committees.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('school-register')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Partner With Your School
                </button>
                <button
                  onClick={() => onNavigate('student-register')}
                  className="px-5 py-2.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                >
                  Enroll Individual Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Give School Students the Lifelong Advantage of Real Skills
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Enroll today in the upcoming 14-Day Student Development Program or bring HYPER LEARNX to your school campus.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('student-register')}
              className="px-6 py-3 text-sm font-bold text-indigo-950 bg-white hover:bg-slate-100 rounded-lg shadow-md transition-all cursor-pointer"
            >
              Register as a Student
            </button>
            <button
              onClick={() => onNavigate('school-register')}
              className="px-6 py-3 text-sm font-bold text-white bg-indigo-800 hover:bg-indigo-700 border border-indigo-600 rounded-lg transition-all cursor-pointer"
            >
              Register Your School
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-sm font-medium text-indigo-200 hover:text-white underline-offset-4 hover:underline cursor-pointer"
            >
              Speak With Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
