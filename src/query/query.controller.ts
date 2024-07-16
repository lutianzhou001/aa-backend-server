import { Body, Controller, Post } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryAAInfoDto, QueryUOPDto } from "./dto/queryUOP.dto";
import { UserOperation } from 'permissionless/types/userOperation';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post('uop')
  async queryUOP(@Body() dto: QueryUOPDto) {
    return await this.queryService.queryUOP(dto);
  }

  @Post('aainfo')
  async queryAAInfo(@Body() dto: QueryAAInfoDto) {
    return await this.queryService.queryAAInfo(dto.subject);
  }
}
