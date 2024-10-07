import { ApiProperty } from '@nestjs/swagger';
import { UserRegister } from '@repo/models';

export class CreateUserDto implements UserRegister {
  @ApiProperty({ description: 'User first name' })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  lastName: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
