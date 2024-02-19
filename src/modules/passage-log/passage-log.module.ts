import { Module } from '@nestjs/common';
import { PassageLogService } from './passage-log.service';
import { PassageLogController } from './passage-log.controller';
import { TelegramModule } from '@shared/modules/telegram';
import { ShowLogsScene } from './show-logs.scene';
import { RusguardDatabaseModule } from '@shared/modules/rusguard-dabatase';
import { LoggerModule } from '@shared/modules/logger';

@Module({
  imports: [TelegramModule, RusguardDatabaseModule, LoggerModule],
  providers: [PassageLogService, PassageLogController, ShowLogsScene],
})
export class PassageLogModule {}
