import { prismaClientInstance } from "../db/prismaQuery.js";

export async function getHome(req, res, next) {
  res.render("index");
}

export async function getFileUpload(req, res, next) {
  res.render("uploadFiles");
}

export async function authenticateUser(req, res, next) {
  const userSubmittedDetails = {
    user_name: req.body.user_name,
    password: req.body.password,
  };
  console.log(userSubmittedDetails);
  res.render("uploadFiles");
}

export async function testPrisma(req, res, next) {
  const findUser = await prismaClientInstance.users.findUnique({
    where: {
      user_name: "hello@gmail.com",
    },
  });
  console.log(findUser);

  res.send("Hey test Prisma !");
}
