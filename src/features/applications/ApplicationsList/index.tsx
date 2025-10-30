import { StatusBadge } from "@/features/applications/components/status-badge";
import { useDateFormat } from "@/hooks/useDateFormat";
import { Application } from "@prisma/client";
import { UpdateApplicationDialog } from "../UpdateApplicationDialog";

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
          className="flex justify-between py-2 px-3 rounded-md hover:bg-accent"
        >
          <div className="flex flex-col items-start">
            <span>{application.title}</span>
            <span className="text-muted-foreground">{application.company}</span>
            <UpdateApplicationDialog application={application} />
          </div>
          <div className="flex flex-col items-start">
            <span className="self-end text-sm text-muted-foreground">
              {formatToRelativeDate(new Date(application.applicationDate))}
            </span>
            <StatusBadge status={application.status} />
          </div>
        </li>
      ))}
    </ul>
  );
}
