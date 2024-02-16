import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';
import { RusguardDatabaseConnection } from 'src/core/modules/rusguard-dabatase';

export interface IEmployeeService {
  getEmployee: () => Promise<any>;
}

@Injectable()
export class EmployeeService {
  private readonly dbConnection: ConnectionPool;

  constructor(
    private readonly logger: Logger,
    @Inject(RusguardDatabaseConnection) dbConnection: ConnectionPool,
  ) {
    this.dbConnection = dbConnection;
  }

  async getEmployee() {}
}
