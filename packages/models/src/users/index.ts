import type { EnterpriseInformation } from "../enterprises";

export type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  isEnterprise: boolean;
  isCustomer: boolean;
  enterprise: EnterpriseInformation | null;
};
