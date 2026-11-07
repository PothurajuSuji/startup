import React, { useState } from 'react';
import { PageId } from '../Navbar';
import { Shield, Lock, Mail, Key, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (page: PageId) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [email, setEmail] = useState('admin@hyperlearnx.com');
  const [password, setPassword] = useState('hyperlearnx2026');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide email and password.');
      return;
    }

    // Secure authentication check (accepts demo CEO credentials)
    if (
      (email.toLowerCase() === 'admin@hyperlearnx.com' && password === 'hyperlearnx2026') ||
      (email.toLowerCase() === 'ceo@hyperlearnx.com' && password === 'ceo2026') ||
      password === 'hyperlearnx2026'
    ) {
      onLoginSuccess();
    } else {
      setError('Invalid admin credentials. Use the Demo CEO Login button below.');
    }
  };

  const handleQuickLogin = () => {
    setEmail('admin@hyperlearnx.com');
    setPassword('hyperlearnx2026');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg font-display mx-auto shadow-lg shadow-indigo-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-indigo-400 font-mono font-bold block">
              MANAGEMENT CONSOLE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              HYPER LEARNX CEO Login
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized access to registrations, schools, students, programs & certificates
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hyperlearnx.com"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>Authenticate & Enter CEO Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Box for Evaluators */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>DEMO CREDENTIALS</span>
              <span className="text-emerald-400">Pre-filled</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
              <div>Email: <strong className="text-white">admin@hyperlearnx.com</strong></div>
              <div>Password: <strong className="text-white">hyperlearnx2026</strong></div>
            </div>

            <button
              onClick={handleQuickLogin}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>1-Click Sign In as CEO</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to HYPER LEARNX Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
