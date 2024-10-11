import { Enterprise, User } from '@prisma/client';

export type UserWithEnterprise = {
  enterprise?: Enterprise | null;
} & User;
