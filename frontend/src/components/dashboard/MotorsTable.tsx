import { useNavigate } from 'react-router-dom';
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
import type { Motor, MotorStatus } from '@/types/motor';

interface MotorsTableProps {
  motors: Motor[];
}

const statusConfig: Record<MotorStatus, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'status-normal' },
  warning: { label: 'Warning', className: 'status-warning' },
  critical: { label: 'Critical', className: 'status-critical' },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function MotorsTable({ motors }: MotorsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border bg-card shadow-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Motor Name</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold text-right">Temp (°C)</TableHead>
            <TableHead className="font-semibold text-right">Vibration (mm/s)</TableHead>
            <TableHead className="font-semibold text-right">Torque (Nm)</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {motors.map((motor) => {
            const status = statusConfig[motor.status];
            return (
              <TableRow
                key={motor.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => navigate(`/motors/${motor.id}`)}
              >
                <TableCell className="font-medium">{motor.name}</TableCell>
                <TableCell className="text-muted-foreground">{motor.location}</TableCell>
                <TableCell className="text-right font-mono">
                  {motor.temperature.toFixed(1)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {motor.vibration.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {motor.torque.toFixed(1)}
                </TableCell>
                <TableCell>
                  <Badge className={cn('font-medium', status.className)}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(motor.lastUpdated)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
