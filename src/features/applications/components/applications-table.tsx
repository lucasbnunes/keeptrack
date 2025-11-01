import { useDateFormat } from '@/hooks/useDateFormat';
import { Application } from '@prisma/client';
import { StatusBadge } from '@/features/applications/components/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UpdateApplicationDialog } from '@/features/applications/components/update-application-dialog';

interface ApplicationTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationTableProps) {
  const { formatToRelativeDate } = useDateFormat();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground uppercase">
              Position
            </TableHead>
            <TableHead className="text-muted-foreground uppercase">
              Status
            </TableHead>
            <TableHead className="text-muted-foreground uppercase">
              Applied
            </TableHead>
            <TableHead className="text-muted-foreground uppercase"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="flex flex-col">
                <span>{application.title}</span>
                <span className="text-muted-foreground">
                  {application.company}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={application.status} />
              </TableCell>
              <TableCell>
                {formatToRelativeDate(new Date(application.applicationDate))}
              </TableCell>
              <TableCell>
                <UpdateApplicationDialog application={application} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
