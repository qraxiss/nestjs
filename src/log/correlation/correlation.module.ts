import { Module } from '@nestjs/common';
import { CorrelationService } from './correlation.service';

@Module({
  providers: [CorrelationService]
})
export class CorrelationModule {}
