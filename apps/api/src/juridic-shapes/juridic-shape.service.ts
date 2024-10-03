import { Injectable } from '@nestjs/common';
import { JuridicShapeModel } from '@repo/models';
import { JuridicShapeDto } from 'src/dto/juridic-shapes';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JuridicShapeService {
  constructor(private readonly prisma: PrismaService) {}

  async GetAll(): Promise<JuridicShapeDto[]> {
    const juridicShapes = await this.prisma.juridicShape.findMany();
    return juridicShapes.map<JuridicShapeModel>((e) => {
      return { ...e };
    });
  }
}
