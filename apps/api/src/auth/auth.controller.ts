import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dto/auth/auth.dto';
import { LoginDto } from 'src/dto/auth/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from '../users/user.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/login')
  @HttpCode(200)
  @ApiBody({
    type: LoginDto,
  })
  async login(@Body() loginData: LoginDto): Promise<AuthDto> {
    return await this.userService.login(loginData.email, loginData.password);
  }

  @Post('/api/logout')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async logout(@Request() req: any) {
    return await this.userService.logout(parseInt(req['userId']));
  }
}
