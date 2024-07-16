import { Body, Controller } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { SendUOPDto } from './dto/sendUOP.dto';

@Controller('execution')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  async sendUOP(@Body() dto: SendUOPDto) {
    return await this.executionService.sendUOP(dto);
  }
}