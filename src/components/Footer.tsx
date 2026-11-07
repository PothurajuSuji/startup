import React from 'react';
import { PageId } from './Navbar';
import { Mail, Phone, MapPin, Award, Shield, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pt-16 pb-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-wider">
                HLX
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                HYPER LEARNX
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Beyond Classrooms. Beyond Textbooks. Building Future-Ready Students. An educational startup delivering practical, activity-based training in 14 essential life skills for school students across India.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Award className="w-4 h-4" />
              <span>Certified 14-Day Practical Methodology</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-4 font-mono">
              Explore Programs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our 14 Skills & Outcomes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  14-Day Student Development Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About HYPER LEARNX & Founder Note
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verification')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Certificate Verification Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Registration & Portals */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-4 font-mono">
              Registrations & Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('student-register')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Register as a Student (Grades 5-12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('school-register')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Register Your School (CBSE / ICSE / IB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('student-portal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Student Portal & Progress Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('school-portal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  School Partner Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-login')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  CEO Management Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-semibold mb-4 font-mono">
              Official Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>HYPER LEARNX Headquarters, Innovation Hub, Outer Ring Road, Bengaluru, Karnataka, 560103</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 (080) 4120-7799 / +91 98860 14140</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@hyperlearnx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} HYPER LEARNX Technologies Private Limited. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Child Privacy Protected</span>
            <span>·</span>
            <span>Parent Consent Guaranteed</span>
            <span>·</span>
            <span>ISO-Standard Methodology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
