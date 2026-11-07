import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { store } from '../../services/store';
import { School, TrainingMode } from '../../types';
import { 
  Building2, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  School as SchoolIcon
} from 'lucide-react';

interface SchoolRegistrationPageProps {
  onNavigate: (page: PageId) => void;
  onSchoolRegistered?: (school: School) => void;
}

export const SchoolRegistrationPage: React.FC<SchoolRegistrationPageProps> = ({
  onNavigate,
  onSchoolRegistered
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('CBSE');
  const [principalName, setPrincipalName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [approxStudents, setApproxStudents] = useState<number>(600);
  const [interestedProgram, setInterestedProgram] = useState('14-Day Student Development Program');
  const [preferredMode, setPreferredMode] = useState<TrainingMode>('Offline');

  const [registeredSchool, setRegisteredSchool] = useState<School | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !principalName.trim() || !contactPerson.trim() || !contactNumber.trim() || !email.trim() || !city.trim() || !state.trim()) {
      setErrorMsg('Please fill in all mandatory school fields.');
      return;
    }

    const newSchool = store.registerSchool({
      name: name.trim(),
      type,
      principalName: principalName.trim(),
      contactPerson: contactPerson.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      approxStudents: Number(approxStudents) || 100,
      interestedProgram,
      preferredMode
    });

    setRegisteredSchool(newSchool);
    if (onSchoolRegistered) {
      onSchoolRegistered(newSchool);
    }
  };

  const handleCopyId = () => {
    if (registeredSchool) {
      navigator.clipboard.writeText(registeredSchool.id);
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
            <Building2 className="w-4 h-4" />
            <span>School Institutional Partnership Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Register Your School With HYPER LEARNX
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Partner with HYPER LEARNX to bring the 14-Day Student Development Program to your campus. Complete offline workshop deployment or hybrid cohort for your batches.
          </p>
        </div>

        {/* Success Confirmation Modal */}
        {registeredSchool ? (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/50 p-6 sm:p-8 shadow-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                School Registration Submitted!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your school has been registered in the HYPER LEARNX system. Use your official School ID below to sign in to the School Partner Portal.
              </p>
            </div>

            {/* Generated School ID Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase block">
                  Official School Partner ID
                </span>
                <span className="text-xl font-mono font-extrabold text-indigo-950">
                  {registeredSchool.id}
                </span>
              </div>
              <button
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copiedId ? 'Copied to Clipboard!' : 'Copy School ID'}</span>
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">School Name</span>
                <strong className="text-slate-900 truncate block">{registeredSchool.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Affiliation</span>
                <span className="text-slate-800">{registeredSchool.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Principal</span>
                <span className="text-slate-800">{registeredSchool.principalName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Contact Person</span>
                <span className="text-slate-800">{registeredSchool.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Preferred Mode</span>
                <span className="text-slate-800 font-semibold text-indigo-700">{registeredSchool.preferredMode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Approval Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Pending CEO Review
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => onNavigate('school-portal')}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Go to School Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setRegisteredSchool(null);
                  setName('');
                  setPrincipalName('');
                  setContactPerson('');
                }}
                className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center"
              >
                Register Another School
              </button>
            </div>
          </div>
        ) : (
          /* School Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* School Profile */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
                1. School Institutional Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official School Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. St. Xavier's Senior Secondary School"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Board / Affiliation Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="CBSE">CBSE (Central Board)</option>
                    <option value="ICSE">ICSE / ISC</option>
                    <option value="IB / Cambridge">IB / Cambridge International</option>
                    <option value="State Board">State Secondary Education Board</option>
                    <option value="Private Independent">Private Independent / Academy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Principal&apos;s Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    placeholder="e.g. Dr. Anita Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Approximate Students in School <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    required
                    value={approxStudents}
                    onChange={(e) => setApproxStudents(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Training Mode <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={preferredMode}
                    onChange={(e) => setPreferredMode(e.target.value as TrainingMode)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Offline">In-Campus Offline Workshop (Trainers Visit School)</option>
                    <option value="Online">Live Interactive Online Cohort</option>
                    <option value="Hybrid">Hybrid (Online Drills + Weekend Auditorium Showcase)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Person & Address */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
                2. Contact Person & Campus Location
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Contact Person Name & Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Mr. Rajesh Mehra (Academic Coordinator)"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official School Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="principal@school.edu"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Program <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={interestedProgram}
                    onChange={(e) => setInterestedProgram(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="14-Day Student Development Program">14-Day Student Development Program (Flagship)</option>
                    <option value="Weekend Public Speaking & Debate Mastery">Weekend Public Speaking & Debate Mastery</option>
                    <option value="Junior Leaders & Innovation Lab">Junior Leaders & Innovation Lab</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School Campus Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Sector 12, R.K. Puram"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
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
                    placeholder="e.g. New Delhi, Mumbai"
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
                    placeholder="e.g. Delhi, Maharashtra"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Submit School Registration & Generate School ID</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
