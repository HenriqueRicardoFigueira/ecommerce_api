import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService
  ) {}

  async get_all_orders() {
    const url = 'http://checkout:3000/orders';

    try{
      const response = await lastValueFrom(
        this.httpService.get(url)
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Erro ao buscar pedidos',
        error.response?.status || 500,
      );
    }
  }

  async create_order(data: OrderDto) {
    const url = 'http://checkout:3000/orders';
    try{
      const response = await lastValueFrom(
        this.httpService.post(url, data)
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Erro ao criar pedido',
        error.response?.status || 500,
      );
    }
  } 
}
