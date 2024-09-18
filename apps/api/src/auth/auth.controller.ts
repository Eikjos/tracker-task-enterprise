import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { LoginData, UserInformationData } from '@repo/models';
import { UserService } from '../users/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService : UserService) {}

  @Post("/api/login")
  @HttpCode(200)
  async login(@Body() loginData : LoginData)  : Promise<UserInformationData> {
    return await this.userService.login(loginData.email, loginData.password);
  }
}
