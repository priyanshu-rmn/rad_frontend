import axios from 'axios';

// const BACKEND_URL = 'https://e78ee7df-8847-4452-bd42-7b77577e8c2d.mock.pstmn.io';
const BACKEND_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
