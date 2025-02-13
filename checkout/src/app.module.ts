import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'CHECKOUT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'checkout',
            brokers: ['kafka:29092'],
          },
        },
      },
    ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
