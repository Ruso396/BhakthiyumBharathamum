import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const registerParticipant = async (formData: FormData) => {
  const response = await api.post('/api/register.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const loginAdmin = async (username: string, password: string) => {
  const response = await api.post('/api/login.php', { username, password });
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get('/api/dashboard.php');
  return response.data;
};

export const getParticipants = async (params?: Record<string, string>) => {
  const response = await api.get('/api/get_participants.php', { params });
  return response.data;
};

export const getParticipant = async (id: number) => {
  const response = await api.get('/api/get_participant.php', { params: { id } });
  return response.data;
};

export const updateParticipant = async (formData: FormData) => {
  const response = await api.post('/api/update_participant.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteParticipant = async (id: number) => {
  const response = await api.post('/api/delete_participant.php', { id });
  return response.data;
};

export const updatePaymentStatus = async (id: number, payment_status: string) => {
  const response = await api.post('/api/update_payment_status.php', { id, payment_status });
  return response.data;
};

export const getUploadUrl = (filename: string) => {
  return `${API_BASE}/uploads/payment/${filename}`;
};

export default api;