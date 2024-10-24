import { CustomerModel } from '@repo/models';

export class CustomerDto implements CustomerModel {
  id: number;
  name: string;
  siret: string;
  TVANumber?: string | undefined;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
}
