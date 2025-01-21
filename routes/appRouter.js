import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { getFileUpload } from "../controllers/AppController.js";

// import { main } from "../app.js";
// import { authenticate } from "passport";

import { authenticateUser } from "../controllers/AppController.js";

import { passport } from "../security/passportConfig.js";

const AppRouter = Router();

AppRouter.get("/", getHome);

AppRouter.get("/uploadfiles", getFileUpload);

AppRouter.post("/uploadfiles", authenticateUser);

// AppRouter.get("/seed",main)

export default AppRouter;
