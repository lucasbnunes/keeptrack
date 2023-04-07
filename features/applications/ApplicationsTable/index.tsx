import { Button } from "@/components/Button";
import { StatusChip } from "../StatusChip";
import { ApplicationsTableBodyRow, ApplicationsTableHeadRow, ApplicationsTableRoot, ApplicationsVerticalCell } from "./style";

export function ApplicationsTable() {
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
        <td>1 day ago</td>
        <td><Button>Details</Button></td>
      </ApplicationsTableBodyRow>
    </ApplicationsTableRoot>
  )
}