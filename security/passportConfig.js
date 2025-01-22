import passport from "passport";

import LocalStrategy from "passport-local";

import bcrypt from "bcryptjs";

import { prismaClientInstance } from "../db/prismaQuery.js";

const passportInstance = passport.use(
  new LocalStrategy(
    {
      usernameField: "user_name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const findUser = await prismaClientInstance.users.findUnique({
          where: {
            user_name: username,
          },
        });
        console.log(findUser);

        if (!findUser) {
          return done(null, false, { message: "Incorrect Username" });
        }

        const match = await bcrypt.compare(password, findUser.password);

        if (!match) {
          console.log("Incorrect Password");
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, findUser);
      } catch (error) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prismaClientInstance.username.findUnique({
      where: { id },
    });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export { passportInstance };
