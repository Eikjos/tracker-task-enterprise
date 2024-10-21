import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import CustomerCreateDto from 'src/dto/customers/customer-create.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CustomerService } from './customer.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  async create(@Body() model: CustomerCreateDto, @Request() req: any) {
    return await this.customerService.create(
      model,
      parseInt(req['enterpriseId']),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Request() req: any) {
    return await this.customerService.findAll(parseInt(req['enterpriseId']));
  }
}
