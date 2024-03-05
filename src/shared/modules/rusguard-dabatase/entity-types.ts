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

export interface OriginalLog {
  _id: string;
  DateTime: Date; // "2024-02-15T09:39:34.000Z"
  LogMessageType: number; // 1,
  LogMessageSubType: number; // 66,
  Message: string; // 'Вход';
  Details: string; // 'По ключу Номер ключа 14743520 (0x000000E0F7E0)';
  DriverID: string; // '3BCFD57F-527C-4D3A-B64F-030E6DA17CC6';
  EmployeeID: string; // 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC';
  OperatorID: unknown; // null;
  ThirdPartyContentType: unknown; // null;
  ThirdPartyContentData: unknown; // null;
}
