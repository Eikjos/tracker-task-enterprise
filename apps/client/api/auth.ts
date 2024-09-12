import { type UserInformationData } from "@repo/models";
import client from "./client";

export const login = (email : string, password : string) => 
  client.post<UserInformationData>('api/login', {json: { email, password}}).json();

export const logout = () => {
  client.post("api/logout");
}

export const currentUser = (token: string, refreshToken: string) => 
  client.post<UserInformationData>("api/users/me", { json: { token, refreshToken }}).json();