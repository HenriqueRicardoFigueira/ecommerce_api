import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all() {
    return this.appService.all();
  }

  @MessagePattern('order_created')
  payment(@Payload() message){
    this.appService.payment({
      amount: message.total,
      order_id: message.id
    });
  }
}
