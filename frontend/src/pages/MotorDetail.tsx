import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Thermometer, Activity, MapPin, Clock, Gauge } from 'lucide-react';
import { MotorChart } from '@/components/motor/MotorChart';
import { AnomalyList } from '@/components/motor/AnomalyList';
import { mockMotors, generateMockReadings, mockAnomalies } from '@/services/mockData';
import { cn } from '@/lib/utils';
import type { MotorStatus } from '@/types/motor';

const statusConfig: Record<MotorStatus, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'status-normal' },
  warning: { label: 'Warning', className: 'status-warning' },
  critical: { label: 'Critical', className: 'status-critical' },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MotorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In production, this would come from motorsApi.getById(), getReadings(), getAnomalies()
  const motor = mockMotors.find((m) => m.id === id);
  const readings = useMemo(() => (id ? generateMockReadings(id) : []), [id]);
  const anomalies = id ? mockAnomalies[id] || [] : [];

  if (!motor) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Motor not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const status = statusConfig[motor.status];

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/dashboard')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{motor.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {motor.location}
            </span>
            {motor.type && <span>• {motor.type}</span>}
          </div>
        </div>
        <Badge className={cn('text-sm px-3 py-1', status.className)}>
          {status.label}
        </Badge>
      </div>

      {/* Current Readings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <Thermometer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-xl font-bold">{motor.temperature.toFixed(1)}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vibration</p>
                <p className="text-xl font-bold">{motor.vibration.toFixed(2)} mm/s</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <Gauge className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Torque</p>
                <p className="text-xl font-bold">{motor.torque.toFixed(1)} Nm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">{formatDate(motor.lastUpdated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MotorChart
          title="Temperature vs Time"
          data={readings}
          dataKey="temperature"
          unit="°C"
          color="hsl(0, 72%, 51%)"
        />
        <MotorChart
          title="Vibration vs Time"
          data={readings}
          dataKey="vibration"
          unit=" mm/s"
          color="hsl(215, 50%, 23%)"
        />
        <MotorChart
          title="Torque vs Time"
          data={readings}
          dataKey="torque"
          unit=" Nm"
          color="hsl(142, 71%, 45%)"
        />
      </div>

      {/* Anomalies */}
      <AnomalyList anomalies={anomalies} />
    </div>
  );
}
