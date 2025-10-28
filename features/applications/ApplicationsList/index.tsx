import { useDateFormat } from "@/hooks/useDateFormat";
import { Application } from "@prisma/client";
import { StatusChip } from "../StatusChip";
import { UpdateApplicationDialog } from "../UpdateApplicationDialog";
import {
  ApplicationListItem,
  ApplicationListItemInfo,
  ApplicationListItemTitle,
  ApplicationListRoot,
} from "./style";

interface ApplicationListProps {
  applications: Application[];
}

export function ApplicationsList({ applications }: ApplicationListProps) {
  const { formatToRelativeDate } = useDateFormat();

  return (
    <ApplicationListRoot>
      {applications.map((application) => (
        <ApplicationListItem key={application.id}>
          <ApplicationListItemTitle>
            <span>{application.title}</span>
            <span>{application.company}</span>
            <UpdateApplicationDialog application={application} />
          </ApplicationListItemTitle>
          <ApplicationListItemInfo>
            <span>
              {formatToRelativeDate(new Date(application.applicationDate))}
            </span>
            <StatusChip status={application.status} />
          </ApplicationListItemInfo>
        </ApplicationListItem>
      ))}
    </ApplicationListRoot>
  );
}
