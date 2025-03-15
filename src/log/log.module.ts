import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { ErrorModule } from './error/error.module';

@Module({
  providers: [LogService],
  controllers: [LogController],
  imports: [ErrorModule]
})
export class LogModule {}
