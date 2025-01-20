import express from "express";

const app = express();

import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

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

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`File Uploader Running on localhost:${process.env.APP_PORT}`);
});
