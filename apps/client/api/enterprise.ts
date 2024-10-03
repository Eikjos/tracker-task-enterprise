import type {
  EnterpriseCreateModel,
  EnterpriseInformation,
} from "@repo/models";
import client from "./client";

export const createEnterprise = (json: EnterpriseCreateModel) =>
  client.post("api/enterprise", { json });

export const getInformationBySiret = (siret: string) =>
  client
    .get("api/enterprise/information", { searchParams: { siret } })
    .json<EnterpriseInformation>();
