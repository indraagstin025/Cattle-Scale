import { useState, useRef, useEffect } from 'react';

export function useWebSerial() {
  const [isConnected, setIsConnected] = useState(false);
  const [serialWeight, setSerialWeight] = useState(0);
  const [error, setError] = useState(null);
  
  const portRef = useRef(null);
  const readerRef = useRef(null);
  const keepReadingRef = useRef(false);

  // Fungsi untuk membersihkan dan mem-parsing data serial
  const parseSerialData = (text) => {
    // Cari angka desimal dalam teks (misal: "512.4" atau "W: 512.4 Kg")
    const match = text.match(/[-+]?[0-9]*\.?[0-9]+/);
    if (match) {
      const value = parseFloat(match[0]);
      if (!isNaN(value)) {
        setSerialWeight(value);
      }
    }
  };

  const connectSerial = async () => {
    setError(null);

    if (!('serial' in navigator)) {
      setError('Browser Anda tidak mendukung Web Serial API. Gunakan Chrome, Edge, atau Opera.');
      return false;
    }

    try {
      // Minta izin akses port USB dari user
      const port = await navigator.serial.requestPort();
      portRef.current = port;

      // Buka port dengan baudrate standar
      await port.open({ baudRate: 9600 });
      setIsConnected(true);
      keepReadingRef.current = true;

      // Mulai loop pembacaan di background
      readLoop(port);
      return true;
    } catch (err) {
      console.error('Koneksi Serial Gagal:', err);
      setError(err.message || 'Gagal terhubung ke perangkat USB.');
      setIsConnected(false);
      return false;
    }
  };

  const readLoop = async (port) => {
    let buffer = '';
    const decoder = new TextDecoder();

    while (port.readable && keepReadingRef.current) {
      try {
        const reader = port.readable.getReader();
        readerRef.current = reader;

        while (keepReadingRef.current) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          
          // Dekode teks dan tambahkan ke buffer
          buffer += decoder.decode(value, { stream: true });
          
          // Jika menemukan karakter baris baru (CR/LF), proses baris lengkap
          if (buffer.includes('\n') || buffer.includes('\r')) {
            const lines = buffer.split(/[\r\n]+/);
            // Simpan sisa baris terakhir yang belum lengkap kembali ke buffer
            buffer = lines.pop(); 
            
            // Proses baris yang paling baru selesai
            if (lines.length > 0) {
              const latestLine = lines[lines.length - 1].trim();
              if (latestLine) {
                parseSerialData(latestLine);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error saat membaca data serial:', err);
        // Jangan crash, coba lakukan reset koneksi
        break;
      } finally {
        if (readerRef.current) {
          readerRef.current.releaseLock();
          readerRef.current = null;
        }
      }
    }

    // Jika keluar dari loop secara tidak normal, bersihkan state
    if (keepReadingRef.current) {
      disconnectSerial();
    }
  };

  const disconnectSerial = async () => {
    keepReadingRef.current = false;

    // Hentikan pembaca
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
      } catch (e) {
        // Abaikan
      }
    }

    // Tutup Port
    if (portRef.current) {
      try {
        await portRef.current.close();
      } catch (e) {
        // Abaikan
      }
      portRef.current = null;
    }

    setIsConnected(false);
  };

  // Bersihkan koneksi saat komponen unmount
  useEffect(() => {
    return () => {
      keepReadingRef.current = false;
      if (readerRef.current) {
        readerRef.current.cancel().catch(() => {});
      }
    };
  }, []);

  return {
    isConnected,
    serialWeight,
    error,
    connectSerial,
    disconnectSerial
  };
}
