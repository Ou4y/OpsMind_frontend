import axios from 'axios';

// This sets up the base connection to your backend
export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Matches your server.ts PORT
});