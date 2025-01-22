import { prismaClientInstance } from "./prismaQuery.js";

import bcryptjs from "bcryptjs";

export async function main() {
  console.log("Seed to Database");

  const users = [
    { user_name: "maverick@gmail.com", password: "20252025" },
    { user_name: "hello@gmail.com", password: "20252025" },
    { user_name: "goose@gmail.com", password: "20252025" },
  ];

  for (const user of users) {
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    console.log(hashedPassword);

    await prismaClientInstance.Users.createMany({
      data: [{ user_name: user.user_name, password: hashedPassword }],
      skipDuplicates: true,
    });
  }
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prismaClientInstance.$disconnect();
  });
