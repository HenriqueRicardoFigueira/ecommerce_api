import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern('payment_created')
  async update_order_status(@Payload() message){
    await this.appService.update_order_status(message);
  }
}
