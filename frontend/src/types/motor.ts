export type MotorStatus = 'normal' | 'warning' | 'critical';

export interface Motor {
  id: string;
  name: string;
  location: string;
  type?: string;
  temperature: number;
  vibration: number;
  torque: number;
  status: MotorStatus;
  lastUpdated: string;
}

export interface MotorReading {
  timestamp: string;
  temperature: number;
  vibration: number;
  torque: number;
}

export interface Anomaly {
  id: string;
  motorId: string;
  type: string;
  severity: MotorStatus;
  description: string;
  detectedAt: string;
}

export interface Alert {
  id: string;
  motorId: string;
  motorName: string;
  severity: MotorStatus;
  alertType: string;
  timestamp: string;
  ticketStatus: 'open' | 'resolved';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardStats {
  total: number;
  healthy: number;
  warning: number;
  critical: number;
}
