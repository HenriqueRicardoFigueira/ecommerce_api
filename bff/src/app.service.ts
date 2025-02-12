import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.order.findMany();
  }
}
