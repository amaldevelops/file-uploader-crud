import { PrismaClient } from "@prisma/client";

const prismaClientInstance = new PrismaClient();

export async function main() {
  console.log("Seed to Database");

  const saveFileDetails = await prismaClientInstance.Users.create({
    data: {
      user_name: "maverick@gmail.com",
      password: "20252025",
    },
  });
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prismaClientInstance.$disconnect();
  });

export { prismaClientInstance };
