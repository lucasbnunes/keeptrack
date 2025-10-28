import { Application } from "@prisma/client"
import { StatusChipContainer } from "./style"


interface StatusChipProps {
  status: Application['status']
}

const STATUS_MAP: { [K in Application['status']]: string } = {
  applied: 'Applied',
  offer_received: 'Offer Received',
  hired: 'Hired',
  offer_refused: 'Offer Refused',
  not_selected: 'Not selected'
}

export function StatusChip({ status }: StatusChipProps) {
  return <StatusChipContainer status={status}>{STATUS_MAP[status]}</StatusChipContainer>
}