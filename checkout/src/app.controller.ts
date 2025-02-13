import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all() {
    return this.appService.all();
  }

  @Post()
  create(@Body() data: OrderDto) {
    return this.appService.create(data);
  }
}
