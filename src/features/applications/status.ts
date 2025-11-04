import { Status } from '@prisma/client';

export const STATUS_METADATA: {
  [k in Status]: {
    title: string;
  };
} = {
  applied: {
    title: 'Applied',
  },
  not_selected: {
    title: 'Not selected',
  },
  offer_received: {
    title: 'Offer received',
  },
  offer_refused: {
    title: 'Offer refused',
  },
  hired: {
    title: 'Hired',
  },
};
