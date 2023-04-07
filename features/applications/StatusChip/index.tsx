import { StatusChipContainer } from "./style"

type Status = 'applied' | 'offer_received' | 'hired' | 'offer_refused' | 'not_selected'

interface StatusChipProps {
  status: Status
}

const STATUS_MAP: { [K in Status]: string } = {
  applied: 'Applied',
  offer_received: 'Offer Received',
  hired: 'Hired',
  offer_refused: 'Offer Refused',
  not_selected: 'Not selected'
}

export function StatusChip({ status }: StatusChipProps) {
  return <StatusChipContainer status={status}>{STATUS_MAP[status]}</StatusChipContainer>
}