import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryController } from './query/query.controller';
import { QueryService } from './query/query.service';
import { ExecutionController } from './execution/execution.controller';
import { ExecutionService } from './execution/execution.service';

@Module({
  imports: [],
  controllers: [AppController, QueryController, ExecutionController],
  providers: [AppService, QueryService, ExecutionService],
})
export class AppModule {}
