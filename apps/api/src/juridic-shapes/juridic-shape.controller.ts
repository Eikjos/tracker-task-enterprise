import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { JuridicShapeService } from './juridic-shape.service';

@ApiTags('Juridics Shapes')
@Controller('juridic-shapes')
export class JuridicShapeController {
  constructor(private readonly juridicShapeService: JuridicShapeService) {}

  @UseGuards(AuthGuard)
  @Get()
  async GetAll() {
    return await this.juridicShapeService.GetAll();
  }
}
