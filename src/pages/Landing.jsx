import React from 'react';
import { ArrowRight, Activity, Cloud, ShieldCheck, Scale, Database, Beef } from 'lucide-react';

export default function Landing({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30 font-sans">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-xl shadow-lg shadow-blue-500/20">
            <Scale className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Cattle<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Scale</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onNavigateToLogin}
            className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-300"
          >
            Masuk
          </button>
          <button 
            onClick={onNavigateToRegister}
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600/10 border border-blue-500/30 rounded-full hover:bg-blue-600 hover:border-transparent transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
          >
            Daftar Gratis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Sistem Monitoring IoT Aktif</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Timbangan Sapi Digital <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400">
            Cerdas & Akurat.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Pantau pertumbuhan ternak Anda secara real-time dengan integrasi perangkat IoT (USB & WiFi). Kelola data dengan mudah, hasilkan laporan otomatis, dan tingkatkan produktivitas peternakan Anda.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={onNavigateToLogin}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all duration-300 hover:-translate-y-1"
          >
            Mulai Dashboard 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-slate-900/50 border-t border-slate-800/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fitur Unggulan</h2>
            <p className="text-slate-400">Semua yang Anda butuhkan untuk manajemen bobot ternak yang efisien.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <Activity className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Koneksi Real-time</h3>
              <p className="text-slate-400 leading-relaxed">
                Tarik data langsung dari alat timbangan (Loadcell) secara real-time melalui koneksi Web Serial (USB) maupun WebSocket (WiFi).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                <Database className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Manajemen Populasi</h3>
              <p className="text-slate-400 leading-relaxed">
                Catat identitas sapi, jenis, dan pantau grafik tren pertumbuhannya dari waktu ke waktu secara komprehensif.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-colors duration-300 group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-amber-500/20">
                <Cloud className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ekspor Laporan</h3>
              <p className="text-slate-400 leading-relaxed">
                Hasilkan laporan rekapitulasi data berbentuk Excel atau cetak langsung Sertifikat Penimbangan berformat Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-slate-800/60 bg-slate-950 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Cattle-Scale IoT Project. Dirancang untuk peternakan modern.</p>
      </footer>
      
    </div>
  );
}
