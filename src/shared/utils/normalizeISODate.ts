import * as dayjs from 'dayjs';

export const normalizeISODate = (date: Date) => {
  return dayjs(date.toISOString().replace('T', ' ').replace('Z', ' '));
};
