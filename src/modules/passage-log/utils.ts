import * as dayjs from 'dayjs';
import { Log } from '@shared/modules/rusguard-dabatase';

type Days = Record<string, Log[]>;

export type LogByDate = [string, Log[]];

export const clearLogs = (logs: Log[]): LogByDate[] => {
  const logsByDate = logs.reduce<Days>((acc, log) => {
    const key = dayjs(log.DateTime).format('DD.MM.YY');

    if (acc[key]) {
      acc[key][1] = log;
    } else {
      acc[key] = [log];
    }

    return acc;
  }, {});

  return Object.entries(logsByDate);
};
