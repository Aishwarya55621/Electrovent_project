import type { Motor, MotorReading, Anomaly, Alert, DashboardStats, ChatMessage } from '@/types/motor';

// API base URL - will be configured when backend is connected
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Generic fetch wrapper for API calls
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // When backend is connected, uncomment this:
  // const response = await fetch(url, config);
  // if (!response.ok) {
  //   throw new Error(`API Error: ${response.statusText}`);
  // }
  // return response.json();

  // For now, return mock data
  console.log(`API Request: ${options.method || 'GET'} ${url}`);
  throw new Error('API not connected - using mock data');
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ token: string; user: { email: string; name: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  logout: async () => {
    return apiRequest<void>('/auth/logout', { method: 'POST' });
  },
};

// Motors API
export const motorsApi = {
  getAll: async () => {
    return apiRequest<Motor[]>('/motors');
  },
  getById: async (id: string) => {
    return apiRequest<Motor>(`/motors/${id}`);
  },
  create: async (data: Omit<Motor, 'id' | 'temperature' | 'vibration' | 'status' | 'lastUpdated'>) => {
    return apiRequest<Motor>('/motors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getReadings: async (id: string, timeRange?: string) => {
    const params = timeRange ? `?range=${timeRange}` : '';
    return apiRequest<MotorReading[]>(`/motors/${id}/readings${params}`);
  },
  getAnomalies: async (id: string) => {
    return apiRequest<Anomaly[]>(`/motors/${id}/anomalies`);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async () => {
    return apiRequest<DashboardStats>('/dashboard/stats');
  },
};

// Alerts API
export const alertsApi = {
  getAll: async () => {
    return apiRequest<Alert[]>('/alerts');
  },
  updateStatus: async (id: string, status: 'open' | 'resolved') => {
    return apiRequest<Alert>(`/alerts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ ticketStatus: status }),
    });
  },
};

// Chatbot API
export const chatbotApi = {
  sendMessage: async (message: string, conversationHistory: ChatMessage[]) => {
    return apiRequest<{ message: string }>('/chatbot/message', {
      method: 'POST',
      body: JSON.stringify({ message, history: conversationHistory }),
    });
  },
};
