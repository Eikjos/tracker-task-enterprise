import { ApiProperty } from '@nestjs/swagger';
import { RefreshSessionData, RefreshSessionResponse } from '@repo/models';

export class RefreshSessionDto implements RefreshSessionData {
  @ApiProperty({ description: 'User refresh token' })
  refreshToken: string;
}

export class RefreshSessionResponseDto implements RefreshSessionResponse {
  @ApiProperty({ description: 'User refresh token' })
  refreshToken: string;
  @ApiProperty({ description: 'User JWT token' })
  token: string;
}
