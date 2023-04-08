import { Button } from "@/components/Button";
import { StatusChip } from "../StatusChip";
import { ApplicationsTableBodyRow, ApplicationsTableHeadRow, ApplicationsTableRoot, ApplicationsVerticalCell } from "./style";
import { useDateFormat } from "@/hooks/useDateFormat";

export function ApplicationsTable() {
  const { formatToRelativeDate } = useDateFormat()

  return (
    <ApplicationsTableRoot>
      <ApplicationsTableHeadRow>
        <th>Position</th>
        <th>Status</th>
        <th>Applied</th>
        <th></th>
      </ApplicationsTableHeadRow>
      <ApplicationsTableBodyRow>
        <ApplicationsVerticalCell>
          <span>Front-end developer</span>
          <span>Lorem ipsum</span>
        </ApplicationsVerticalCell>
        <td><StatusChip status="applied" /></td>
        <td>{formatToRelativeDate(new Date())}</td>
        <td><Button>Details</Button></td>
      </ApplicationsTableBodyRow>
    </ApplicationsTableRoot>
  )
}