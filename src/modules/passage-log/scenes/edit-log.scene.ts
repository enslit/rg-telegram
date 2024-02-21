import { Markup } from 'telegraf';
import { Action, Command, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import * as dayjs from 'dayjs';
import { TGContext } from '@shared/modules/telegram/telegram-ctx';
import { PassageLogService } from '../passage-log.service';
import { SCENES } from '../constants';

@Scene(SCENES.editLog.sceneId)
export class EditLogsScene {
  constructor(private readonly passageLogService: PassageLogService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: TGContext<never>) {}

  @Command('back')
  @Action('back')
  async onBackAction(@Ctx() ctx: TGContext<never>) {
    ctx.scene.leave();
  }
}
