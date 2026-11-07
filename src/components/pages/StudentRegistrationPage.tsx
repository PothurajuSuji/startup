import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { store } from '../../services/store';
import { School, Student } from '../../types';
import { 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  ArrowRight, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface StudentRegistrationPageProps {
  schools: School[];
  onNavigate: (page: PageId) => void;
  onStudentRegistered?: (student: Student) => void;
}

export const StudentRegistrationPage: React.FC<StudentRegistrationPageProps> = ({
  schools,
  onNavigate,
  onStudentRegistered
}) => {
  const [fullName, setFullName] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [customSchoolName, setCustomSchoolName] = useState('');
  const [grade, setGrade] = useState('Class 9');
  const [section, setSection] = useState('A');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [programName, setProgramName] = useState('14-Day Student Development Program');
  const [parentConsent, setParentConsent] = useState(false);

  const [registeredStudent, setRegisteredStudent] = useState<Student | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !parentName.trim() || !parentContact.trim() || !city.trim() || !state.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!parentConsent) {
      setErrorMsg('Parent or legal guardian consent is required for student registration.');
      return;
    }

    let finalSchoolName = customSchoolName.trim();
    let finalSchoolId = 'CUSTOM';

    if (selectedSchoolId && selectedSchoolId !== 'other') {
      const found = schools.find(s => s.id === selectedSchoolId);
      if (found) {
        finalSchoolName = found.name;
        finalSchoolId = found.id;
      }
    }

    if (!finalSchoolName) {
      setErrorMsg('Please specify the school name.');
      return;
    }

    const newStudent = store.registerStudent({
      name: fullName.trim(),
      schoolId: finalSchoolId,
      schoolName: finalSchoolName,
      grade,
      section: section.trim() || undefined,
      parentName: parentName.trim(),
      parentContact: parentContact.trim(),
      email: email.trim() || undefined,
      city: city.trim(),
      state: state.trim(),
      programId: 'HLX-PROG-14D-01',
      programName,
      parentConsent: true
    });

    setRegisteredStudent(newStudent);
    if (onStudentRegistered) {
      onStudentRegistered(newStudent);
    }
  };

  const handleCopyId = () => {
    if (registeredStudent) {
      navigator.clipboard.writeText(registeredStudent.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span>Student Registration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Register for the 14-Day Student Development Program
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Practical life skills, public speaking, leadership, and emotional intelligence training for school students in Grades 5 to 12.
          </p>
        </div>

        {/* Success Confirmation Modal / Card */}
        {registeredStudent ? (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/50 p-6 sm:p-8 shadow-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Registration Successful!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your application has been received by HYPER LEARNX. Save your unique Student ID to track course progress and access your certificate.
              </p>
            </div>

            {/* Generated Student ID Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase block">
                  Your Unique Student ID
                </span>
                <span className="text-xl font-mono font-extrabold text-indigo-950">
                  {registeredStudent.id}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedId ? 'Copied to Clipboard!' : 'Copy Student ID'}</span>
              </button>
            </div>

            {/* Registration Details Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Student</span>
                <strong className="text-slate-900">{registeredStudent.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Class & Section</span>
                <span className="text-slate-800">{registeredStudent.grade} {registeredStudent.section ? `(${registeredStudent.section})` : ''}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">School</span>
                <span className="text-slate-800 truncate block" title={registeredStudent.schoolName}>{registeredStudent.schoolName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Parent / Guardian</span>
                <span className="text-slate-800">{registeredStudent.parentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Contact</span>
                <span className="text-slate-800 font-mono">{registeredStudent.parentContact}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Initial Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Pending CEO Approval
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('student-portal')}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Go to Student Portal to Check Progress</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setRegisteredStudent(null);
                  setFullName('');
                  setParentName('');
                  setParentContact('');
                }}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center"
              >
                Register Another Student
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Student Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
                1. Student Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Selection <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedSchoolId}
                    onChange={(e) => setSelectedSchoolId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">-- Choose from Registered Schools --</option>
                    {schools.map(sch => (
                      <option key={sch.id} value={sch.id}>
                        {sch.name} ({sch.city})
                      </option>
                    ))}
                    <option value="other">Other School (Enter Below)</option>
                  </select>
                </div>

                {(!selectedSchoolId || selectedSchoolId === 'other') ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={!selectedSchoolId || selectedSchoolId === 'other'}
                      value={customSchoolName}
                      onChange={(e) => setCustomSchoolName(e.target.value)}
                      placeholder="e.g. Modern High School"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School Status
                    </label>
                    <div className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-emerald-700 font-medium">
                      ✓ Registered Partner School
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Class / Grade <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section (Optional)
                  </label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="e.g. A, B, Green House"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Parent/Guardian & Contact */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
                2. Parent / Guardian Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent / Guardian Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent Contact Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentContact}
                    onChange={(e) => setParentContact(e.target.value)}
                    placeholder="+91 98100 12345"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program Selection <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="14-Day Student Development Program">14-Day Student Development Program (Flagship)</option>
                    <option value="Weekend Public Speaking & Debate Mastery">Weekend Public Speaking & Debate Mastery (6 Days)</option>
                    <option value="Junior Leaders & Innovation Lab">Junior Leaders & Innovation Lab (10 Days)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi, Bengaluru"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Delhi, Karnataka, Maharashtra"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Parental Consent & Child Protection */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Parental Consent & Child Data Protection Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                As our students may be minors, HYPER LEARNX strictly protects their personal information. Data is used exclusively for program coordination, attendance, and issuing authentic certificates. It will never be sold or shared with third-party advertisers.
              </p>
              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={parentConsent}
                  onChange={(e) => setParentConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="font-medium">
                  I confirm that I am the parent/legal guardian of this student and consent to their participation in the HYPER LEARNX 14-Day Student Development Program. <span className="text-rose-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Complete Registration & Generate Student ID</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
