import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export async function seedJuridicShape() {
  const juridicShapes = await prisma.juridicShape.count();
  if (juridicShapes == 0) {
      const sqlFilePath = path.join(__dirname, '../sql/juridicShapes.sql'); // Chemin vers votre fichier SQL
      const sql = fs.readFileSync(sqlFilePath, 'utf8');
      // Exécuter les requêtes SQL
      await prisma.$executeRawUnsafe(sql);
  }
}
