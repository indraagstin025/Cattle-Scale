import client from './client';

/**
 * Melakukan login operator (MOCK untuk Vercel)
 */
export async function login(username, password) {
  return { 
    success: true,
    token: "dummy_token_123", 
    user: { id: 1, username: username } 
  };
}

/**
 * Melakukan registrasi operator baru (MOCK untuk Vercel)
 */
export async function register(username, password) {
  return { success: true, message: "Pendaftaran berhasil (MOCK)" };
}
