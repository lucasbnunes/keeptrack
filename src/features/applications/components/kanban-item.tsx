import { useDateFormat } from '@/hooks/use-date-format';
import { cn } from '@/lib/utils';
import { Application } from '@prisma/client';

interface KanbanItemProps {
  application: Pick<
    Application,
    'id' | 'title' | 'company' | 'applicationDate'
  >;
  isBeingDragged?: boolean;
}

export function KanbanItem({ application, isBeingDragged }: KanbanItemProps) {
  const { formatToRelativeDate } = useDateFormat();

  return (
    <div
      className={cn(
        'bg-background rounded-md border p-4 shadow-xs',
        isBeingDragged && 'shadow-accent shadow',
      )}
    >
      <span className="text-muted-foreground mb-2 block text-xs">
        Applied {formatToRelativeDate(application.applicationDate)}
      </span>
      <div className="flex items-start justify-between">
        <div>
          <h5 className="line-clamp-1">{application.title}</h5>
          <span className="text-muted-foreground inline-block text-sm">
            {application.company}
          </span>
        </div>
      </div>
    </div>
  );
}
