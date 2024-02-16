import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
