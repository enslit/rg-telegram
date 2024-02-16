import { Module } from '@nestjs/common';
import { rusguardDatabaseProvider } from './rusguard-databse.provider';
import { ConfigModule } from '@nestjs/config';
import mssqlConfig from './mssql.config';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ConfigModule.forFeature(mssqlConfig), LoggerModule],
  providers: [rusguardDatabaseProvider],
  exports: [rusguardDatabaseProvider],
})
export class RusguardDatabaseModule {}
