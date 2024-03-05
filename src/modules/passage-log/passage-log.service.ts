import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Log,
  RusguardDatabaseConnection,
} from '@shared/modules/rusguard-dabatase';
import { OriginalLog } from '@shared/modules/rusguard-dabatase/entity-types';
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
  WHERE [Employee].[_id] = '${employeeId}' AND DateTime > '${startFormatted}' AND DateTime < '${endFormatted}'
  ORDER BY DateTime ASC`;

    const result = await this.dbConnection.query<Log>(command);

    this.logger.log('get logs request result', result.recordset.length);

    return result.recordset;
  }

  async editPassageLog({ logId, newTime }: { logId: string; newTime: string }) {
    this.logger.log('edit passage log', { logId, newTime });

    const selectCommand = `SELECT * FROM [dbo].[Log] WHERE _id = '${logId}'`;
    const result = await this.dbConnection.query<OriginalLog>(selectCommand);

    if (result.recordset.length !== 1) {
      throw new Error(
        `Получено неожиданное количество записей ${result.recordset.length}`,
      );
    }

    const log = result.recordset[0];
    this.logger.log('log', log);
    this.logger.log('DateTime string', log.DateTime.toISOString());

    const dateTime = log.DateTime.toISOString().split('T');
    const time = dateTime[1].split('.');

    time[0] = newTime;
    dateTime[1] = time.join('.');
    const newDate = dayjs(dateTime.join(' ').replace('Z', ''));
    const newDateToSet = newDate.format('YYYY-MM-DD HH:mm:ss');

    // 2021-05-27 08:51:52
    const updateCommand = `
      UPDATE [dbo].[Log]
        SET [DateTime] = '${newDateToSet}'
            ,[LogMessageType] = ${log.LogMessageType}
            ,[LogMessageSubType] = ${log.LogMessageSubType}
            ,[Message] = '${log.Message}'
            ,[Details] = '${log.Details}'
            ,[DriverID] = '${log.DriverID}'
            ,[EmployeeID] = '${log.EmployeeID}'
            ,[OperatorID] = ${log.OperatorID}
            ,[ThirdPartyContentType] = ${log.ThirdPartyContentType}
            ,[ThirdPartyContentData] = ${log.ThirdPartyContentData}
      WHERE _id = ${logId}
    `;

    this.logger.log('updateCommand', updateCommand);
    const updateResult = await this.dbConnection.query(updateCommand);
    this.logger.log('update result', updateResult);
  }
}
