import { PrismaClient } from '@prisma/client';
import { GATINHOS } from './Gatinhos';

const prisma = new PrismaClient();
//para rodar -> npm run seed
async function main() {
  await prisma.pacotefig.create({data:{}});
  
  await prisma.gaturinha.createMany({data: GATINHOS});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
