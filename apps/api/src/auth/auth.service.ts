import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RefreshSessionResponseDto } from 'src/dto/auth/refresh-session.dto';
import { PrismaService } from 'src/prisma.service';
import { UserWithEnterprise } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // -- Methods --

  /*
      Permet de générer le token JWT pour l'utilisateur et le refreshToken associé.
  */
  async generateToken(
    user: UserWithEnterprise,
  ): Promise<RefreshSessionResponseDto> {
    const payload = {
      sub: user.id,
      enterpriseId: user.enterprise?.id ?? null,
    };
    return {
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '30m',
      }),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  // -- Tools --
  private async generateRefreshToken(user: User) {
    const payload = { sub: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'REFRESHTOKENSECRET__',
      expiresIn: '7 days',
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return refreshToken;
  }
}
