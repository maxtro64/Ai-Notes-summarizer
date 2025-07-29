// src/services/api.js

const API_BASE_URL = '/api/notes';

// Helper function to handle API requests
const fetchApi = async (endpoint, method, body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Notes API Services
export const notesService = {
  // Summarize text
  summarize: async (text, complexity, token) => {
    return fetchApi('/summarize', 'POST', { text, complexity }, token);
  },

  // Get all notes for authenticated user
  getAllNotes: async (token) => {
    return fetchApi('', 'GET', null, token);
  },

  // Get single note by ID
  getNoteById: async (id, token) => {
    return fetchApi(`/${id}`, 'GET', null, token);
  },

  // Update a note
  updateNote: async (id, updates, token) => {
    return fetchApi(`/${id}`, 'PUT', updates, token);
  },

  // Delete a note
  deleteNote: async (id, token) => {
    return fetchApi(`/${id}`, 'DELETE', null, token);
  },
};

// Auth API Services
export const authService = {
  // User login
  login: async (email, password) => {
    return fetchApi('/auth/login', 'POST', { email, password });
  },

  // User registration
  register: async (name, email, password) => {
    return fetchApi('/auth/register', 'POST', { name, email, password });
  },

  // Get current user profile
  getProfile: async (token) => {
    return fetchApi('/auth/me', 'GET', null, token);
  },
};

// Export all services
export default {
  notes: notesService,
  auth: authService,
};