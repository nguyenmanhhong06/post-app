import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://192.168.1.104:8080/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  withCredentials: true,
});
