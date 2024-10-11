import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/dto/auth/auth.dto';
import { RefreshSessionDto } from 'src/dto/auth/refresh-session.dto';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import type { UserWithEnterprise } from '../types/user';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  // -- Methods --

  /*
    Authenticated the user by credentials (email, password).
    If credentials are invalid return null. Otherwise, return the user with token and refreshToken.
  */
  async login(email: string, password: string): Promise<AuthDto> {
    const user = await this.findUserByEmail(email);

    if (user === null)
      throw new HttpException('Credentials invalids', HttpStatus.BAD_REQUEST);

    // Check password
    const check = bcrypt.compareSync(password, user.password);
    if (!check)
      throw new HttpException('Credentials invalids', HttpStatus.BAD_REQUEST);

    // Generate tokens
    return this.authenticated(user);
  }

  /*
      Register the user and authenticated it.
  */
  async create(model: CreateUserDto) {
    // Check if user already exists
    const user = this.findUserByEmail(model.email);
    if (user !== null) throw 'User already exist';

    // Generate salt and hash password
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(model.password, passwordSalt);

    // Create user
    const userCreated = await this.prisma.user.create({
      data: {
        ...model,
        passwordSalt: passwordSalt,
        password: passwordHash,
        isEnterprise: true,
      },
    });

    // Generate tokens
    return this.authenticated({ ...userCreated, enterprise: undefined });
  }

  /*
      Logout the user. (Remove refreshToken)
  */
  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  /*
      Refresh the session of the user.
  */
  async currentUser(refresh: RefreshSessionDto) {
    const user = await this.findUserByRefreshToken(refresh.refreshToken);
    if (user === null) throw new UnauthorizedException();

    return await this.authenticated(user);
  }

  async findUserById(id: number) {
    await this.prisma.user.findFirst({
      where: { id },
    });
  }

  // -- Tools --

  private findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        enterprise: true,
      },
    });
  }

  private async authenticated(user: UserWithEnterprise): Promise<AuthDto> {
    const tokens = await this.authService.generateToken(user);
    return {
      user: {
        ...user,
        enterprise: user.enterprise
          ? {
              ...user.enterprise,
              numberTVA: user.enterprise.TVANumber,
              juridicShape: user.enterprise.juridicShapeId,
              socialCapital: 0,
            }
          : null,
      },
      token: tokens.token,
      refreshToken: tokens.refreshToken,
    };
  }

  private findUserByRefreshToken(refreshToken: string) {
    return this.prisma.user.findFirst({
      where: { refreshToken },
      include: {
        enterprise: true,
      },
    });
  }
}
