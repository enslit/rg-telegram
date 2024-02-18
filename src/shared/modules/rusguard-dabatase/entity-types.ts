export interface Employee {
  _id: string;
  FirstName?: string;
  LastName?: string;
  IsRemoved?: boolean;
  IsLocked?: boolean;
}

export enum LogMessageType {
  Unknown = 1,
}

export enum LogMessageSubType {
  In = 66,
  Out = 67,
}

export interface Log {
  LogId: string; // "1255922"
  DateTime: Date; // 2024-01-26T15:36:35.000Z
  LogMessageType: LogMessageType; // 1
  LogMessageSubType: LogMessageSubType; // 66 | 67
  Message: string; // 'Выход'
  Details: string; // 'По ключу Номер ключа 14743520 (0x000000E0F7E0)'
}
