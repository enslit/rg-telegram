import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@shared/modules/logger';
import { rusguardDatabaseProvider } from './rusguard-databse.provider';
import mssqlConfig from './mssql.config';

@Module({
  imports: [ConfigModule.forFeature(mssqlConfig), LoggerModule],
  providers: [rusguardDatabaseProvider],
  exports: [rusguardDatabaseProvider],
})
export class RusguardDatabaseModule {}
