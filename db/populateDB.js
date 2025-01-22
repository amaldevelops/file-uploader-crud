import { prismaClientInstance } from "./prismaQuery.js";

export async function main() {
  console.log("Seed to Database");

  await prismaClientInstance.Users.createMany({
    data: [
      { user_name: "maverick@gmail.com", password: "20252025" },
      { user_name: "hello@gmail.com", password: "20252025" },
      { user_name: "goose@gmail.com", password: "20252025" },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prismaClientInstance.$disconnect();
  });
