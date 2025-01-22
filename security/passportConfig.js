import passport from "passport";

import LocalStrategy from "passport-local";

import bcrypt from "bcryptjs";

import { prismaClientInstance } from "../db/prismaQuery.js";

const passportInstance = passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { findUser } = await prismaClientInstance.username.findUnique({
        where: {
          email: username,
        },
      });
      console.log(findUser);

      const user = findUser[0];

      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await prisma.username.findUnique({
      where: {
        id: 2,
      },
    });
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export { passportInstance };
