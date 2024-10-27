import { Global, Module } from '@nestjs/common';
import { LogHelper } from './log.helper';
import { ResponseHelper } from './response.helper';

@Global()
@Module({
  providers: [LogHelper, ResponseHelper],
  exports: [LogHelper, ResponseHelper],
})
export class HelpersModule {}
