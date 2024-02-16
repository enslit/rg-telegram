import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { LoggerModule } from 'src/core/modules/logger';
import { RusguardDatabaseModule } from 'src/core/modules/rusguard-dabatase';

@Module({
  imports: [LoggerModule, RusguardDatabaseModule],
  providers: [EmployeeService],
})
export class EmployeeModule {}
