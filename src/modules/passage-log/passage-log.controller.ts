import { Injectable } from '@nestjs/common';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { Command, Ctx, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { SCENES } from './constants';

@Update()
@Injectable()
export class PassageLogController {
  constructor(@InjectBot() private bot: Telegraf<TGContext<never>>) {
    const commands = Object.values(SCENES).map(({ command, description }) => ({
      command,
      description,
    }));

    bot.telegram.setMyCommands(commands);
  }

  @Command(SCENES.showLogs.command)
  async showLogs(@Ctx() ctx: TGContext<never>) {
    await ctx.scene.enter(SCENES.showLogs.sceneId);
  }

  @Command(SCENES.editLog.command)
  async editLog(@Ctx() ctx: TGContext<never>) {
    await ctx.scene.enter(SCENES.editLog.sceneId);
  }
}
