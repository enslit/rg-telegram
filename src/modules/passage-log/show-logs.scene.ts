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
      [Markup.button.callback('Назад', 'back')],
    ]);

    const logs = await this.passageLogService.getLogs(
      ctx.employeeId,
      dayjs().add(-10, 'day'),
    );

    const logsView = clearLogs(logs).map(([date, [enterLog, outLog]]) => {
      const enter = normalizeISODate(enterLog.DateTime).format('HH:mm:ss');
      const out = normalizeISODate(outLog.DateTime).format('HH:mm:ss');

      return `${date}\n${enter} - ${out}`;
    });

    ctx.reply(`Logs last 10 days\n${logsView.join('\n\n')}`, {
      reply_markup: keyboard.reply_markup,
    });
  }

  @Command('back')
  async onBackCommand(@Ctx() ctx: TGContext<never>) {
    ctx.scene.leave();
  }

  @Action('back')
  async onBackAction(@Ctx() ctx: TGContext<never>) {
    ctx.scene.leave();
  }
}
