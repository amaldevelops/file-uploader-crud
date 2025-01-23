import { Router } from "express";

import multer from "multer";
const upload_files = multer({ dest: "/home/amal/Downloads/multer_uploads" });

import { passportInstance } from "../security/passportConfig.js";

import passport from "passport";

import { getHome } from "../controllers/AppController.js";

import { ValidateUserLogin } from "../validators/signInFormValidation.js";

import {
  getFileUpload,
  postUploadFiles,
  authenticateUser,
  getNotAuthorized,
  formValidationSignIn,
  currentFileList,
} from "../controllers/AppController.js";

const AppRouter = Router();

AppRouter.get("/", getHome);

AppRouter.post(
  "/uploadfiles",
  ValidateUserLogin,
  formValidationSignIn,
  passport.authenticate("local", {
    failureRedirect: "/notauthorized",
  }),
  currentFileList
);

AppRouter.get(
  "/uploadfiles",
  passport.authenticate("local", { failureRedirect: "/notauthorized" }),
  currentFileList
);

AppRouter.get("/notauthorized", getNotAuthorized);

AppRouter.get("/files", currentFileList);

AppRouter.post(
  "/fileuploaded",
  upload_files.single("file_upload"),
  postUploadFiles
);

export default AppRouter;
