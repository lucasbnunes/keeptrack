import { Button } from "@/components/Button";
import { StatusChip } from "../StatusChip";
import { ApplicationsTableBody, ApplicationsTableHead, ApplicationsTableRoot, ApplicationsVerticalCell } from "./style";
import { useDateFormat } from "@/hooks/useDateFormat";

export function ApplicationsTable() {
  const { formatToRelativeDate } = useDateFormat()

  return (
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
        <tr>
          <ApplicationsVerticalCell>
            <span>Front-end developer</span>
            <span>Lorem ipsum</span>
          </ApplicationsVerticalCell>
          <td><StatusChip status="applied" /></td>
          <td>{formatToRelativeDate(new Date())}</td>
          <td><Button>Details</Button></td>
        </tr>
      </ApplicationsTableBody>
    </ApplicationsTableRoot>
  )
}