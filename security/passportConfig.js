import passport from "passport";

import LocalStrategy from "passport-local";

import bcrypt from "bcryptjs";

import { prisma } from "../app.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { findUser } = await prisma.username.findMany();
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

export { passport };
