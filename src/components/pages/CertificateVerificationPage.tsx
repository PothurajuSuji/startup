import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { Certificate } from '../../types';
import { CertificateView } from '../CertificateView';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Building2, 
  Calendar,
  Lock
} from 'lucide-react';

interface CertificateVerificationPageProps {
  certificates: Certificate[];
  onNavigate: (page: PageId) => void;
}

export const CertificateVerificationPage: React.FC<CertificateVerificationPageProps> = ({
  certificates,
  onNavigate
}) => {
  const [query, setQuery] = useState('HLX-CERT-2026-8821');
  const [searchedCert, setSearchedCert] = useState<Certificate | null>(() => {
    return certificates[0] || null;
  });
  const [searched, setSearched] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    const found = certificates.find(c => 
      c.id.toLowerCase() === clean || 
      c.studentId.toLowerCase() === clean
    );
    setSearchedCert(found || null);
    setSearched(true);
  };

  const handleSelectSample = (id: string) => {
    setQuery(id);
    const found = certificates.find(c => c.id.toLowerCase() === id.toLowerCase());
    setSearchedCert(found || null);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Credential Verification Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Verify HYPER LEARNX Certificate Authenticity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            All certificates issued by HYPER LEARNX carry a unique identifier recorded in our master registry. Enter the Certificate ID or Student ID below to verify.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Certificate ID (e.g. HLX-CERT-2026-8821)"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
            >
              Verify Certificate
            </button>
          </form>

          {/* Quick Click Sample IDs */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-700">Sample Valid Certificate IDs:</span>
            {certificates.slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectSample(c.id)}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-slate-200 cursor-pointer"
              >
                {c.id} ({c.studentName})
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result */}
        {searched && (
          <div>
            {searchedCert ? (
              <div className="space-y-6">
                {/* Official Verification Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                          Official Certificate Verified
                        </h3>
                        <span className="text-[10px] font-mono bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          AUTHENTIC RECORD
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        This credential is an authentic, untampered record registered in the HYPER LEARNX official database.
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-emerald-900 font-mono shrink-0">
                    <div>Status: <span className="font-bold text-emerald-700">{searchedCert.status}</span></div>
                    <div>Fingerprint: <span className="text-slate-500">{searchedCert.verifierHash}</span></div>
                  </div>
                </div>

                {/* Render the full verifiable Certificate Component */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <CertificateView certificate={searchedCert} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Certificate Not Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No certificate matching &ldquo;{query}&rdquo; exists in the HYPER LEARNX registry. Please check the ID or contact support.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
