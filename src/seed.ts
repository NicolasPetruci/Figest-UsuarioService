import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('#Anitinha', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@figest.com' },
    update: {
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@figest.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  
  console.log('Seed executado. Usuário admin criado/atualizado com sucesso.');
  console.log(admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
