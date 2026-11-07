import React from 'react';
import { Certificate } from '../types';
import { Award, CheckCircle2, ShieldCheck, Printer, Download } from 'lucide-react';

interface CertificateViewProps {
  certificate: Certificate;
  onClose?: () => void;
  showPrintAction?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  onClose,
  showPrintAction = true
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      {showPrintAction && (
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-200 mb-6 no-print">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-slate-800">Authentic HYPER LEARNX Credential</span>
            <span>·</span>
            <span className="font-mono text-xs">{certificate.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* Printable Certificate Canvas */}
      <div
        id="printable-certificate"
        className="relative w-full bg-white border-8 border-double border-slate-900 p-8 sm:p-12 text-center shadow-lg rounded-sm overflow-hidden"
        style={{ minHeight: '620px' }}
      >
        {/* Subtle decorative background watermarks */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Certificate Header */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-lg tracking-wider">
              HLX
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 font-display">
              HYPER LEARNX
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-700 font-semibold mb-6">
            Academy for Future-Ready Skills & Leadership
          </p>

          <div className="inline-block border-y-2 border-slate-900 py-1 px-8 mb-6">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-wide uppercase">
              Certificate of Excellence
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mb-2">
            This certifies that the candidate has successfully completed the rigorous practical, activity-based training and met all performance assessments.
          </p>

          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-mono">
            Proudly Presented To
          </p>

          {/* Student Name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mb-1 border-b-2 border-indigo-200 pb-2 px-8 inline-block">
            {certificate.studentName}
          </h1>

          <p className="text-sm font-medium text-slate-700 mt-2 mb-4">
            of <span className="font-semibold text-slate-900">{certificate.schoolName}</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-6">
            for exemplary dedication, active peer collaboration, and outstanding demonstration of essential life skills in the{' '}
            <strong className="text-indigo-950 font-semibold">{certificate.programName}</strong>.
          </p>

          {/* Grade and Score Highlight */}
          <div className="inline-flex items-center gap-6 py-2 px-6 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 mb-8">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Honors / Grade</span>
              <span className="font-bold text-indigo-900">{certificate.grade}</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Assessment Score</span>
              <span className="font-bold text-slate-900 font-mono tabular-nums">{certificate.score} / 100</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Completion Date</span>
              <span className="font-medium text-slate-800">{certificate.completionDate}</span>
            </div>
          </div>

          {/* Footer with Signatures and Official Emblem */}
          <div className="w-full grid grid-cols-3 items-end pt-4 border-t border-slate-200 text-xs">
            {/* Signature 1 */}
            <div className="flex flex-col items-center">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-lg text-slate-800 tracking-wider">
                  Nisha K. Rao
                </span>
              </div>
              <div className="w-32 border-b border-slate-400 mb-1" />
              <span className="font-semibold text-slate-800">Nisha Rao</span>
              <span className="text-[10px] text-slate-500">Chief Executive Officer</span>
              <span className="text-[9px] text-slate-400">HYPER LEARNX</span>
            </div>

            {/* Official Center Gold Emblem */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-400 text-amber-700 flex flex-col items-center justify-center p-1 shadow-sm">
                <Award className="w-7 h-7 text-amber-600" />
                <span className="text-[7px] font-bold tracking-widest uppercase text-amber-800">VERIFIED</span>
              </div>
              <span className="font-mono text-[9px] text-slate-400 mt-2">
                ID: {certificate.id}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="flex flex-col items-center">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-lg text-slate-800 tracking-wider">
                  Dr. Arvind Roy
                </span>
              </div>
              <div className="w-32 border-b border-slate-400 mb-1" />
              <span className="font-semibold text-slate-800">Dr. Arvind Roy</span>
              <span className="text-[10px] text-slate-500">Academic & Pedagogy Director</span>
              <span className="text-[9px] text-slate-400">HYPER LEARNX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
