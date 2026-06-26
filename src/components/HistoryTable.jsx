import React, { useState, useMemo } from 'react';
import { Search, FileSpreadsheet, FileText, Trash2, Calendar, UserCheck } from 'lucide-react';

export default function HistoryTable({
  dataList,
  onDelete,
  onDownloadWord,
  onDownloadExcel
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Hitung default rentang tanggal: 30 hari terakhir s/d hari ini
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Filter data berdasarkan nama sapi (search) dan rentang tanggal
  const filteredList = useMemo(() => {
    return dataList.filter(item => {
      const matchSearch = item.nama_sapi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.jenis_rumpun.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Ambil tanggal YYYY-MM-DD dari ISO String tanggal_timbang
      const itemDate = item.tanggal_timbang.split('T')[0];
      const matchDate = itemDate >= startDate && itemDate <= endDate;
      
      return matchSearch && matchDate;
    });
  }, [dataList, searchTerm, startDate, endDate]);

  const handleExportExcel = () => {
    if (!startDate || !endDate) {
      alert('Tentukan rentang tanggal awal dan akhir terlebih dahulu.');
      return;
    }
    onDownloadExcel(startDate, endDate);
  };

  // Helper formatting tanggal lokal
  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-5">
      
      {/* Header & Aksi Utama */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Riwayat & Ekspor Laporan</h2>
          <p className="text-xs text-slate-500">Gunakan filter untuk mencari data atau mengekspor rekapitulasi data ke format Excel.</p>
        </div>

        {/* Tombol Ekspor Excel */}
        <button
          onClick={handleExportExcel}
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 hover-scale focus:outline-none transition-all shadow-lg shadow-emerald-500/10"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Ekspor Excel (.xlsx)
        </button>
      </div>

      {/* Filter Kontrol Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kolom Pencarian */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder="Cari Sapi / Rumpun..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none transition-all"
          />
        </div>

        {/* Tanggal Mulai */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1">
          <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <div className="flex flex-col flex-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Mulai Tanggal</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        {/* Tanggal Akhir */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3 py-1">
          <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <div className="flex flex-col flex-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Hingga Tanggal</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
      </div>

      {/* Kontainer Tabel */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-900/20">
        <table className="w-full border-collapse text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 text-center">No</th>
              <th className="py-3.5 px-4">Tanggal Timbang</th>
              <th className="py-3.5 px-4">Nama Sapi</th>
              <th className="py-3.5 px-4">Rumpun</th>
              <th className="py-3.5 px-4 text-center">Umur (Bln)</th>
              <th className="py-3.5 px-4 text-right">Berat (Kg)</th>
              <th className="py-3.5 px-4 text-right">ADG (Kg/Hari)</th>
              <th className="py-3.5 px-4 text-right">Proyeksi (Kg)</th>
              <th className="py-3.5 px-4"><div className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Operator</div></th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredList.length > 0 ? (
              filteredList.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-4 text-slate-400 font-medium whitespace-nowrap">{formatTime(row.tanggal_timbang)}</td>
                  <td className="py-3 px-4 font-bold text-white tracking-wide">{row.nama_sapi}</td>
                  <td className="py-3 px-4 text-slate-300">{row.jenis_rumpun}</td>
                  <td className="py-3 px-4 text-center font-medium">{row.umur_bulan}</td>
                  <td className="py-3 px-4 text-right font-bold text-white">{row.berat_kg.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-400">+{row.adg.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-medium text-slate-400">{row.prediksi_berat_30_hari.toFixed(1)}</td>
                  <td className="py-3 px-4 text-slate-400 font-semibold">{row.nama_operator || 'Petugas'}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Unduh Word */}
                      <button
                        onClick={() => onDownloadWord(row.id, row.nama_sapi)}
                        title="Unduh Sertifikat Word"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-600 transition-all focus:outline-none"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      {/* Hapus Baris */}
                      <button
                        onClick={() => {
                          if (confirm(`Apakah Anda yakin ingin menghapus data timbangan sapi ${row.nama_sapi}?`)) {
                            onDelete(row.id);
                          }
                        }}
                        title="Hapus Record"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-red-600 border border-slate-700 hover:border-red-600 transition-all focus:outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-10 text-center text-sm text-slate-500 italic">
                  Belum ada data penimbangan pada filter atau rentang tanggal yang dipilih.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
