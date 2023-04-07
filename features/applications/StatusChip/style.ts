import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Status =
  | 'applied'
  | 'offer_received'
  | 'hired'
  | 'offer_refused'
  | 'not_selected';

interface StatusChipContainerProps {
  status: Status;
}

type StatusColorMap = {
  [K in Status]: {
    background: string;
    color: string;
  };
};

const STATUS_COLOR_MAP: StatusColorMap = {
  applied: {
    background: '#f0fdf4',
    color: '#166534',
  },
  not_selected: {
    background: '#fff1f2',
    color: '#9f1239',
  },
  offer_received: {
    background: '#ecfeff',
    color: '#155e75',
  },
  offer_refused: {
    background: '#faf5ff',
    color: '#6b21a8',
  },
  hired: {
    background: theme.colors.blue[50],
    color: theme.colors.blue[800],
  },
};

export const StatusChipContainer = styled.span<StatusChipContainerProps>`
  padding: 0.25rem 0.75rem;
  background: ${({ status }) => STATUS_COLOR_MAP[status].background};
  color: ${({ status }) => STATUS_COLOR_MAP[status].color};
  border-radius: 99px;
`;
