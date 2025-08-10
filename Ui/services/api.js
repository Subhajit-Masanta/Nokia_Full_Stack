import axios from 'axios';

const API_BASE_URL = /*process.env.REACT_APP_API_URL ||*/ 'http://localhost:5000/api';

const api = axios.create({ /// Creates an axios instance with default settings
  baseURL: API_BASE_URL, // This is the base URL for the API requests
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json' // Sets the default content type for requests , we are using json here
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const chartAPI = {
  getWeeklyData: () => api.get('/weekly-chart'), //makes get request to /weekly-chart endpoint
  getMonthlyData: () => api.get('/monthly-chart'),

  // getCategoryBreakdown: () => api.get('/category-breakdown')
};

export default api;
