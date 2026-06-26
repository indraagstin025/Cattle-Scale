import React, { useState } from 'react';
import { Scale, Loader, ArrowRight } from 'lucide-react';

export default function Login({ loginOperator, onLoginSuccess, onNavigateToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await loginOperator(username, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa username dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-blue-600/20 text-blue-500 rounded-2xl border border-blue-500/30">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">MASUK OPERATOR</h1>
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
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl leading-relaxed">
              ⚠️ {error}
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
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Sign-up Redirect Link */}
        <div className="text-center pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Belum terdaftar?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-all focus:outline-none"
            >
              Buat Akun Baru
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
