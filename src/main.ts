import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmployeeService } from './entities/employee/employee.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const employeeService = app.get(EmployeeService);
  employeeService.getEmployee();
}
bootstrap();
