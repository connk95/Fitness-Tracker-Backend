import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.services';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('paginated')
  async getPaginatedData(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.dataService.getPaginatedData(page, limit);
  }
}
