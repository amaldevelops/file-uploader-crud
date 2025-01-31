import { Router } from "express";

import {upload} from "../storage/fileSystemAccess.js";
// const upload_files = multer({ dest: process.env.HOME_FOLDER });

import { passportInstance, passport } from "../security/passportConfig.js";

import { getHome } from "../controllers/AppController.js";

import { ValidateUserLogin } from "../validators/signInFormValidation.js";

import {
  getFileUpload,
  postUploadFiles,
  authenticateUser,
  getNotAuthorized,
  formValidationSignIn,
  currentFileList,
  getFileInfo,
  postCreateFolder,
  postRenameFolder,
  postDeleteFolder,
  postDownloadFile,
  postRenameFile,
  postMoveFile,
  postDeleteFile
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

AppRouter.get("/uploadfiles", authenticateUser, currentFileList);

AppRouter.get("/notauthorized", getNotAuthorized);

AppRouter.get("/files", currentFileList);

AppRouter.post(
  "/fileuploaded",
  upload.single("file_upload"),
  postUploadFiles
);

AppRouter.post("/foldercreated", postCreateFolder);

AppRouter.get("/fileinfo/:fileId", authenticateUser, getFileInfo);

export default AppRouter;
