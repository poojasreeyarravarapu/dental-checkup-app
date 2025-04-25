import axios from 'axios';

// Update the baseURL to point to the deployed backend
const API = axios.create({ baseURL: 'https://dental-backend-5b4m.onrender.com/api' });

export default API;