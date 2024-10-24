import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnterpriseCreateDto } from 'src/dto/enterprises/enteprise-create.dto';
import { EnterpriseInformationDto } from 'src/dto/enterprises/enterprise-info.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { EnterpriseService } from './enterprise.service';

@ApiTags('Enterprise')
@Controller('enterprise')
@ApiBearerAuth()
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
  @HttpCode(200)
  async createEnterprise(
    @Body() model: EnterpriseCreateDto,
    @Request() req: any,
  ) {
    return await this.enterpriseService.create(model, parseInt(req['userId']));
  }
}
