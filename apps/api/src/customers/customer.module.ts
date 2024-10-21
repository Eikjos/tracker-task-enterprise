import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [PrismaModule],
})
export class CustomerModule {}
