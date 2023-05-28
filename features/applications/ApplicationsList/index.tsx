import { useDateFormat } from "@/hooks/useDateFormat";
import { StatusChip } from "../StatusChip";
import { ApplicationListItem, ApplicationListItemInfo, ApplicationListItemTitle, ApplicationListRoot } from "./style";
import { Application } from "@prisma/client";
import { Button } from "@/components/Button";
import { useState } from "react";
import { UpdateApplicationModal } from "../UpdateApplicationModal";

interface ApplicationListProps {
  applications: Application[]
}

export function ApplicationsList({ applications }: ApplicationListProps) {
  const { formatToRelativeDate } = useDateFormat()
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  function handleEditButtonClick(application: Application) {
    setUpdateModalOpen(true)
    setSelectedApplication(application)
  }

  return (
    <ApplicationListRoot>
      {updateModalOpen && selectedApplication && <UpdateApplicationModal application={selectedApplication} open={updateModalOpen} setOpen={setUpdateModalOpen} />}
      {applications.map((application) => (
        <ApplicationListItem key={application.id}>
          <ApplicationListItemTitle>
            <span>{application.title}</span>
            <span>{application.company}</span>
            <Button onClick={() => handleEditButtonClick(application)}>Edit</Button>

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