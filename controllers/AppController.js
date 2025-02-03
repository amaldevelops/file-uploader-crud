import { validationResult } from "express-validator";
import { prismaClientInstance } from "../db/prismaQuery.js";

// import { getUploadPath } from "../storage/fileSystemAccess.js";

import { upload, deleteFileByHashedName } from "../storage/fileSystemAccess.js";

import {
  CreateFolderDb,
  RenameFolderDb,
  DeleteFolderDb,
  readFileListDb,
  fileInfoDb,
  addFileInfoToDb,
  renameFileInfoDb,
  MoveFileToFolderDb,
  deleteFileInfoDb,
} from "../db/prismaQuery.js";

export async function getHome(req, res, next) {
  res.render("index");
}

export async function getFileUpload(req, res, next) {
  res.render("uploadFiles");
}

export async function authenticateUser(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect("/notauthorized");
  } catch (err) {
    console.error("Authentication Error");
    return next(err);
  }
}

export async function getNotAuthorized(req, res, next) {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Failed to Log out !");
    }
    return res.render("notAuthorized");
  });
}

export async function formValidationSignIn(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        errors: errors.array(),
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

export async function currentFileList(req, res, next) {
  try {
    const currentFileList = await readFileListDb();
    const CurrentlyLoggedUser = req.user;
    res.render("uploadFiles", {
      currentFileList: currentFileList,
      loggedUser: CurrentlyLoggedUser.user_name,
    });
  } catch (err) {
    next(err);
  }
}

export async function postUploadFiles(req, res, next) {
  console.log(req.body.folder_names);
  const uploadedFileDetailsObject = req.file;
  const folder_name = req.body.folder_names;

  await addFileInfoToDb(uploadedFileDetailsObject, folder_name);

  res.render("fileuploaded", { uploadedFileDetails: req.file });
}

export async function deleteFile(req, res, next) {
  try {
    const deleteFileName = req.hashed_file_name;
  } catch (err) {
    next(err);
  }
}

export async function getFileInfo(req, res, next) {
  const fileId = req.params;
  const returnedFileInfo = await fileInfoDb(fileId.fileId);
  const currentFileList = await readFileListDb();
  res.render("fileInfo", {
    returnedFileInfo: returnedFileInfo,
    currentFileList: currentFileList,
  });
}

export async function postCreateFolder(req, res, next) {
  const newFolderName = req.body.newFolderName;

  CreateFolderDb(newFolderName);

  res.render("folderCreated");
}

export async function postRenameFolder(req, res, next) {
  try {
    res.render("folderRenamed");
  } catch (err) {
    next(err);
  }
}

export async function postDeleteFolder(req, res, next) {
  try {
    res.render("folderDeleted");
  } catch (err) {
    next(err);
  }
}

export async function postDownloadFile(req, res, next) {
  try {
    const filePath = req.body.fileName;
    res.download(filePath);
  } catch (err) {
    next(err);
  }
}

export async function postRenameFile(req, res, next) {
  try {
    res.render("fileRenamed");
  } catch (err) {
    next(err);
  }
}

export async function postMoveFile(req, res, next) {
  try {
    res.render("fileMoved");
  } catch (err) {
    next(err);
  }
}

export async function postDeleteFile(req, res, next) {
  try {
    const fileHashToBeDeleted = req.body.file_name;
    deleteFileInfoDb(fileHashToBeDeleted);
    deleteFileByHashedName(fileHashToBeDeleted);
    res.render("fileDeleted");
  } catch (err) {
    next(err);
  }
}
