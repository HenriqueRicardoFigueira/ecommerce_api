import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('get all orders', async () => {
    const mockOrders = [{ id: 1, total: 150 }];

    const mockResponse: AxiosResponse = {
      data: mockOrders,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await appService.get_all_orders();

    expect(result).toEqual(mockOrders);
    expect(httpService.get).toHaveBeenCalledWith('http://checkout:3000/orders');
  });

  it('create new order', async () => {
    const dto: OrderDto = { total: 250, client_id: 1, item: 'item', item_id: 1, quantity: 1 };
    const mockOrder = { id: 1, ...dto };

    const mockResponse: AxiosResponse = {
      data: mockOrder,
      status: 201,
      statusText: 'Created',
      headers: {},
      config: { headers: new AxiosHeaders() },
    };

    jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

    const result = await appService.create_order(dto);

    expect(result).toEqual(mockOrder);
    expect(httpService.post).toHaveBeenCalledWith(
      'http://checkout:3000/orders',
      dto,
    );
  });

  it('return undefined if fail', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      throwError(() => new Error('Erro na API')),
    );

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = await appService.get_all_orders();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  it('return undefined if fail', async () => {
    const dto: OrderDto = { total: 300, client_id: 1, item: 'item', item_id: 1, quantity: 1 };

    jest.spyOn(httpService, 'post').mockReturnValue(
      throwError(() => new Error('Erro ao criar pedido')),
    );

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = await appService.create_order(dto);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
