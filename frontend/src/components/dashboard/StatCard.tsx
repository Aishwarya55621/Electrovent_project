import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { MotorStatus } from '@/types/motor';

interface StatCardProps {
  title: string;
  value: number;
  variant?: 'default' | MotorStatus;
}

const variantStyles: Record<string, string> = {
  default: 'border-l-primary',
  normal: 'border-l-status-normal',
  warning: 'border-l-status-warning',
  critical: 'border-l-status-critical',
};

const valueStyles: Record<string, string> = {
  default: 'text-foreground',
  normal: 'text-status-normal',
  warning: 'text-status-warning',
  critical: 'text-status-critical',
};

export function StatCard({ title, value, variant = 'default' }: StatCardProps) {
  return (
    <Card className={cn('border-l-4 shadow-card', variantStyles[variant])}>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className={cn('text-3xl font-bold mt-1', valueStyles[variant])}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
