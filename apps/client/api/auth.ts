import type { UserInformationData } from "@repo/models";
import client from "./client";

export const login = (email: string, password: string) =>
  client
    .post("api/login", { json: { email, password } })
    .then((r) => r.json<UserInformationData>());

export const logout = () => client.post("api/logout");

export const currentUser = (refreshToken: string) =>
  client
    .post("api/users/@me", { json: { refreshToken } })
    .then((r) => r.json<UserInformationData>());
