import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Award } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WeightChart({ dataList }) {
  // Ambil daftar unik nama sapi
  const uniqueCows = useMemo(() => {
    const names = dataList.map(item => item.nama_sapi);
    return [...new Set(names)];
  }, [dataList]);

  // State untuk sapi yang dipilih (default: sapi pertama jika ada)
  const [selectedCow, setSelectedCow] = useState(() => {
    return uniqueCows.length > 0 ? uniqueCows[0] : '';
  });

  // Sinkronisasi selectedCow jika dataList berubah
  React.useEffect(() => {
    if (uniqueCows.length > 0 && !uniqueCows.includes(selectedCow)) {
      setSelectedCow(uniqueCows[0]);
    } else if (uniqueCows.length === 0) {
      setSelectedCow('');
    }
  }, [uniqueCows, selectedCow]);

  // Filter data berdasarkan sapi terpilih, urutkan berdasarkan tanggal tertua ke terbaru
  const filteredData = useMemo(() => {
    if (!selectedCow) return [];
    return dataList
      .filter(item => item.nama_sapi === selectedCow)
      .sort((a, b) => new Date(a.tanggal_timbang) - new Date(b.tanggal_timbang));
  }, [dataList, selectedCow]);

  // Perhitungan statistik sederhana sapi terpilih
  const stats = useMemo(() => {
    if (filteredData.length === 0) return { currentWeight: 0, totalGain: 0, latestADG: 0 };
    const latest = filteredData[filteredData.length - 1];
    const first = filteredData[0];
    
    return {
      currentWeight: latest.berat_kg,
      totalGain: latest.berat_kg - first.berat_kg,
      latestADG: latest.adg
    };
  }, [filteredData]);

  // Konfigurasi Data Chart.js
  const chartData = {
    labels: filteredData.map(item => {
      const d = new Date(item.tanggal_timbang);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear().toString().substr(-2)}`;
    }),
    datasets: [
      {
        label: `Berat Sapi ${selectedCow} (Kg)`,
        data: filteredData.map(item => item.berat_kg),
        borderColor: '#3b82f6', // Brand blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#0f172a',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  // Konfigurasi Opsi Chart.js
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Sembunyikan legenda karena judul sudah jelas
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { family: 'Inter', size: 12, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 12 },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `Berat: ${context.parsed.y} Kg`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 10 }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 10 },
          callback: (value) => `${value} Kg`
        }
      }
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col gap-6 h-full">
      
      {/* Header Chart */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Visualisasi Tren Berat</h2>
        </div>

        {/* Dropdown Filter Sapi */}
        {uniqueCows.length > 0 ? (
          <select
            value={selectedCow}
            onChange={(e) => setSelectedCow(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl py-2 px-3 focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
          >
            {uniqueCows.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        ) : (
          <span className="text-xs text-slate-500 italic">Belum ada data</span>
        )}
      </div>

      {/* Chart Display Area */}
      <div className="flex-1 min-h-[250px] relative">
        {filteredData.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500 italic border border-dashed border-slate-800/80 rounded-xl">
            Pilih sapi untuk menampilkan grafik pertumbuhan
          </div>
        )}
      </div>

      {/* Mini Stats Display */}
      {filteredData.length > 0 && (
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-5">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Berat Terkini</p>
            <p className="text-lg font-bold text-white mt-1">{stats.currentWeight} Kg</p>
          </div>
          <div className="text-center border-x border-slate-800">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Kenaikan</p>
            <p className={`text-lg font-bold mt-1 ${stats.totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.totalGain >= 0 ? '+' : ''}{stats.totalGain.toFixed(1)} Kg
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">ADG Terakhir</p>
            <p className="text-lg font-bold text-green-400 mt-1 flex items-center justify-center gap-1">
              <Award className="w-4.5 h-4.5 text-blue-500" />
              {stats.latestADG} <span className="text-[10px] text-slate-400 font-medium">Kg/Hari</span>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
