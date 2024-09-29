import { ApiProperty } from "@nestjs/swagger";
import { EnterpriseInformation } from "@repo/models";

export class EnterpriseInformationDto implements EnterpriseInformation {
  @ApiProperty({description : 'Enterprise name'})
  name: string;
  @ApiProperty({description: "Enterprise siret"})
  siret: string;
  @ApiProperty({description: "Enterprise address"})
  address: string;
  @ApiProperty({description: "Enterprise zip code"})
  zipCode: string;
  @ApiProperty({description: "Enterprise city"})
  city: string;
  @ApiProperty({description: "Enterprise number tva"})
  numberTva: string;
  @ApiProperty({description: "Enterprise legal status"})
  legalStatus: string;
  @ApiProperty({description: "Enterprise social capital"})
  socialCapital: number;
}