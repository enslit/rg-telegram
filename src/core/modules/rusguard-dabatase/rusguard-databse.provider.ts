import type { ConnectionPool } from 'mssql';
import { connect } from 'mssql';
import { FactoryProvider, Logger, LoggerService, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMSSQLConfig } from './mssql.config';

export const RusguardDatabaseConnection = Symbol('RusguardDatabaseConnection');

type MssqlConnectionFactory = (
  configService: ConfigService<IMSSQLConfig>,
  logger?: LoggerService,
) => Promise<ConnectionPool>;

const useFactory: MssqlConnectionFactory = async (configService, logger) => {
  try {
    const server = configService.get<string>('server');
    const user = configService.get<string>('user');
    const password = configService.get<string>('password');
    const database = configService.get<string>('database');
    logger?.log(`Start connection MSSQL Rusguard database ${server}`);

    const pool = await connect({
      server,
      user,
      password,
      database,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false,
        trustServerCertificate: false,
      },
    });
    logger?.log('MSSQL Rusguard database connected');

    return pool;
  } catch (exception) {
    logger?.log('Failure connection', exception);
  }
};

export const rusguardDatabaseProvider: FactoryProvider<ConnectionPool> = {
  provide: RusguardDatabaseConnection,
  useFactory,
  inject: [ConfigService, Logger],
  scope: Scope.DEFAULT,
  durable: false,
};
