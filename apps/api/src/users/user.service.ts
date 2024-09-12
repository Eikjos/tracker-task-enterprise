import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { RefreshSessionData, UserInformationData } from '@repo/models';
import { UserRegister } from '@repo/models/users';
import * as bcrypt from "bcrypt";
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma : PrismaService, private readonly authService : AuthService) {}

  // -- Methods --

  /*
    Authenticated the user by credentials (email, password).
    If credentials are invalid return null. Otherwise, return the user with token and refreshToken.
  */
  async login(email: string, password: string) : Promise<UserInformationData> {
    const user = await this.findUserByEmail(email);

    if (user === undefined)
      return null

    // Check password
    var check = bcrypt.compareSync(password,  user.password);
    if (!check)
      return null;

    // Generate tokens
    return this.authenticated(user);
  }

  /*
      Register the user and authenticated it.
  */
  async create(model : UserRegister) {
    // Check if user already exists
    const user = this.findUserByEmail(model.email);
    if (user !== undefined)
      throw "User already exist"

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
      }
    });

    // Generate tokens
    return this.authenticated(userCreated);
  }

  /*
      Logout the user. (Remove refreshToken)
  */
  async logout(userId : number) {
    await this.prisma.user.update({
      where: {id : userId},
      data: { refreshToken : null }
    });
  }

  /*
      Refresh the session of the user.
  */
  async currentUser(refresh : RefreshSessionData) {
    const user = await this.findUserByRefreshToken(refresh.refreshToken);
    if (user === undefined)
      throw new UnauthorizedException();

    return await this.authenticated(user);
  }

  async findUserById(id : number) {
    await this.prisma.user.findFirst({
      where: { id }
    });
  }

  // -- Tools --

  private async findUserByEmail(email : string) : Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  private async authenticated(user : User) : Promise<UserInformationData> {
    const tokens =  await this.authService.generateToken(user);
    return {
      user : { ...user },
      token: tokens.token,
      refreshToken: tokens.refreshToken
    }
  }

  private async findUserByRefreshToken(refreshToken : string) {
    return await this.prisma.user.findFirst({
      where: { refreshToken }
    })
  }
}