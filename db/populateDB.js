import { prismaClientInstance } from "./prismaQuery.js";

import bcryptjs from "bcryptjs";

export async function main() {
  console.log("Seed to Database");

  const users = [
    { user_name: "maverick@gmail.com", password: "20252025" },
    { user_name: "hello@gmail.com", password: "20252025" },
    { user_name: "goose@gmail.com", password: "20252025" },
  ];

  const FileDetails = [
    {
      Original_file_name: "Prism ORM",
      hashed_file_name: "fs3fgg3gfgjndf23",
      file_url: "/home/storage/fs3fgg3gfgjndf23",
      file_size: "2Mb",
      folder_name: "/",
    },
    {
      Original_file_name: "NodeJs",
      hashed_file_name: "4gdf4334j32fg",
      file_url: "/home/storage/Node/4gdf4334j32fg",
      file_size: "5Mb",
      folder_name: "/Node",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    console.log(hashedPassword);

    await prismaClientInstance.Users.createMany({
      data: [{ user_name: user.user_name, password: hashedPassword }],
      skipDuplicates: true,
    });
  }

  await prismaClientInstance.FileDetails.createMany({
    data: FileDetails,
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
