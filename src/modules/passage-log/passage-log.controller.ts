import { Injectable } from '@nestjs/common';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { Command, Ctx, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Update()
@Injectable()
export class PassageLogController {
  constructor(@InjectBot() private bot: Telegraf<TGContext<never>>) {
    bot.telegram.setMyCommands([
      {
        command: 'show_logs',
        description: 'Show logs',
      },
      {
        command: 'edit_log',
        description: 'Edit log',
      },
    ]);
  }

  @Command('show_logs')
  async showLogs(@Ctx() ctx: TGContext<never>) {
    await ctx.reply('controller status - OK');
    await ctx.scene.enter('logs');
  }

  @Command('edit_log')
  async editLog(@Ctx() ctx: TGContext<never>) {
    await ctx.reply('Работаю над этим разделом');
  }
}
