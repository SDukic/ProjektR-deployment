// src/api/axios.js
import axios from 'axios';

// Kreirajte instancu Axios-a
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Postavite svoju osnovnu URL adresu servera
});

// Dodajte Interceptor za slanje tokena s svakim zahtjevom
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Dobijte token iz localStorage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Dodajte token u Authorization header
    }

    console.log(token);

    return config; // Vratite konfiguraciju nakon dodavanja tokena
  },
  (error) => {
    return Promise.reject(error); // Ako je došlo do greške u interceptoru
  }
);

export default api;
