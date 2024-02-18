import { Injectable } from '@nestjs/common';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { Ctx, Hears, Scene, SceneEnter, Update } from 'nestjs-telegraf';

@Injectable()
@Update()
@Scene('logs', {
  ttl: 360,
  enterHandlers: [(ctx) => ctx.reply('Enter logs scene')],
  leaveHandlers: [(ctx) => ctx.reply('Leave logs scene')],
  handlers: [(ctx) => ctx.reply(`In logs scene ${ctx.message.text}`)],
})
export class ShowLogsScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TGContext<never>) {
    ctx.reply('Show logs scene', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Назад', callback_data: 'back' }]],
      },
    });
  }

  @Hears('Назад')
  async back(@Ctx() ctx: TGContext<never>) {
    ctx.scene.leave();
  }
}
