import { ApiProperty } from "@nestjs/swagger";
import { UserData } from "@repo/models";

export class UserDto implements UserData {
  @ApiProperty({description: "User id"})
  id: number;
  @ApiProperty({description: "User firstname"})
  firstName: string;
  @ApiProperty({description: "User lastname"})
  lastName: string;
  
}