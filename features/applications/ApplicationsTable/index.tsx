import { Button } from "@/components/Button";
import { StatusChip } from "../StatusChip";
import { ApplicationsTableBody, ApplicationsTableHead, ApplicationsTableRoot, ApplicationsVerticalCell } from "./style";
import { useDateFormat } from "@/hooks/useDateFormat";
import { Application } from "@prisma/client";
import { UpdateApplicationModal } from "../UpdateApplicationModal";
import { useState } from "react";

interface ApplicationTableProps {
  applications: Application[]
}

export function ApplicationsTable({ applications }: ApplicationTableProps) {
  const { formatToRelativeDate } = useDateFormat()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [applicationBeingEdited, setApplicationBeingEdited] = useState<Application | null>(null);

  function handleClickEdit(application: Application) {
    setOpenUpdateModal(true)
    setApplicationBeingEdited(application)
  }

  return (
    <>
      {applicationBeingEdited && openUpdateModal &&
        <UpdateApplicationModal application={applicationBeingEdited} open={openUpdateModal} setOpen={setOpenUpdateModal} />
      }
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
              <td><StatusChip status={application.status} /></td>
              <td>{formatToRelativeDate(new Date(application.applicationDate))}</td>
              <td><Button onClick={() => handleClickEdit(application)}>Edit</Button></td>
            </tr>
          ))}

        </ApplicationsTableBody>
      </ApplicationsTableRoot>
    </>
  )
}