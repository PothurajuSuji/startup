import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { SKILLS_LIST, FOURTEEN_DAY_STRUCTURE } from '../../data/skillsData';
import { 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  Layers, 
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';

interface OurSkillsPageProps {
  onNavigate: (page: PageId) => void;
}

export const OurSkillsPage: React.FC<OurSkillsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const filteredSkills = SKILLS_LIST.filter(skill => {
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.expectedOutcome.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = selectedDay === null || skill.dayNumber === selectedDay;
    return matchesSearch && matchesDay;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
            Core Curriculum & Pedagogy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Our Skills & 14-Day Development Program
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every day of our signature 14-Day Student Development Program focuses on an essential real-world capability. 
            Below is the complete curriculum detailing what students learn, the practical activities they perform, and the measurable learning outcomes.
          </p>
        </div>

        {/* 14-Day Course Structure Timeline / Roadmap */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                14-Day Course Structure & Progression
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                From self-discovery to stage presence, interpersonal collaboration, critical thinking, and future career readiness.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              14 Consecutive Days
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {FOURTEEN_DAY_STRUCTURE.map((item) => (
              <button
                key={item.day}
                onClick={() => setSelectedDay(selectedDay === item.day ? null : item.day)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDay === item.day
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className={`font-mono font-bold ${selectedDay === item.day ? 'text-indigo-700' : 'text-slate-500'}`}>
                    Day {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400">#0{item.day}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate" title={item.skill}>
                  {item.skill}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5" title={item.focus}>
                  {item.focus}
                </div>
              </button>
            ))}
          </div>

          {selectedDay !== null && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Filtering by: <strong>Day {selectedDay}</strong>
              </span>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
              >
                Clear Day Filter
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, topics, or practical activities..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="text-xs text-slate-500 self-center">
            Showing <span className="font-mono font-semibold text-slate-900">{filteredSkills.length}</span> of 14 skills
          </div>
        </div>

        {/* 14 Skills Detailed Cards */}
        <div className="space-y-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:border-indigo-300 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded">
                      Day {skill.dayNumber} of 14
                    </span>
                    <span className="text-xs font-mono text-slate-400">Skill Code: HLX-SKL-{skill.id.toString().padStart(2, '0')}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    {skill.id}. {skill.name}
                  </h2>

                  <p className="text-xs sm:text-sm font-medium text-indigo-700">
                    &ldquo;{skill.tagline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {skill.explanation}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('student-register')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Enroll in Program
                  </button>
                </div>
              </div>

              {/* 3 Detail Columns: What Students Learn, Practical Activities, Expected Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* What Students Will Learn */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>What Students Will Learn</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    {skill.whatStudentsLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Activities */}
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Practical Activities & Drills</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    {skill.practicalActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Learning Outcome */}
                <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Expected Learning Outcome</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {skill.expectedOutcome}
                  </p>
                  <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assessed on Day 14 Capstone Rubric</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-sm">No skills found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedDay(null); }}
                className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Program CTA Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Ready to Bring These 14 Skills to Your Students?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Partner with HYPER LEARNX to conduct the 14-Day Student Development Program at your school or enroll individually.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('school-register')}
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Register School
            </button>
            <button
              onClick={() => onNavigate('student-register')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
            >
              Register Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
