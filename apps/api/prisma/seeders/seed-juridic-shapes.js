"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedJuridicShape = seedJuridicShape;
const client_1 = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
async function seedJuridicShape() {
    const juridicShapes = await prisma.juridicShape.count();
    if (juridicShapes == 0) {
        const sqlFilePath = path.join(__dirname, '../sql/juridicShapes.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        await prisma.$executeRawUnsafe(sql);
    }
}
//# sourceMappingURL=seed-juridic-shapes.js.map