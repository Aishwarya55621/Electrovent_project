import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Anomaly, MotorStatus } from '@/types/motor';

interface AnomalyListProps {
  anomalies: Anomaly[];
}

const severityConfig: Record<MotorStatus, { className: string; icon: typeof AlertTriangle }> = {
  normal: { className: 'status-normal', icon: AlertCircle },
  warning: { className: 'status-warning', icon: AlertTriangle },
  critical: { className: 'status-critical', icon: AlertTriangle },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AnomalyList({ anomalies }: AnomalyListProps) {
  if (anomalies.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Detected Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No anomalies detected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Detected Anomalies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {anomalies.map((anomaly) => {
          const config = severityConfig[anomaly.severity];
          const Icon = config.icon;
          return (
            <div
              key={anomaly.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border"
            >
              <Icon className={cn('h-5 w-5 mt-0.5', {
                'text-status-normal': anomaly.severity === 'normal',
                'text-status-warning': anomaly.severity === 'warning',
                'text-status-critical': anomaly.severity === 'critical',
              })} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{anomaly.type}</span>
                  <Badge className={cn('text-xs', config.className)}>
                    {anomaly.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(anomaly.detectedAt)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
