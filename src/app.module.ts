import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
import telegrafConfig from './core/configuration/telegraf-config';
import { telegramUsersGuard } from './entities/telegram-user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forFeature(telegrafConfig)],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('telegramBotToken'),
        middlewares: [session(), telegramUsersGuard()],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
