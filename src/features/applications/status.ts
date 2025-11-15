import { Status } from '@prisma/client';

export const STATUS_METADATA: {
  [k in Status]: {
    title: string;
  };
} = {
  saved: {
    title: 'Saved',
  },
  applied: {
    title: 'Applied',
  },
  interview: {
    title: 'Interview',
  },
  offer_received: {
    title: 'Offer received',
  },
  hired: {
    title: 'Hired',
  },
};
