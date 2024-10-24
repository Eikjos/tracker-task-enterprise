export type CreateCustomer = {
  name: string;
  siret?: string;
  TVANumber?: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
};

export type CustomerModel = {
  id: number;
  name: string;
  siret: string;
  TVANumber?: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
};
