import { ApiProperty } from '@nestjs/swagger';
import { EnterpriseCreateModel } from '@repo/models';

export class EnterpriseCreateDto implements EnterpriseCreateModel {
  @ApiProperty({ description: 'Enterprise juridic shape' })
  juridicShape: string;
  @ApiProperty({ description: 'Enterprise name' })
  name: string;
  @ApiProperty({ description: 'Enterprise siret' })
  siret: string;
  @ApiProperty({ description: 'Enterprise address' })
  address: string;
  @ApiProperty({ description: 'Enterprise zip code' })
  zipCode: string;
  @ApiProperty({ description: 'Enterprise city' })
  city: string;
  @ApiProperty({ description: 'Enterprise number tva' })
  numberTVA: string;
  @ApiProperty({ description: 'Enterprise social capital' })
  socialCapital: number;
  @ApiProperty({ description: 'Enterprise mail' })
  email: string;
  @ApiProperty({ description: 'Enterprise phone' })
  phone: string;
}
