import type { CreateCustomer, CustomerModel } from "@repo/models";
import client from "./client";

export const findAllCustomer = () =>
  client.get("api/customers").json<CustomerModel[]>();

export const createCustomer = (json: CreateCustomer) =>
  client.post("api/customers", { json });
