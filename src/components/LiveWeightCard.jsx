import React from 'react';
import { ToggleLeft, ToggleRight, Sparkles, Radio } from 'lucide-react';

export default function LiveWeightCard({
  activeWeight,
  simulationMode,
  onToggleSimulation,
  onManualWeightChange,
  isConnected
}) {
  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isConnected 
        ? 'glass-panel border-green-500/30 glow-active-green' 
        : simulationMode
          ? 'glass-panel border-blue-500/30 glow-active'
          : 'glass-panel border-slate-800'
    }`}>
      
      {/* Header Card */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-wider bg-green-950/20 py-1.5 px-3 rounded-full border border-green-500/20">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Sensor IoT Aktif
            </div>
          ) : simulationMode ? (
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider bg-blue-950/20 py-1.5 px-3 rounded-full border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              Mode Simulasi
            </div>
          ) : (
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/60 py-1.5 px-3 rounded-full border border-slate-800">
              Menunggu Koneksi
            </div>
          )}
        </div>

        {/* Toggle Mode Simulasi */}
        <button
          onClick={onToggleSimulation}
          className="flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-slate-300 hover:text-white transition-colors"
        >
          <span>Simulasi</span>
          {simulationMode ? (
            <ToggleRight className="w-8 h-8 text-blue-500" />
          ) : (
            <ToggleLeft className="w-8 h-8 text-slate-500" />
          )}
        </button>
      </div>

      {/* Main Display Weight */}
      <div className="flex flex-col items-center justify-center py-10 relative">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Berat Aktif Ternak</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-extrabold text-8xl tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {activeWeight.toFixed(1)}
            </span>
            <span className="text-3xl font-extrabold text-slate-400 tracking-wider">Kg</span>
          </div>
        </div>
      </div>

      {/* Input Slider (Hanya jika Mode Simulasi Aktif) */}
      {simulationMode && (
        <div className="mt-4 pt-5 border-t border-slate-800/80 flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
            <span>Sesuaikan Berat Simulasi</span>
            <span className="text-blue-400 font-mono text-sm">{activeWeight.toFixed(1)} Kg</span>
          </div>
          <input
            type="range"
            min="50"
            max="1200"
            step="0.5"
            value={activeWeight}
            onChange={(e) => onManualWeightChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] font-semibold text-slate-500">
            <span>Min: 50 Kg</span>
            <span>Max: 1200 Kg</span>
          </div>
        </div>
      )}

    </div>
  );
}
