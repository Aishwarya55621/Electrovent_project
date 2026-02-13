import { useState, useMemo } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MotorsTable } from '@/components/dashboard/MotorsTable';
import { mockMotors, mockDashboardStats } from '@/services/mockData';
import type { Motor } from '@/types/motor';

export default function Dashboard() {
  // In production, this would come from motorsApi.getAll() and dashboardApi.getStats()
  const [motors] = useState<Motor[]>(mockMotors);
  const stats = useMemo(() => mockDashboardStats, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your motor fleet health status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Motors" value={stats.total} />
        <StatCard title="Healthy" value={stats.healthy} variant="normal" />
        <StatCard title="Warning" value={stats.warning} variant="warning" />
        <StatCard title="Critical" value={stats.critical} variant="critical" />
      </div>

      {/* Motors Table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Motor Status</h2>
        <MotorsTable motors={motors} />
      </div>
    </div>
  );
}
