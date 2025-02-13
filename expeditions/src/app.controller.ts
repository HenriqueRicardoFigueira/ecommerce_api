import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('expeditions')
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get()
  all() {
    return this.appService.all();
  }

  @MessagePattern('order_paid')
  expedition(data){
    this.appService.expedition(data);
  }
}
