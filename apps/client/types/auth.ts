export interface UserInformation {
  user?: {id: number},
  token?: string,
  refreshToken?: string
  isLoading: boolean;
  isAuthenticated: boolean;
}