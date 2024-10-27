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
    return await this.prisma.customer.findMany({
      where: {
        enterprises: {
          some: {
            enterprise: {
              id: enterpriseId,
            },
          },
        },
      },
    });
  }

  async delete(customerId: number, enterpriseId: number) {
    console.log(typeof customerId);
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: customerId,
        enterprises: {
          some: {
            enterprise: {
              id: enterpriseId,
            },
          },
        },
      },
      include: {
        enterprises: true,
      },
    });
    if (!customer) {
      return;
    }
    await this.prisma.enterpriseCustomer.delete({
      where: {
        enterpriseId_customerId: {
          enterpriseId: enterpriseId,
          customerId: customerId,
        },
      },
    });
    if (customer.enterprises.length == 1) {
      await this.prisma.customer.delete({
        where: {
          id: customerId,
        },
      });
    }
  }
}
