import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { ExpeditionDto } from './expedition.dto';
import { ExpeditionStatus } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
  ) {}

  all() {
    return this.prisma.expedition.findMany();
  }

  async expedition(data: any){
    const expedition = await this.prisma.expedition.create({
      data: {
        order_id: data.id,
        status: ExpeditionStatus.PENDING
      }
    });
    return expedition;
  }
  
}
