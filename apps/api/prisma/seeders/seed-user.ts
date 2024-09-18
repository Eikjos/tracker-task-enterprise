import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hashSync('azeqsdwxc.2025', salt);
    await prisma.user.createMany({
      data: [
        { email: 'thomashamelin3@gmail.com', firstName: 'Bernard', lastName: 'Dupont', isEnterprise: true, password : password, passwordSalt: salt },
      ],
    });
  }
}
