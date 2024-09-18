import { seedUsers } from "./seed-user";


async function main() {
  console.log('Seeding data...');

  await seedUsers();
  console.log('Seeded users.');

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
