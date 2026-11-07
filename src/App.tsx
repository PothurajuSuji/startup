/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { OurSkillsPage } from './components/pages/OurSkillsPage';
import { ProgramsPage } from './components/pages/ProgramsPage';
import { StudentRegistrationPage } from './components/pages/StudentRegistrationPage';
import { SchoolRegistrationPage } from './components/pages/SchoolRegistrationPage';
import { StudentPortalPage } from './components/pages/StudentPortalPage';
import { SchoolPortalPage } from './components/pages/SchoolPortalPage';
import { CertificateVerificationPage } from './components/pages/CertificateVerificationPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { AdminLoginPage } from './components/pages/AdminLoginPage';
import { CEODashboardPage } from './components/pages/CEODashboardPage';
import { store } from './services/store';
import { Student, School, Program, Certificate, CEODashboardStats } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('hlx_ceo_auth') === 'true';
  });

  const [students, setStudents] = useState<Student[]>(() => store.getStudents());
  const [schools, setSchools] = useState<School[]>(() => store.getSchools());
  const [programs, setPrograms] = useState<Program[]>(() => store.getPrograms());
  const [certificates, setCertificates] = useState<Certificate[]>(() => store.getCertificates());
  const [stats, setStats] = useState<CEODashboardStats>(() => store.getDashboardStats());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setStudents(store.getStudents());
      setSchools(store.getSchools());
      setPrograms(store.getPrograms());
      setCertificates(store.getCertificates());
      setStats(store.getDashboardStats());
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (page: PageId) => {
    if (page === 'ceo-dashboard' && !isAdminLoggedIn) {
      setCurrentPage('admin-login');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('hlx_ceo_auth', 'true');
    setCurrentPage('ceo-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('hlx_ceo_auth');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} stats={stats} />
        )}

        {currentPage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'skills' && (
          <OurSkillsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage programs={programs} onNavigate={handleNavigate} />
        )}

        {currentPage === 'student-register' && (
          <StudentRegistrationPage
            schools={schools}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'school-register' && (
          <SchoolRegistrationPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'student-portal' && (
          <StudentPortalPage
            students={students}
            certificates={certificates}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'school-portal' && (
          <SchoolPortalPage
            schools={schools}
            students={students}
            certificates={certificates}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'verification' && (
          <CertificateVerificationPage
            certificates={certificates}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'ceo-dashboard' && (
          <CEODashboardPage
            stats={stats}
            students={students}
            schools={schools}
            programs={programs}
            certificates={certificates}
            onNavigate={handleNavigate}
            onLogoutAdmin={handleAdminLogout}
          />
        )}
      </main>

      {/* Global Footer (except on CEO Dashboard to maximize workspace presence) */}
      {currentPage !== 'ceo-dashboard' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
