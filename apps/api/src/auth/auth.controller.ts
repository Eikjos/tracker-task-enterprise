import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dto/auth/auth.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { UserService } from '../users/user.service';

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(private readonly userService : UserService) {}

  @Post("/api/login")
  @HttpCode(200)
  @ApiBody({
    type: LoginDto
  })
  async login(@Body() loginData : LoginDto)  : Promise<AuthDto> {
    return await this.userService.login(loginData.email, loginData.password);
  }
}
