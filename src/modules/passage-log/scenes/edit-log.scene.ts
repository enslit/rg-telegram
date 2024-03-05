import { Markup } from 'telegraf';
import {
  Action,
  Command,
  Ctx,
  Hears,
  Scene,
  SceneEnter,
  SceneLeave,
} from 'nestjs-telegraf';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  EditLogSession,
  TGContext,
} from '@shared/modules/telegram/telegram-ctx';
import { PassageLogService } from '../passage-log.service';
import { SCENES } from '../constants';
import { Message, Update } from '@telegraf/types';
import { clearLogs } from '../utils';
import { normalizeISODate } from '@shared/utils/normalizeISODate';

dayjs.extend(customParseFormat);

@Scene(SCENES.editLog.sceneId)
export class EditLogsScene {
  constructor(private readonly passageLogService: PassageLogService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TGContext<EditLogSession>) {
    const keyboard = Markup.keyboard([
      [],
      [Markup.button.callback('Другая дата', 'custom_date')],
      [Markup.button.callback('Назад', 'back')],
    ]);

    await ctx.reply('Какую запись редактировать?', {
      reply_markup: keyboard.reply_markup,
    });
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: TGContext<EditLogSession>) {
    await ctx.reply('Leave scene edit log', {
      reply_markup: { remove_keyboard: true },
    });
  }

  @Hears('Назад')
  @Command('back')
  @Action('back')
  async onBackAction(@Ctx() ctx: TGContext<EditLogSession>) {
    ctx.scene.leave();
  }

  @Hears('Другая дата')
  async onCustomDate(@Ctx() ctx: TGContext<EditLogSession>) {
    await ctx.reply('Введи дату в формате DD.MM.YYYY', {
      reply_markup: Markup.keyboard([
        [Markup.button.callback('Назад', 'back')],
      ]).resize().reply_markup,
    });
  }

  @Hears(/\d{2}\.\d{2}\.\d{4}/)
  async onSelectCustomDate(@Ctx() ctx: ContextWithTextMessage) {
    const choosedDate = dayjs(ctx.message.text, 'DD.MM.YYYY');

    console.log('date is valid', choosedDate, choosedDate.isValid());

    if (!choosedDate.isValid()) {
      return await ctx.reply(
        `Ошибка ввода. Формат не распознан ${ctx.message.text}. Необходимо ввести корректную дату в формате DD.MM.YYYY (например, 21.02.2024)`,
      );
    }

    const logs = await this.passageLogService.getLogs(
      ctx.employeeId,
      choosedDate.startOf('day'),
      choosedDate.endOf('day'),
    );

    const clearedLogs = clearLogs(logs);

    if (clearedLogs.length === 0) {
      return await ctx.reply('Не найдены проходы за выбранную дату');
    }

    const [enter, out] = clearedLogs[0][1];

    const enterButtonText = normalizeISODate(enter.DateTime).format(
      'DD.MM.YY HH:mm:ss',
    );

    const outButtonText = out.DateTime
      ? normalizeISODate(out.DateTime).format('DD.MM.YY HH:mm:ss')
      : 'Не зарегистрирован';

    ctx.scene.session.state.mapLogs = {
      [enterButtonText]: enter.LogId,
      [outButtonText]: out.LogId,
    };

    await ctx.reply('Какую запись?', {
      reply_markup: Markup.keyboard([
        [
          Markup.button.callback(enterButtonText, '1'),
          Markup.button.callback(outButtonText, '2'),
        ],
        [Markup.button.callback('Назад', 'back')],
      ]).resize().reply_markup,
    });
  }

  @Hears(/\d{2}\.\d{2}\.\d{2}\s\d{2}:\d{2}:\d{2}/) // 15.02.24 17:38:07
  async onChooseLog(@Ctx() ctx: ContextWithTextMessage) {
    if (!ctx.scene.session.state.mapLogs) {
      return await ctx.reply(
        'Не найдены идентификаторы записей. Попорбуй начать сначала',
      );
    }

    const logId = ctx.scene.session.state.mapLogs[ctx.message.text];
    ctx.scene.session.state.mapLogs = {};
    ctx.scene.session.state.logId = logId;

    ctx.reply('Введи новое время в формате HH:MM:SS', {
      reply_markup: { remove_keyboard: true },
    });
  }

  @Hears(/\d{2}:\d{2}:\d{2}/)
  async onEnterNewTime(@Ctx() ctx: ContextWithTextMessage) {
    const newTime = ctx.message.text;
    const logId = ctx.scene.session.state.logId;

    if (!dayjs(newTime, 'HH:mm:ss', true).isValid()) {
      return await ctx.reply(
        'Неверный формат. Ожидается формат HH:mm:ss. Пример - 23:45:59',
      );
    }

    if (!logId) {
      return await ctx.reply(
        'Не найден идентификатор записи. Попробуй начать сначала',
      );
    }

    await this.passageLogService.editPassageLog({ logId, newTime });
    await ctx.reply(`Запись ${logId} была успешно отредактирована`);

    ctx.scene.session.state = {};
    ctx.scene.leave();
  }
}

type ContextWithTextMessage = TGContext<
  EditLogSession,
  Update.MessageUpdate<Message.TextMessage>
>;
