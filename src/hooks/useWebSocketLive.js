import { useState, useRef, useEffect } from 'react';

export function useWebSocketLive() {
  const [isConnected, setIsConnected] = useState(false);
  const [wsWeight, setWsWeight] = useState(0);
  const [error, setError] = useState(null);
  
  const wsRef = useRef(null);

  const connectWebSocket = () => {
    setError(null);

    try {
      // Menghubungkan ke server WebSocket backend
      const ws = new WebSocket('ws://localhost:5000');
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        console.log('🔌 WebSocket terhubung ke backend timbangan.');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && typeof data.berat_kg === 'number') {
            setWsWeight(data.berat_kg);
          }
        } catch (e) {
          // Abaikan jika pesan bukan JSON berat
          console.warn('Pesan WS non-JSON:', event.data);
        }
      };

      ws.onerror = (err) => {
        console.error('Koneksi WebSocket Error:', err);
        setError('Gagal terhubung ke WebSocket Server.');
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('🔌 Koneksi WebSocket terputus.');
      };
      
      return true;
    } catch (err) {
      setError(err.message || 'Gagal membuka koneksi WebSocket.');
      setIsConnected(false);
      return false;
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  };

  // Bersihkan koneksi saat unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    isConnected,
    wsWeight,
    error,
    connectWebSocket,
    disconnectWebSocket
  };
}
