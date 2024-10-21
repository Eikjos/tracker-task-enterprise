import type { UserData } from "@repo/models";

export interface UserInformation {
  user?: UserData;
  token?: string;
  refreshToken?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
}
