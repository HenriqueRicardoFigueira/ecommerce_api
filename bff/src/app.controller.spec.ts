import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderDto } from './order.dto';
import { create } from 'domain';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            get_all_orders: jest.fn(() => [
              {
                id: 1,
                createdAt: "2025-02-13T17:27:44.171Z",
                updatedAt: "2025-02-13T17:27:49.239Z",
                total: 150,
                status: "PAID"
              },
            ]),
            create_order: jest.fn((data: OrderDto) => ({
              id: 1,
              ...data,
            })),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('defined', () => {
    expect(appController).toBeDefined();
  });

  describe('all()', () => {
    it('return orders', () => {
      const result = appController.all();

      expect(result).toEqual([{
        id: 1,
        createdAt: "2025-02-13T17:27:44.171Z",
        updatedAt: "2025-02-13T17:27:49.239Z",
        total: 150,
        status: "PAID"
      }]);
      expect(appService.get_all_orders).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it('create order and return it', () => {
      const dto: OrderDto = { total: 150 };

      const result = appController.create(dto);

      expect(result).toEqual({
        id: 1,
        ...dto,
      });
      expect(appService.create_order).toHaveBeenCalledWith(dto);
      expect(appService.create_order).toHaveBeenCalledTimes(1);
    });
  });
});
