import client from './client';

// 1. Tambah data penimbangan baru
export async function addTimbangan(data) {
  const response = await client.post('/timbangan', data);
  return response.data;
}

// 2. Ambil semua riwayat penimbangan
export async function getAllTimbangan() {
  const response = await client.get('/timbangan');
  return response.data;
}

// 3. Ambil data penimbangan berdasarkan ID
export async function getTimbanganById(id) {
  const response = await client.get(`/timbangan/${id}`);
  return response.data;
}

// 4. Perbarui data penimbangan
export async function updateTimbangan(id, data) {
  const response = await client.put(`/timbangan/${id}`, data);
  return response.data;
}

// 5. Hapus data penimbangan
export async function deleteTimbangan(id) {
  const response = await client.delete(`/timbangan/${id}`);
  return response.data;
}

// 6. Download Rekapitulasi Excel secara aman (mengirimkan header JWT)
export async function downloadExcel(startDate, endDate) {
  const response = await client.get(`/timbangan/ekspor/excel`, {
    params: { start_date: startDate, end_date: endDate },
    responseType: 'blob' // Wajib blob untuk file binary
  });

  // Trik trigger download browser
  const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `rekap-timbangan-${startDate}-ke-${endDate}.xlsx`);
  document.body.appendChild(link);
  link.click();
  
  // Bersihkan
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// 7. Download Sertifikat Word secara aman (mengirimkan header JWT)
export async function downloadWord(id, namaSapi) {
  const response = await client.get(`/timbangan/ekspor/word/${id}`, {
    responseType: 'blob'
  });

  const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `sertifikat-${namaSapi.toUpperCase()}-${id}.docx`);
  document.body.appendChild(link);
  link.click();

  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}
