import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { getFileUpload,authenticateUser,testPrisma } from "../controllers/AppController.js";

// import { authenticateUser } from "../controllers/AppController.js";

import { passportInstance } from "../security/passportConfig.js";

const AppRouter = Router();

AppRouter.get("/", getHome);

// AppRouter.get("/uploadfiles", getFileUpload);

AppRouter.post("/uploadfiles",authenticateUser);

// AppRouter.get("/notauthorized")

AppRouter.get("/new", testPrisma)

export default AppRouter;
