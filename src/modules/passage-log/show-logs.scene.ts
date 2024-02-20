import { Markup } from 'telegraf';
import { Action, Command, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { PassageLogService } from './passage-log.service';
import * as dayjs from 'dayjs';
import { normalizeISODate } from '@shared/utils/normalizeISODate';
import { clearLogs } from './utils';

@Scene('logs')
export class ShowLogsScene {
  constructor(private readonly passageLogService: PassageLogService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TGContext<never>) {
    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback('10 дней', '10'),
        Markup.button.callback('30 дней', '30'),
        Markup.button.callback('90 дней', '90'),
      ],
      [Markup.button.callback('Назад', 'back')],
    ]);

    await ctx.reply('Какой период?', {
      reply_markup: keyboard.reply_markup,
    });
  }

  @Command('back')
  @Action('back')
  async onBackAction(@Ctx() ctx: TGContext<never>) {
    ctx.scene.leave();
  }

  @Action('10')
  async onSelect10days(@Ctx() ctx: TGContext<never>) {
    const logs = await this.selectLogs(ctx.employeeId, 10);

    return this.replyLogs(ctx, logs);
  }

  @Action('30')
  async onSelect30days(@Ctx() ctx: TGContext<never>) {
    const logs = await this.selectLogs(ctx.employeeId, 30);

    return this.replyLogs(ctx, logs);
  }

  @Action('90')
  async onSelect90days(@Ctx() ctx: TGContext<never>) {
    const logs = await this.selectLogs(ctx.employeeId, 90);

    return this.replyLogs(ctx, logs);
  }

  private async replyLogs(ctx: TGContext<never>, logs: string) {
    await ctx.reply(logs);
    await ctx.scene.leave();
  }

  private async selectLogs(employeeId: string, period: number) {
    const startDate = dayjs().add(-period, 'day');

    const logs = await this.passageLogService.getLogs(employeeId, startDate);

    const logsView = clearLogs(logs).map(([date, [enterLog, outLog]]) => {
      const enter = normalizeISODate(enterLog.DateTime).format('HH:mm:ss');
      const out = outLog?.DateTime
        ? normalizeISODate(outLog.DateTime).format('HH:mm:ss')
        : 'Не зарегистрирован';

      return `${date}\n${enter} - ${out}`;
    });

    return logsView.join('\n\n');
  }
}
