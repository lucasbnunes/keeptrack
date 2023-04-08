import { useDateFormat } from "@/hooks/useDateFormat";
import { StatusChip } from "../StatusChip";
import { ApplicationListRoot } from "./style";

export function ApplicationsList() {
  const { formatToRelativeDate } = useDateFormat()

  return (
    <ApplicationListRoot>
      <li>
        <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>

        <div>
          <div>
            <span>Front-end Developer</span>
            <span>Lorem ipsum</span>
          </div>
          <StatusChip status="applied" />
        </div>
      </li>
      <li>
        <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>

        <div>
          <div>
            <span>Front-end Developer Senior Jedi</span>
            <span>Lorem ipsum</span>
          </div>
          <StatusChip status="offer_refused" />
        </div>
      </li>
      <li>
        <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>

        <div>
          <div>
            <span>Front-end Developer</span>
            <span>Lorem ipsum</span>
          </div>
          <StatusChip status="not_selected" />
        </div>
      </li>
      <li>
        <span>{formatToRelativeDate(new Date('2023-04-06'))}</span>

        <div>
          <div>
            <span>Front-end Developer</span>
            <span>Lorem ipsum</span>
          </div>
          <StatusChip status="hired" />
        </div>
      </li>
    </ApplicationListRoot>
  )
}