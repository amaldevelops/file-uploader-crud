import { prisma } from "../app.js";

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
