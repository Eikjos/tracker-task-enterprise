import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnterpriseCreateDto } from 'src/dto/enterprise/enteprise-create';
import { EnterpriseInformationDto } from 'src/dto/enterprise/enterprise-info.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { EnterpriseService } from './enterprise.service';

@ApiTags('Enterprise')
@Controller('api/enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @UseGuards(AuthGuard)
  @Get('information')
  async getInformation(
    @Query('siret') siret: string,
  ): Promise<Omit<EnterpriseInformationDto, 'id'>> {
    return await this.enterpriseService.getInformationBySiret(siret);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createEnterprise(
    @Body() model: EnterpriseCreateDto,
    @Request() req: any,
  ) {
    return await this.enterpriseService.create(model, parseInt(req['userId']));
  }
}
