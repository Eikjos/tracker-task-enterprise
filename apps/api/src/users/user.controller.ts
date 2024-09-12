import { Body, Controller, Post } from '@nestjs/common';
import type { LoginData, RefreshSessionData, UserInformationData } from '@repo/models';
import { UserRegister } from '@repo/models/users';
import { UserService } from './user.service';

@Controller("api/users")
export class UsersController {
  constructor(private readonly userService : UserService) {}

  @Post("register")
  async register(@Body() user : UserRegister) : Promise<UserInformationData>  {
    return await this.userService.create(user);
  }

  @Post("/api/login")
  async login(@Body() loginData : LoginData)  : Promise<UserInformationData> {
    return await this.userService.login(loginData.email, loginData.password);
  }

  @Post("@me")
  async currentUser(@Body() refresh : RefreshSessionData) {
    return await this.userService.currentUser(refresh);
  }
}
