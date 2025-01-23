import { Router } from "express";

import { getHome } from "../controllers/AppController.js";

import { ValidateUserLogin } from "../validators/signInFormValidation.js";

import {
  getFileUpload,
  postUploadFiles,
  authenticateUser,
  getNotAuthorized,
  formValidationSignIn,
} from "../controllers/AppController.js";

import multer from 'multer';
const upload_files=multer({dest:'/home/amal/Downloads/multer_uploads'})

import { passportInstance } from "../security/passportConfig.js";
import passport from "passport";

const AppRouter = Router();

AppRouter.get("/", getHome);

// AppRouter.get("/uploadfiles", getFileUpload);

AppRouter.post(
  "/uploadfiles",
  ValidateUserLogin,
  formValidationSignIn,
  passport.authenticate("local", { failureRedirect: "/notauthorized" }),
  authenticateUser
);

AppRouter.get("/notauthorized", getNotAuthorized);

AppRouter.post("/fileuploaded", upload_files.single('file_upload'), postUploadFiles)

export default AppRouter;
