import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { mockAlerts } from '@/services/mockData';
import type { Alert, MotorStatus } from '@/types/motor';

const severityConfig: Record<MotorStatus, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'status-normal' },
  warning: { label: 'Warning', className: 'status-warning' },
  critical: { label: 'Critical', className: 'status-critical' },
};

const ticketStatusConfig: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-primary text-primary-foreground' },
  resolved: { label: 'Resolved', className: 'bg-muted text-muted-foreground' },
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

export default function Alerts() {
  // In production, this would come from alertsApi.getAll()
  const [alerts] = useState<Alert[]>(mockAlerts);

  const openCount = alerts.filter((a) => a.ticketStatus === 'open').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Alerts & Tickets</h1>
        <p className="text-muted-foreground mt-1">
          {openCount} open {openCount === 1 ? 'ticket' : 'tickets'} requiring attention
        </p>
      </div>

      <div className="rounded-lg border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Motor</TableHead>
              <TableHead className="font-semibold">Alert Type</TableHead>
              <TableHead className="font-semibold">Severity</TableHead>
              <TableHead className="font-semibold">Timestamp</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => {
              const severity = severityConfig[alert.severity];
              const ticketStatus = ticketStatusConfig[alert.ticketStatus];
              return (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.motorName}</TableCell>
                  <TableCell>{alert.alertType}</TableCell>
                  <TableCell>
                    <Badge className={cn('font-medium', severity.className)}>
                      {severity.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(alert.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('font-medium', ticketStatus.className)}>
                      {ticketStatus.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
