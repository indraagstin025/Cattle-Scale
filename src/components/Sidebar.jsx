import React from 'react';
import { Scale, LogOut, User, Wifi, Usb, AlertTriangle } from 'lucide-react';

export default function Sidebar({
  user,
  onLogout,
  usbConnected,
  wifiConnected,
  onConnectUsb,
  onDisconnectUsb,
  onConnectWifi,
  onDisconnectWifi,
  serialError,
  wsError
}) {
  return (
    <aside className="w-80 h-screen glass-panel flex flex-col justify-between p-6 border-r border-slate-800">
      
      {/* Header & Logo */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-2.5 bg-blue-600/20 text-blue-500 rounded-xl border border-blue-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white">TIMBANGAN SAPI</h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wider">PORTABLE SMART SYSTEM</p>
          </div>
        </div>

        {/* Panel Info Operator */}
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
            <User className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-slate-400 font-medium">Operator Aktif</p>
            <p className="text-sm font-semibold text-white truncate">{user ? user.username : 'Petugas'}</p>
          </div>
        </div>

        {/* Panel Kontrol Koneksi Hardware */}
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Integrasi Hardware</h2>
          
          {/* Koneksi USB Serial */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Usb className={`w-4.5 h-4.5 ${usbConnected ? 'text-green-500' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-300">USB Serial (ESP32)</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${usbConnected ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
            </div>
            
            {usbConnected ? (
              <button
                onClick={onDisconnectUsb}
                className="w-full py-2 px-3 text-xs font-bold text-red-400 hover:text-white bg-red-950/20 hover:bg-red-600 border border-red-500/20 hover:border-red-600 rounded-lg transition-all"
              >
                Putuskan Sambungan USB
              </button>
            ) : (
              <button
                onClick={onConnectUsb}
                className="w-full py-2 px-3 text-xs font-bold text-blue-400 hover:text-white bg-blue-950/20 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-600 rounded-lg transition-all"
              >
                Hubungkan USB Serial
              </button>
            )}
            
            {serialError && (
              <div className="flex items-start gap-1.5 text-amber-500 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] leading-tight font-medium">{serialError}</p>
              </div>
            )}
          </div>

          {/* Koneksi WiFi WebSocket */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/50 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wifi className={`w-4.5 h-4.5 ${wifiConnected ? 'text-green-500' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold text-slate-300">WiFi WebSocket</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${wifiConnected ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
            </div>
            
            {wifiConnected ? (
              <button
                onClick={onDisconnectWifi}
                className="w-full py-2 px-3 text-xs font-bold text-red-400 hover:text-white bg-red-950/20 hover:bg-red-600 border border-red-500/20 hover:border-red-600 rounded-lg transition-all"
              >
                Putuskan Sambungan WiFi
              </button>
            ) : (
              <button
                onClick={onConnectWifi}
                className="w-full py-2 px-3 text-xs font-bold text-green-400 hover:text-white bg-green-950/20 hover:bg-green-600 border border-green-500/20 hover:border-green-600 rounded-lg transition-all"
              >
                Hubungkan WiFi Local
              </button>
            )}
            
            {wsError && (
              <div className="flex items-start gap-1.5 text-amber-500 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] leading-tight font-medium">{wsError}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Logout */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all border border-transparent hover:border-slate-800"
        >
          <LogOut className="w-4 h-4" />
          Keluar Aplikasi
        </button>
        <p className="text-[10px] text-center text-slate-500">v1.0.0 © Peternakan Sapi Portable</p>
      </div>

    </aside>
  );
}
