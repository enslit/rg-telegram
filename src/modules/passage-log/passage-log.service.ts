import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Log,
  RusguardDatabaseConnection,
} from '@shared/modules/rusguard-dabatase';
import type { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import { ConnectionPool } from 'mssql';

const SQL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

@Injectable()
export class PassageLogService {
  private readonly dbConnection: ConnectionPool;

  constructor(
    @Inject(RusguardDatabaseConnection) dbConnection: ConnectionPool,
    private readonly logger: Logger,
  ) {
    this.dbConnection = dbConnection;
  }

  async getLogs(employeeId: string, start: Dayjs, end: Dayjs = dayjs()) {
    const startFormatted = start.format(SQL_DATE_TIME_FORMAT);
    const endFormatted = end.format(SQL_DATE_TIME_FORMAT);

    const command = `SELECT [Log].[_id] as LogId
      ,[DateTime]
      ,[LogMessageType]
      ,[LogMessageSubType]
      ,[Message]
      ,[Details]
  FROM [dbo].[Log]
  JOIN [dbo].[Employee] ON Employee._id=Log.EmployeeID
  WHERE [Employee].[_id] = '${employeeId}' AND DateTime > '${startFormatted}' AND DateTime < '${endFormatted}'`;

    const result = await this.dbConnection.query<Log>(command);

    this.logger.log('get logs request result', result);

    return result.recordset;
  }
}
