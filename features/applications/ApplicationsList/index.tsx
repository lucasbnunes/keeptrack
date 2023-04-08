import { useDateFormat } from "@/hooks/useDateFormat";
import { StatusChip } from "../StatusChip";
import { ApplicationListItem, ApplicationListItemInfo, ApplicationListItemTitle, ApplicationListRoot } from "./style";

export function ApplicationsList() {
  const { formatToRelativeDate } = useDateFormat()

  return (
    <ApplicationListRoot>
      <ApplicationListItem>
        <ApplicationListItemTitle>
          <span>Front-end Developer</span>
          <span>Lorem ipsum</span>
        </ApplicationListItemTitle>
        <ApplicationListItemInfo>
          <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>
          <StatusChip status="applied" />
        </ApplicationListItemInfo>
      </ApplicationListItem>
      <ApplicationListItem>
        <ApplicationListItemTitle>
          <span>Front-end Developer</span>
          <span>Lorem ipsum</span>
        </ApplicationListItemTitle>
        <ApplicationListItemInfo>
          <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>
          <StatusChip status="applied" />
        </ApplicationListItemInfo>
      </ApplicationListItem>
      <ApplicationListItem>
        <ApplicationListItemTitle>
          <span>Front-end Developer</span>
          <span>Lorem ipsum</span>
        </ApplicationListItemTitle>
        <ApplicationListItemInfo>
          <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>
          <StatusChip status="applied" />
        </ApplicationListItemInfo>
      </ApplicationListItem>

    </ApplicationListRoot>
  )
}