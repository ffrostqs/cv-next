const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const locales = [
    { code: "de", name: "Deutsch", isDefault: true },
    { code: "en", name: "English", isDefault: false },
  ];

  for (const locale of locales) {
    await prisma.locale.upsert({
      where: { code: locale.code },
      update: locale,
      create: locale,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
