import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { LoggerModule } from '@app/modules/logger';
import { RusguardDatabaseModule } from '@app/modules/rusguard-dabatase';

@Module({
  imports: [LoggerModule, RusguardDatabaseModule],
  providers: [EmployeeService],
})
export class EmployeeModule {}
