import type { UserData } from "../users";

export type LoginData = {
  email: string;
  password: string;
}

export type RefreshSessionData = {
  token: string;
  refreshToken: string;
}

export type UserInformationData = {
  token: string;
  refreshToken: string;
  user: UserData
}