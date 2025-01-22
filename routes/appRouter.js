import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { getFileUpload,authenticateUser,testPrisma } from "../controllers/AppController.js";

// import { authenticateUser } from "../controllers/AppController.js";

import { passportInstance } from "../security/passportConfig.js";
import passport from "passport";

const AppRouter = Router();

AppRouter.get("/", getHome);

// AppRouter.get("/uploadfiles", getFileUpload);

AppRouter.post("/uploadfiles",passport.authenticate("local",{failureRedirect:"/"}),authenticateUser);

// AppRouter.get("/notauthorized")

AppRouter.get("/new", testPrisma)

export default AppRouter;
