import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConnectionPool } from 'mssql';
import { Employee } from '@shared/types/rusguard';
import { RusguardDatabaseConnection } from '@shared/provider-tokens';

export interface IEmployeeService {
  getEmployee: () => Promise<Employee>;
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
