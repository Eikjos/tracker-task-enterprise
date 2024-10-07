import { ApiProperty } from '@nestjs/swagger';
import { EnterpriseInformation, UserData } from '@repo/models';

export class UserDto implements UserData {
  @ApiProperty({ description: 'User id' })
  id: number;
  @ApiProperty({ description: 'User firstname' })
  firstName: string;
  @ApiProperty({ description: 'User lastname' })
  lastName: string;
  @ApiProperty({ description: 'User is enteprise' })
  isEnterprise: boolean;
  @ApiProperty({ description: 'User is customer' })
  isCustomer: boolean;
  @ApiProperty({ description: 'User enterprise information' })
  enterprise: EnterpriseInformation;
}
