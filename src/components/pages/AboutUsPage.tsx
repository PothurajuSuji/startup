import React from 'react';
import { PageId } from '../Navbar';
import { 
  ShieldCheck, 
  Heart, 
  Target, 
  Sparkles, 
  Award, 
  Users, 
  CheckCircle2, 
  Building2,
  ArrowRight
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-700 font-mono">
            About HYPER LEARNX
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Preparing School Students for Life, Leadership, and the Real World
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            HYPER LEARNX was founded with a singular conviction: while regular school syllabi impart essential academic foundations, the skills that determine real-world happiness, career velocity, and mental fortitude are life skills.
          </p>
        </div>

        {/* CEO & Founder's Message Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* CEO Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-md mb-4 bg-slate-200">
                <img
                  src="/src/assets/images/founder_ceo_portrait_1794046194642.jpg"
                  alt="Nisha K. Rao, Founder & CEO of HYPER LEARNX"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Nisha K. Rao</h3>
              <p className="text-xs text-indigo-700 font-semibold">Founder & Chief Executive Officer</p>
              <p className="text-[11px] text-slate-500 mt-0.5">HYPER LEARNX Technologies</p>
            </div>

            {/* CEO Note Text */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                A Note From Our CEO
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight">
                &ldquo;Every child has immense natural genius. They just need the stage, the tools, and the psychological safety to express it.&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As educators and entrepreneurs, we constantly saw bright school students freezing in front of microphones, struggling to resolve peer friction, or succumbing to toxic exam anxiety. Schools want to address this, but curricula are overburdened.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                That is why we designed our <strong>14-Day Student Development Program</strong>. Not as another textbook subject, but as an experiential playground where students learn by doing: speaking, debating, listening, failing safely, and discovering their innate strengths.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you see a quiet 8th grader hold an auditorium spellbound on Day 14, you realize what is possible when education honors the whole human being.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-800">
                <span>Bangalore, India</span>
                <span>·</span>
                <span className="text-indigo-600">Building for 100,000+ Future Leaders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, and Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To nurture a generation of emotionally resilient, articulate, and empathetic school students who lead with character, critical thought, and compassion.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To partner with 1,000+ schools across the nation, delivering practical, activity-based 14-day training programs that build lifelong life and career competencies.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">Our Values</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dignity for every student, zero fear of failure, rigorous practical practice, parental transparency, and uncompromising child data safety.
            </p>
          </div>
        </div>

        {/* Child Safety & Privacy Commitment */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Child Safety & Parental Trust Charter
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Because our programs cater to school minors, HYPER LEARNX adheres to the highest child safety, data privacy, and ethical educational standards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono">
                Mandatory Parent Consent
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No minor is enrolled without explicit guardian consent and direct contact verification.
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono">
                Verified Certified Mentors
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All trainers undergo thorough background checks, pedagogical audits, and POSH / child protection certifications.
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono">
                Zero Data Monetization
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Student information is strictly confidential. Only aggregated school statistics are ever displayed publicly.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation to registrations */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            Want to see how we manage our programs and students behind the scenes?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('student-register')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              Student Registration
            </button>
            <button
              onClick={() => onNavigate('admin-login')}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              CEO / Admin Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
