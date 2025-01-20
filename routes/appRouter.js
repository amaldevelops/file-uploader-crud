import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

const AppRouter = Router();

AppRouter.get("/", getHome);

export default AppRouter;
