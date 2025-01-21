import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prismaClientInstance } from "../db/prismaQuery.js";

const prismaSession = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 1000, //ms
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prismaClientInstance, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

export { prismaSession };
