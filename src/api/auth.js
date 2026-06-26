import client from './client';

/**
 * Melakukan login operator
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export async function login(username, password) {
  const response = await client.post('/auth/login', { username, password });
  return response.data;
}

/**
 * Melakukan registrasi operator baru
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export async function register(username, password) {
  const response = await client.post('/auth/register', { username, password });
  return response.data;
}
