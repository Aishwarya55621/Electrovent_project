import type { Motor, MotorReading, Anomaly, Alert, DashboardStats } from '@/types/motor';

export const mockMotors: Motor[] = [
  {
    id: '1',
    name: 'Motor A-101',
    location: 'Production Line 1',
    type: 'Induction Motor',
    temperature: 45.2,
    vibration: 2.1,
    torque: 125.5,
    status: 'normal',
    lastUpdated: '2026-01-31T10:30:00Z',
  },
  {
    id: '2',
    name: 'Motor A-102',
    location: 'Production Line 1',
    type: 'Synchronous Motor',
    temperature: 62.8,
    vibration: 4.5,
    torque: 98.2,
    status: 'warning',
    lastUpdated: '2026-01-31T10:28:00Z',
  },
  {
    id: '3',
    name: 'Motor B-201',
    location: 'Production Line 2',
    type: 'Induction Motor',
    temperature: 78.5,
    vibration: 8.2,
    torque: 45.8,
    status: 'critical',
    lastUpdated: '2026-01-31T10:29:00Z',
  },
  {
    id: '4',
    name: 'Motor B-202',
    location: 'Production Line 2',
    type: 'DC Motor',
    temperature: 41.0,
    vibration: 1.8,
    torque: 150.3,
    status: 'normal',
    lastUpdated: '2026-01-31T10:30:00Z',
  },
  {
    id: '5',
    name: 'Motor C-301',
    location: 'Assembly Unit',
    type: 'Servo Motor',
    temperature: 38.5,
    vibration: 1.2,
    torque: 85.0,
    status: 'normal',
    lastUpdated: '2026-01-31T10:30:00Z',
  },
  {
    id: '6',
    name: 'Motor C-302',
    location: 'Assembly Unit',
    type: 'Stepper Motor',
    temperature: 55.3,
    vibration: 3.8,
    torque: 72.4,
    status: 'warning',
    lastUpdated: '2026-01-31T10:27:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  total: 6,
  healthy: 3,
  warning: 2,
  critical: 1,
};

export function generateMockReadings(motorId: string): MotorReading[] {
  const readings: MotorReading[] = [];
  const now = new Date();
  const baseTemp = motorId === '3' ? 70 : motorId === '2' ? 55 : 40;
  const baseVib = motorId === '3' ? 6 : motorId === '2' ? 3.5 : 1.5;
  const baseTorque = motorId === '3' ? 50 : motorId === '2' ? 90 : 120;

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    readings.push({
      timestamp: timestamp.toISOString(),
      temperature: baseTemp + Math.random() * 15 - 5,
      vibration: baseVib + Math.random() * 3 - 1,
      torque: baseTorque + Math.random() * 30 - 15,
    });
  }

  return readings;
}

export const mockAnomalies: Record<string, Anomaly[]> = {
  '2': [
    {
      id: 'a1',
      motorId: '2',
      type: 'Temperature Spike',
      severity: 'warning',
      description: 'Temperature exceeded normal operating range',
      detectedAt: '2026-01-31T08:15:00Z',
    },
  ],
  '3': [
    {
      id: 'a2',
      motorId: '3',
      type: 'High Vibration',
      severity: 'critical',
      description: 'Vibration levels indicate potential bearing failure',
      detectedAt: '2026-01-31T09:45:00Z',
    },
    {
      id: 'a3',
      motorId: '3',
      type: 'Overheating',
      severity: 'critical',
      description: 'Motor temperature critically high',
      detectedAt: '2026-01-31T10:00:00Z',
    },
  ],
};

export const mockAlerts: Alert[] = [
  {
    id: 'al1',
    motorId: '3',
    motorName: 'Motor B-201',
    severity: 'critical',
    alertType: 'Bearing Failure Risk',
    timestamp: '2026-01-31T09:45:00Z',
    ticketStatus: 'open',
  },
  {
    id: 'al2',
    motorId: '3',
    motorName: 'Motor B-201',
    severity: 'critical',
    alertType: 'Overheating',
    timestamp: '2026-01-31T10:00:00Z',
    ticketStatus: 'open',
  },
  {
    id: 'al3',
    motorId: '2',
    motorName: 'Motor A-102',
    severity: 'warning',
    alertType: 'Temperature Warning',
    timestamp: '2026-01-31T08:15:00Z',
    ticketStatus: 'open',
  },
  {
    id: 'al4',
    motorId: '6',
    motorName: 'Motor C-302',
    severity: 'warning',
    alertType: 'Vibration Anomaly',
    timestamp: '2026-01-30T14:30:00Z',
    ticketStatus: 'resolved',
  },
  {
    id: 'al5',
    motorId: '1',
    motorName: 'Motor A-101',
    severity: 'warning',
    alertType: 'Scheduled Maintenance',
    timestamp: '2026-01-29T09:00:00Z',
    ticketStatus: 'resolved',
  },
];
