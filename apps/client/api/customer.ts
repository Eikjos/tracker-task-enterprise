import type { CustomerModel } from "@repo/models";
import client from "./client";

export const findAllCustomer = () =>
  client.get("api/customers").json<CustomerModel[]>();
