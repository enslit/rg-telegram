import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './app/modules/telegram';
import { RusguardDatabaseModule } from './app/modules/rusguard-dabatase';
import { LoggerModule } from './app/modules/logger';
import { EmployeeModule } from './entities/employee/employee.module';
import { PassageLogModule } from './entities/passage-log/passage-log.module';
import { TelegramUsersModule } from './entities/telegram-user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule,
    RusguardDatabaseModule,
    LoggerModule,
    EmployeeModule,
    PassageLogModule,
    TelegramUsersModule,
  ],
  providers: [],
})
export class AppModule {}
