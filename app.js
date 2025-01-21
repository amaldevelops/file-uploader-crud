import express from "express";

import {passport} from "./security/passportConfig.js";

const app = express();

import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

import dotenv from "dotenv";
dotenv.config();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

import AppRouter from "./routes/appRouter.js";
app.use("/", AppRouter);

app.use(passport.session());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 1000, //ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

export async function main() {
  console.log("Seed to Database");

  const saveFileDetails = await prisma.Users.create({
    data: {

      user_name: "maverick@gmail.com",
      password:"20252025"
    },
  });
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`File Uploader Running on localhost:${process.env.APP_PORT}`);
});


export {prisma};