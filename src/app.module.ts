import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './core/modules/telegram';
import { RusguardDatabaseModule } from './core/modules/rusguard-dabatase';
import { LoggerModule } from './core/modules/logger';
import { EmployeeModule } from './entities/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule,
    RusguardDatabaseModule,
    LoggerModule,
    EmployeeModule,
  ],
  providers: [],
})
export class AppModule {}
