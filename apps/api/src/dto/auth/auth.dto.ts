import { UserInformationData } from "@repo/models";
import { UserDto } from "../users/user.dto";
import { RefreshSessionResponseDto } from "./refresh-session.dto";

export class AuthDto extends RefreshSessionResponseDto implements UserInformationData {
  user: UserDto;
}