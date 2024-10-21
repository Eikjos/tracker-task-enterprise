import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomer } from '@repo/models';

export default class CustomerCreateDto implements CreateCustomer {
  @ApiProperty({ description: 'customer name' })
  name: string;
  @ApiProperty({ description: 'customer siret' })
  siret?: string | undefined;
  @ApiProperty({ description: 'customer TVA number' })
  TVANumber?: string | undefined;
  @ApiProperty({ description: 'customer address' })
  address: string;
  @ApiProperty({ description: 'customer city' })
  city: string;
  @ApiProperty({ description: 'customer zipcode' })
  zipCode: string;
  @ApiProperty({ description: 'customer country' })
  country: string;
  @ApiProperty({ description: 'customer email' })
  email: string;
  @ApiProperty({ description: 'customer phone' })
  phone: string;
}
