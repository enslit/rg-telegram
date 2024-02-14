import { Logger, LoggerService, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import telegrafConfig from '../../configuration/telegraf-config';
import { telegramUsersGuard } from '../../../entities/telegram-user';

@Module({
  imports: [],
  providers: [Logger],
  exports: [Logger],
})
class ModuleWithLogger {}

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegrafConfig), ModuleWithLogger],
      useFactory: (configService: ConfigService, logger: LoggerService) => ({
        token: configService.get<string>('telegramBotToken'),
        middlewares: [session(), telegramUsersGuard({ logger })],
      }),
      inject: [ConfigService, Logger],
    }),
  ],
})
export class TelegramModule {}
