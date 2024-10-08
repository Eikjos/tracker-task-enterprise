"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seed_juridic_shapes_1 = require("./seed-juridic-shapes");
const seed_user_1 = require("./seed-user");
async function main() {
    console.log('Seeding data...');
    await (0, seed_user_1.seedUsers)();
    console.log('Seeded users.');
    await (0, seed_juridic_shapes_1.seedJuridicShape)();
    console.log('Seed juridic shapes');
    console.log('All seeds executed successfully.');
}
main()
    .then(async () => {
    console.log('Seeding complete.');
    process.exit(0);
})
    .catch(async (e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map