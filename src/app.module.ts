import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './core/modules/telegram/telegram.module';

@Module({
  imports: [ConfigModule.forRoot(), TelegramModule],
  providers: [],
})
export class AppModule {}
