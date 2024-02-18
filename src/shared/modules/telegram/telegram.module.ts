import { Logger, LoggerService, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { LoggerModule } from '@shared/modules/logger';
import telegrafConfig, { ITelegramConfig } from './telegraf-config';
import { telegramUsersGuard } from './telegram-user.middleware';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegrafConfig), LoggerModule],
      useFactory: (
        configService: ConfigService<ITelegramConfig>,
        logger: LoggerService,
      ) => ({
        token: configService.get<string>('telegramBotToken'),
        middlewares: [session(), telegramUsersGuard({ logger })],
      }),
      inject: [ConfigService, Logger],
    }),
  ],
})
export class TelegramModule {}
