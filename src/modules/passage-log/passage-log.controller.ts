import { Injectable } from '@nestjs/common';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { Command, Ctx, Update } from 'nestjs-telegraf';

@Update()
@Injectable()
export class PassageLogController {
  @Command('show_logs')
  async showLogs(@Ctx() ctx: TGContext<never>) {
    await ctx.reply('controller status - OK');
    await ctx.scene.enter('logs');
  }
}
