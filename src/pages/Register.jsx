import React, { useState } from 'react';
import { Scale, Loader, ArrowLeft } from 'lucide-react';

export default function Register({ registerOperator, onNavigateToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setIsLoading(true);

    try {
      await registerOperator(username, password);
      setSuccess('Pendaftaran berhasil! Mengalihkan ke halaman login...');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Pendaftaran operator gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

      {/* Register Card */}
      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-blue-600/20 text-blue-500 rounded-2xl border border-blue-500/30">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">DAFTAR OPERATOR</h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-1">Sistem Timbangan Sapi Portable</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Username</label>
            <input
              type="text"
              required
              placeholder="Pilih username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Password (Min. 6 Karakter)</label>
            <input
              type="password"
              required
              placeholder="Buat password minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Konfirmasi Password</label>
            <input
              type="password"
              required
              placeholder="Ketik ulang password Anda"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl leading-relaxed">
              ✅ {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover-scale focus:outline-none transition-all mt-2"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <span>Daftar Sekarang</span>
            )}
          </button>
        </form>

        {/* Back to Login Redirect Link */}
        <div className="text-center pt-2 border-t border-slate-800/80">
          <button
            onClick={onNavigateToLogin}
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Masuk</span>
          </button>
        </div>

      </div>
    </div>
  );
}
