import client from './client';

// 1. Tambah data penimbangan baru (MOCK)
export async function addTimbangan(data) {
  return { 
    success: true, 
    data: { 
      id: Date.now(), 
      tanggal_timbang: new Date().toISOString(), 
      ...data 
    } 
  };
}

// 2. Ambil semua riwayat penimbangan (MOCK)
export async function getAllTimbangan() {
  return {
    success: true,
    data: [
      { id: 1, nama_sapi: "Bima", rfid: "RFID-12345", berat_kg: 450.5, status_kesehatan: "Sehat", jenis_sapi: "Brahman", umur_bulan: 24, tanggal_timbang: new Date(Date.now() - 86400000).toISOString() },
      { id: 2, nama_sapi: "Seno", rfid: "RFID-67890", berat_kg: 512.0, status_kesehatan: "Sehat", jenis_sapi: "Limousin", umur_bulan: 30, tanggal_timbang: new Date().toISOString() }
    ]
  };
}

// 3. Ambil data penimbangan berdasarkan ID (MOCK)
export async function getTimbanganById(id) {
  return { 
    success: true, 
    data: { 
      id, nama_sapi: "Bima", rfid: "RFID-12345", berat_kg: 450.5, status_kesehatan: "Sehat", jenis_sapi: "Brahman", umur_bulan: 24, tanggal_timbang: new Date().toISOString() 
    } 
  };
}

// 4. Perbarui data penimbangan (MOCK)
export async function updateTimbangan(id, data) {
  return { success: true, data: { id, ...data } };
}

// 5. Hapus data penimbangan (MOCK)
export async function deleteTimbangan(id) {
  return { success: true, message: "Data berhasil dihapus (MOCK)" };
}

// 6. Download Rekapitulasi Excel secara aman (MOCK)
export async function downloadExcel(startDate, endDate) {
  alert("Mode Simulasi: Fitur unduh Excel dimatikan sementara karena API backend belum di-deploy.");
}

// 7. Download Sertifikat Word secara aman (MOCK)
export async function downloadWord(id, namaSapi) {
  alert("Mode Simulasi: Fitur unduh Sertifikat Word dimatikan sementara karena API backend belum di-deploy.");
}
