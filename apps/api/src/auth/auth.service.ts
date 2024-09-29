import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { RefreshSessionResponseDto } from "src/dto/auth/refresh-session.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma : PrismaService, private readonly jwtService : JwtService) {}

  // -- Methods --
  
  /*
      Permet de générer le token JWT pour l'utilisateur et le refreshToken associé.
  */
  async generateToken(user : User) : Promise<RefreshSessionResponseDto> {
    const payload = { sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
      refreshToken: await this.generateRefreshToken(user)
    };
  }

  // -- Tools --
  private async generateRefreshToken(user : User) {
    const payload = { sub : user.id }
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: "REFRESHTOKENSECRET__",
      expiresIn: '7 days'
    })

    await this.prisma.user.update({
      where: { id : user.id},
      data: { refreshToken },
    })

    return refreshToken;
  }

}