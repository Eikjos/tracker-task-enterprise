import type { UserData } from "../users";

export type LoginData = {
  email: string;
  password: string;
}

export type RefreshSessionData = {
  refreshToken: string;
}

export type RefreshSessionResponse = {
  refreshToken: string;
  token: string; 
}

export type UserInformationData = {
  user: UserData
} & RefreshSessionResponse;