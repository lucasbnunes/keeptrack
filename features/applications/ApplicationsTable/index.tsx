import { useDateFormat } from "@/hooks/useDateFormat";
import { Application } from "@prisma/client";
import { StatusChip } from "../StatusChip";
import { UpdateApplicationDialog } from "../UpdateApplicationDialog";
import {
  ApplicationsTableBody,
  ApplicationsTableHead,
  ApplicationsTableRoot,
  ApplicationsVerticalCell,
} from "./style";

interface ApplicationTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationTableProps) {
  const { formatToRelativeDate } = useDateFormat();

  return (
    <>
      <ApplicationsTableRoot>
        <ApplicationsTableHead>
          <tr>
            <th>Position</th>
            <th>Status</th>
            <th>Applied</th>
            <th></th>
          </tr>
        </ApplicationsTableHead>

        <ApplicationsTableBody>
          {applications.map((application) => (
            <tr key={application.id}>
              <ApplicationsVerticalCell>
                <span>{application.title}</span>
                <span>{application.company}</span>
              </ApplicationsVerticalCell>
              <td>
                <StatusChip status={application.status} />
              </td>
              <td>
                {formatToRelativeDate(new Date(application.applicationDate))}
              </td>
              <td>
                <UpdateApplicationDialog application={application} />
              </td>
            </tr>
          ))}
        </ApplicationsTableBody>
      </ApplicationsTableRoot>
    </>
  );
}
