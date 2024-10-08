"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function seedUsers() {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hashSync('azeqsdwxc.2025', salt);
        await prisma.user.createMany({
            data: [
                {
                    email: 'thomashamelin3@gmail.com',
                    firstName: 'Bernard',
                    lastName: 'Dupont',
                    isEnterprise: true,
                    password: password,
                    passwordSalt: salt,
                },
            ],
        });
    }
}
//# sourceMappingURL=seed-user.js.map