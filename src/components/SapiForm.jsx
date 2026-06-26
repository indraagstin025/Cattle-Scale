import React, { useState } from 'react';
import { Save, Loader } from 'lucide-react';

const BREEDS = [
  'Limousin',
  'Simental',
  'Ongole',
  'PO',
  'Bali',
  'Madura',
  'Lainnya'
];

export default function SapiForm({ onSubmit, activeWeight, isSubmitting }) {
  const [namaSapi, setNamaSapi] = useState('');
  const [umurBulan, setUmurBulan] = useState('');
  const [jenisRumpun, setJenisRumpun] = useState('Limousin');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!namaSapi.trim()) {
      setError('Nama sapi wajib diisi.');
      return;
    }

    if (!umurBulan || parseInt(umurBulan) <= 0) {
      setError('Umur sapi harus berupa angka positif.');
      return;
    }

    if (activeWeight <= 0) {
      setError('Berat sapi harus lebih besar dari 0 Kg.');
      return;
    }

    onSubmit({
      nama_sapi: namaSapi.toUpperCase(),
      umur_bulan: parseInt(umurBulan),
      jenis_rumpun: jenisRumpun,
      berat_kg: activeWeight
    });

    // Reset Form setelah simpan sukses
    setNamaSapi('');
    setUmurBulan('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-5">
      
      <div>
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Registrasi Identitas Sapi</h2>
        <p className="text-xs text-slate-500">Masukkan identitas lengkap ternak untuk mengunci data berat aktual saat ini.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Nama Sapi */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Sapi / Tag ID</label>
          <input
            type="text"
            required
            placeholder="CONTOH: BETO"
            value={namaSapi}
            onChange={(e) => setNamaSapi(e.target.value.toUpperCase())}
            className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
          />
        </div>

        {/* Umur Sapi */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Umur (Bulan)</label>
          <input
            type="number"
            required
            min="1"
            placeholder="CONTOH: 24"
            value={umurBulan}
            onChange={(e) => setUmurBulan(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all"
          />
        </div>

        {/* Jenis Rumpun */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jenis Rumpun Sapi</label>
          <select
            value={jenisRumpun}
            onChange={(e) => setJenisRumpun(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all cursor-pointer"
          >
            {BREEDS.map((breed) => (
              <option key={breed} value={breed} className="bg-slate-900">
                {breed}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {/* Tombol Simpan */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover-scale focus:outline-none transition-all shadow-lg shadow-blue-500/10"
      >
        {isSubmitting ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        <span>Kunci & Simpan Data</span>
      </button>

    </form>
  );
}
