import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8001';

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const authAPI = {
  register: (data: { email: string; name: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getUser: (userId: string) =>
    api.get(`/auth/user/${userId}`),
};

// Subjects
export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getOne: (id: string) => api.get(`/subjects/${id}`),
};

// Simulations
export const simulationsAPI = {
  getAll: (subjectId?: string) =>
    api.get('/simulations', { params: subjectId ? { subject_id: subjectId } : {} }),
  getOne: (id: string) => api.get(`/simulations/${id}`),
};

// Progress
export const progressAPI = {
  update: (userId: string, data: { simulation_id: string; completed: boolean; score: number; time_spent: number }) =>
    api.post(`/progress?user_id=${userId}`, data),
  getUserProgress: (userId: string) => api.get(`/progress/${userId}`),
  getUserStats: (userId: string) => api.get(`/progress/${userId}/stats`),
};

// Chat
export const chatAPI = {
  send: (data: { user_id: string; message: string; subject?: string; simulation_id?: string }) =>
    api.post('/chat', data),
  getHistory: (userId: string, limit?: number) =>
    api.get(`/chat/history/${userId}`, { params: limit ? { limit } : {} }),
  clearHistory: (userId: string) => api.delete(`/chat/history/${userId}`),
};
