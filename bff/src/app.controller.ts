import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';

@Controller('checkout')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all() {
    return this.appService.get_all_orders();
  }

  @Post()
  create(@Body() data: OrderDto) {
    return this.appService.create_order(data);
  }
}
