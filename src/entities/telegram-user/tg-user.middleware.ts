import { LoggerService } from '@nestjs/common';
import { TGContext } from 'src/shared/types/telegram-ctx';
import { MiddlewareFn } from 'telegraf';
import { SceneSessionData } from 'telegraf/typings/scenes';

const mapTelegramUsersToEmployees: Record<number, string> = {
  546865995: 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC', // Prosto_Alex -> Юлиана Пономарева
  357936666: 'C7D4F9F6-52B6-4346-A4A2-BFAA8D7DCCCC', // Curly_Y
};

export interface Options {
  logger: LoggerService;
}

export const telegramUsersGuard =
  ({ logger }: Options): MiddlewareFn<TGContext<SceneSessionData>> =>
  (ctx, next) => {
    if (!ctx.from?.id) {
      ctx.reply('Cannot recognize user');
      logger.warn('Cannot recognize user', ctx.from);
      return;
    }

    const employeeId = mapTelegramUsersToEmployees[ctx.from.id];

    if (!employeeId) {
      ctx.reply('Unknown user');
      logger.warn('Unknown user', ctx.from);
      return;
    }

    ctx.employeeId = employeeId;
    logger.log(`pass guard for ${ctx.from.username}`, {
      employeeId,
      message: ctx.message,
    });
    next();
  };
