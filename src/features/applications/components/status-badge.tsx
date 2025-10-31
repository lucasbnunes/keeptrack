import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Application, Status } from '@prisma/client';

const STATUS_MAP: { [K in Application['status']]: string } = {
  applied: 'Applied',
  offer_received: 'Offer Received',
  hired: 'Hired',
  offer_refused: 'Offer Refused',
  not_selected: 'Not selected',
};

const COLOR_CLASSES: { [K in Status]: string } = {
  applied: 'bg-teal-200 text-teal-900',
  not_selected: 'bg-red-200 text-red-900',
  offer_received: 'bg-blue-200 text-blue-900',
  offer_refused: 'bg-purple-200 text-purple-900',
  hired: 'bg-green-200 text-green-900',
};

interface StatusBadgeProps extends React.ComponentProps<typeof Badge> {
  status: Status;
}
export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <Badge
      {...props}
      className={cn(COLOR_CLASSES[status], 'font-bold', className)}
    >
      {STATUS_MAP[status]}
    </Badge>
  );
}
