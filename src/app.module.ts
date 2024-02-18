import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassageLogModule } from './modules/passage-log';

@Module({
  imports: [ConfigModule.forRoot(), PassageLogModule],
})
export class AppModule {}
