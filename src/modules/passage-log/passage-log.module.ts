import { Module } from '@nestjs/common';
import { PassageLogService } from './passage-log.service';
import { PassageLogController } from './passage-log.controller';
import { TelegramModule } from '@shared/modules/telegram';
import { ShowLogsScene } from './show-logs.scene';

@Module({
  imports: [TelegramModule],
  providers: [PassageLogService, PassageLogController, ShowLogsScene],
})
export class PassageLogModule {}
