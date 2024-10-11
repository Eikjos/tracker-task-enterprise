export type EnterpriseInformation = {
  id: number;
  name: string;
  siret: string;
  address: string;
  zipCode: string;
  city: string;
  numberTVA: string;
  juridicShape: string;
  socialCapital?: number;
};

export type EnterpriseCreateModel = {
  email: string;
  phone: string;
} & Omit<EnterpriseInformation, "id">;
