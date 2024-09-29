import type { EnterpriseInformation } from "@repo/models";
import client from "./client";

export const getInformationBySiret = (siret : string) => 
  client.get("api/enterprise/information", { searchParams : { siret }}).json<EnterpriseInformation>();