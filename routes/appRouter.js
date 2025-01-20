import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { getFileUpload } from "../controllers/AppController.js";

const AppRouter = Router();

AppRouter.get("/", getHome);

AppRouter.get("/uploadfiles",getFileUpload )

export default AppRouter;
