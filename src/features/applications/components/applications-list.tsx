import { StatusBadge } from '@/features/applications/components/status-badge';
import { useDateFormat } from '@/hooks/useDateFormat';
import { Application } from '@prisma/client';
import { UpdateApplicationDialog } from './update-application-dialog';

interface ApplicationListProps {
  applications: Application[];
}

export function ApplicationsList({ applications }: ApplicationListProps) {
  const { formatToRelativeDate } = useDateFormat();

  return (
    <ul className="flex flex-col gap-1">
      {applications.map((application) => (
        <li
          key={application.id}
          className="hover:bg-accent flex justify-between rounded-md px-3 py-2"
        >
          <div className="flex flex-col items-start">
            <span>{application.title}</span>
            <span className="text-muted-foreground">{application.company}</span>
            <UpdateApplicationDialog application={application} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-muted-foreground self-end text-sm">
              {formatToRelativeDate(new Date(application.applicationDate))}
            </span>
            <StatusBadge status={application.status} />
          </div>
        </li>
      ))}
    </ul>
  );
}
