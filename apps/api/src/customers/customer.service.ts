import { Injectable } from '@nestjs/common';
import CustomerCreateDto from 'src/dto/customers/customer-create.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(model: CustomerCreateDto, enterpriseId: number) {
    await this.prisma.customer.create({
      data: {
        ...model,
        creationDate: new Date(),
        enterprises: {
          create: {
            enterpriseId: enterpriseId,
          },
        },
      },
    });
    // Todo - Envoyer un mail pour créer un compte relié au client
  }

  async findAll(enterpriseId: number) {
    await this.prisma.customer.findMany({
      where: {
        enterprises: {
          some: {
            enterpriseId: enterpriseId,
          },
        },
      },
    });
  }
}
