import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockAppService: Partial<AppService>;

  beforeAll(async () => {
    mockAppService = {
      get_all_orders: jest.fn().mockResolvedValue([
        {
          id: 1,
          createdAt: '2025-02-13T17:27:44.171Z',
          updatedAt: '2025-02-13T17:27:49.239Z',
          total: 150,
          status: 'PAID',
        },
      ]),
      create_order: jest.fn().mockImplementation(async (data) => ({
        id: 1,
        createdAt: '2025-02-13T17:27:44.171Z',
        updatedAt: '2025-02-13T17:27:49.239Z',
        total: data.total,
        status: 'PENDING',
      })),
      
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/checkout (GET) - return mocked orders', () => {
    return request(app.getHttpServer())
      .get('/checkout')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: 1,
            createdAt: '2025-02-13T17:27:44.171Z',
            updatedAt: '2025-02-13T17:27:49.239Z',
            total: 150,
            status: 'PAID',
          },
        ]);
      });
  });

  it('/checkout (POST) - create order and return', () => {
    const orderData = { total: 250 };

    return request(app.getHttpServer())
      .post('/checkout')
      .send(orderData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          createdAt: '2025-02-13T17:27:44.171Z',
          updatedAt: '2025-02-13T17:27:49.239Z',
          total: 250,
          status: 'PENDING',
        });
      });
  });
});
