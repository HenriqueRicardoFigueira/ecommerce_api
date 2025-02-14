import { Body, Controller, Get, Post, HttpCode, HttpStatus, HttpException} from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: OrderDto) {
    try{

      return this.appService.create(data);
    }catch(e){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e.message || 'Erro ao criar pedido',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @MessagePattern('payment_created')
  async update_order_status(@Payload() message){
    await this.appService.update_order_status(message);
  }
}
