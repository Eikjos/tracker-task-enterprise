import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dto/auth/auth.dto';
import { RefreshSessionDto } from 'src/dto/auth/refresh-session.dto';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserDto,
  })
  async register(@Body() user: CreateUserDto): Promise<AuthDto> {
    return await this.userService.create(user);
  }

  @Post('@me')
  @HttpCode(200)
  @ApiBody({
    type: RefreshSessionDto,
  })
  async currentUser(@Body() refresh: RefreshSessionDto) {
    return await this.userService.currentUser(refresh);
  }
}
