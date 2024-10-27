import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CustomerCreateDto from 'src/dto/customers/customer-create.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CustomerService } from './customer.service';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return await this.customerService.delete(
      parseInt(id),
      parseInt(req['enterpriseId']),
    );
  }
}
