import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe())
  create(@Body() data: OrderDto) {
    return this.appService.create_order(data);
  }
}
