import { ApiProperty } from '@nestjs/swagger';
import { JuridicShapeModel } from '@repo/models';

export class JuridicShapeDto implements JuridicShapeModel {
  @ApiProperty({ description: 'Juridic shape code' })
  code: string;
  @ApiProperty({ description: 'Juridic shape level' })
  level: number;
  @ApiProperty({ description: 'Juridic shape designation' })
  designation: string;
}
