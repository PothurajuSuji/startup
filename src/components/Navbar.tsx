import React, { useState } from 'react';
import { Menu, X, ChevronDown, UserCheck, Shield, GraduationCap, Building2 } from 'lucide-react';

export type PageId =
  | 'home'
  | 'about'
  | 'skills'
  | 'programs'
  | 'student-register'
  | 'school-register'
  | 'student-portal'
  | 'school-portal'
  | 'verification'
  | 'contact'
  | 'admin-login'
  | 'ceo-dashboard';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isAdminLoggedIn,
  onLogoutAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element brand wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 text-left shrink-0 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider group-hover:bg-indigo-600 transition-colors">
              HLX
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap">
              HYPER LEARNX
            </span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'home' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('skills')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'skills' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Our Skills
            </button>
            <button
              onClick={() => handleNav('programs')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'programs' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'about' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('verification')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'verification' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Verify Certificate
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                currentPage === 'contact' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary action & Access portals */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('ceo-dashboard')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  CEO Dashboard
                </button>
                {onLogoutAdmin && (
                  <button
                    onClick={onLogoutAdmin}
                    className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Portals & Login</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {portalDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setPortalDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNav('student-portal')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">Student Portal</div>
                        <div className="text-[11px] text-slate-500">Track progress & certificate</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleNav('school-portal')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">School Portal</div>
                        <div className="text-[11px] text-slate-500">View enrolled students</div>
                      </div>
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={() => handleNav('admin-login')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900">CEO / Admin Login</div>
                        <div className="text-[11px] text-slate-500">Management dashboard</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => handleNav('student-register')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              Register Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNav('student-register')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg whitespace-nowrap"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('skills')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Our Skills (14 Skills)
          </button>
          <button
            onClick={() => handleNav('programs')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            14-Day Program Details
          </button>
          <button
            onClick={() => handleNav('about')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            About Us & CEO Note
          </button>
          <button
            onClick={() => handleNav('verification')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Certificate Verification
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact Us
          </button>

          <div className="pt-3 border-t border-slate-200 space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-3 mb-1">
              Portals & Management
            </div>
            <button
              onClick={() => handleNav('student-portal')}
              className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              Student Portal (Status & Certificate)
            </button>
            <button
              onClick={() => handleNav('school-portal')}
              className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              School Portal (Approval & Students)
            </button>
            <button
              onClick={() => handleNav(isAdminLoggedIn ? 'ceo-dashboard' : 'admin-login')}
              className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200"
            >
              {isAdminLoggedIn ? 'Open CEO Dashboard' : 'CEO / Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
