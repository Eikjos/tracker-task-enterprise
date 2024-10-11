import { ApiProperty } from '@nestjs/swagger';
import { EnterpriseInformation } from '@repo/models';

export class EnterpriseInformationDto implements EnterpriseInformation {
  @ApiProperty({ description: 'Enteprise id' })
  id: number;
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
  socialCapital?: number;
}
