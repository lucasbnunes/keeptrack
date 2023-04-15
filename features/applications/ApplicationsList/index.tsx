import { useDateFormat } from "@/hooks/useDateFormat";
import { StatusChip } from "../StatusChip";
import { ApplicationListItem, ApplicationListItemInfo, ApplicationListItemTitle, ApplicationListRoot } from "./style";
import { Application } from "@prisma/client";

interface ApplicationListProps {
  applications: Application[]
}

export function ApplicationsList({ applications }: ApplicationListProps) {
  const { formatToRelativeDate } = useDateFormat()

  return (
    <ApplicationListRoot>
      {applications.map((application) => (
        <ApplicationListItem key={application.id}>
          <ApplicationListItemTitle>
            <span>{application.title}</span>
            <span>{application.company}</span>
          </ApplicationListItemTitle>
          <ApplicationListItemInfo>
            <span>{formatToRelativeDate(new Date(application.applicationDate))}</span>
            <StatusChip status={application.status} />
          </ApplicationListItemInfo>
        </ApplicationListItem>
      ))}
    </ApplicationListRoot>
  )
}