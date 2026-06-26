import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import LiveWeightCard from '../components/LiveWeightCard';
import SapiForm from '../components/SapiForm';
import WeightChart from '../components/WeightChart';
import HistoryTable from '../components/HistoryTable';

import { useWebSerial } from '../hooks/useWebSerial';
import { useWebSocketLive } from '../hooks/useWebSocketLive';
import { getAllTimbangan, addTimbangan, deleteTimbangan, downloadExcel, downloadWord } from '../api/timbangan';

import { Beef, Database, Calendar, Menu } from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  // 1. Integrasi Hardware Hooks
  const usb = useWebSerial();
  const wifi = useWebSocketLive();

  // 2. State Utama Dashboard
  const [simulationMode, setSimulationMode] = useState(true); // Default awal simulasi agar bisa dicoba langsung
  const [simulationWeight, setSimulationWeight] = useState(350); // Default berat simulasi awal
  const [weighingList, setWeighingList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 3. Muat Data Riwayat dari Database saat mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getAllTimbangan();
      if (res.success) {
        setWeighingList(res.data);
      }
    } catch (err) {
      console.error('Fetch history failed:', err);
      setErrorMsg('Gagal memuat data riwayat penimbangan.');
    }
  };

  // 4. Auto Nonaktifkan Simulasi jika USB atau WiFi Terkoneksi
  useEffect(() => {
    if (usb.isConnected || wifi.isConnected) {
      setSimulationMode(false);
    }
  }, [usb.isConnected, wifi.isConnected]);

  // 5. Kalkulasi Berat Aktif Berdasarkan Sumber
  const activeWeight = useMemo(() => {
    if (simulationMode) return simulationWeight;
    if (usb.isConnected) return usb.serialWeight;
    if (wifi.isConnected) return wifi.wsWeight;
    return 0.0;
  }, [simulationMode, simulationWeight, usb.isConnected, usb.serialWeight, wifi.isConnected, wifi.wsWeight]);

  const isHardwareConnected = usb.isConnected || wifi.isConnected;

  // 6. Handler Aksi
  const handleSaveWeighing = async (formData) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await addTimbangan(formData);
      if (res.success) {
        setSuccessMsg(`Berhasil menyimpan data timbangan sapi ${res.data.nama_sapi}!`);
        // Tambahkan data baru di awal daftar riwayat
        setWeighingList(prev => [res.data, ...prev]);
        
        // Hapus pesan sukses otomatis setelah 4 detik
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error('Save failed:', err);
      setErrorMsg(err.response?.data?.message || 'Gagal menyimpan data penimbangan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const res = await deleteTimbangan(id);
      if (res.success) {
        setWeighingList(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      setErrorMsg('Gagal menghapus data.');
    }
  };

  const handleDownloadExcel = async (startDate, endDate) => {
    try {
      await downloadExcel(startDate, endDate);
    } catch (err) {
      console.error('Export Excel failed:', err);
      alert('Gagal mendownload laporan Excel.');
    }
  };

  const handleDownloadWord = async (id, namaSapi) => {
    try {
      await downloadWord(id, namaSapi);
    } catch (err) {
      console.error('Export Word failed:', err);
      alert('Gagal mendownload sertifikat Word.');
    }
  };

  // 7. Hitung Statistik Ringkasan Atas
  const summaryStats = useMemo(() => {
    const totalCows = new Set(weighingList.map(i => i.nama_sapi)).size;
    const weights = weighingList.map(i => i.berat_kg);
    const avgWeight = weights.length > 0 ? (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1) : 0;
    
    // Timbangan hari ini
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = weighingList.filter(i => i.tanggal_timbang.split('T')[0] === todayStr).length;

    return { totalCows, avgWeight, todayCount };
  }, [weighingList]);

  return (
    <div className="w-screen h-screen flex bg-slate-950 overflow-hidden text-slate-100">
      
      {/* Sidebar Panel */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        usbConnected={usb.isConnected}
        wifiConnected={wifi.isConnected}
        onConnectUsb={usb.connectSerial}
        onDisconnectUsb={usb.disconnectSerial}
        onConnectWifi={wifi.connectWebSocket}
        onDisconnectWifi={wifi.disconnectWebSocket}
        serialError={usb.error}
        wsError={wifi.error}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 h-screen overflow-y-auto p-8 flex flex-col gap-6">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-5 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/60 text-white hover:bg-slate-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-3xl text-2xl font-extrabold text-white tracking-tight">DASHBOARD UTAMA</h1>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-1">Panel Monitoring Timbangan Sapi Portable</p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-400 font-semibold">
            Tanggal Hari Ini: <span className="text-white font-mono">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Notifikasi Alert */}
        {successMsg && (
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-2xl animate-pulse">
            ✅ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-red-950/20 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Baris Statistik Ringkasan Atas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4 hover-scale">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-500/10">
              <Beef className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Populasi Sapi</p>
              <p className="text-2xl font-extrabold text-white mt-1">{summaryStats.totalCows} Ekor</p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4 hover-scale">
            <div className="p-3 bg-emerald-600/10 text-emerald-500 rounded-xl border border-emerald-500/10">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rata-rata Berat Populasi</p>
              <p className="text-2xl font-extrabold text-white mt-1">{summaryStats.avgWeight} Kg</p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center gap-4 hover-scale">
            <div className="p-3 bg-amber-600/10 text-amber-500 rounded-xl border border-amber-500/10">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Pengukuran Hari Ini</p>
              <p className="text-2xl font-extrabold text-white mt-1">{summaryStats.todayCount} Kali</p>
            </div>
          </div>

        </div>

        {/* Tengah Atas: Timbangan Real-time & Form Identitas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <LiveWeightCard
            activeWeight={activeWeight}
            simulationMode={simulationMode}
            onToggleSimulation={() => setSimulationMode(!simulationMode)}
            onManualWeightChange={setSimulationWeight}
            isConnected={isHardwareConnected}
          />
          <SapiForm
            onSubmit={handleSaveWeighing}
            activeWeight={activeWeight}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Tengah: Grafik Tren Pertumbuhan Sapi */}
        <div>
          <WeightChart dataList={weighingList} />
        </div>

        {/* Bawah: Riwayat Tabel */}
        <div>
          <HistoryTable
            dataList={weighingList}
            onDelete={handleDeleteRecord}
            onDownloadWord={handleDownloadWord}
            onDownloadExcel={handleDownloadExcel}
          />
        </div>

      </main>
    </div>
  );
}
