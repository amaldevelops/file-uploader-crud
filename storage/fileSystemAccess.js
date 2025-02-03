import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { unlink } from "node:fs/promises";
import { fileInfoDb } from "../db/prismaQuery.js";
// const supabase = require('./supabaseClient');
// import supabase from "/supabaseClient";

// Get the current filename and dirname for path operations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base Upload Path (HOME_FOLDER from environment or default 'uploads')
const baseUploadPath = path.join(
  __dirname,
  process.env.HOME_FOLDER || "uploads"
);

// Ensure Directory Exists (Sync because Multer does not support async `destination`)
function ensureUploadPath(folderName) {
  console.log(__dirname);
  const folderPath = path.join(baseUploadPath, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.user.user_name);
    const folderName = req.body.folder_names || "default"; // Default folder if not provided

    console.log(folderName);
    // Ensure the folder exists
    const uploadPath = ensureUploadPath(folderName);

    // Set the destination for the uploaded file
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Multer upload configuration
export const upload = multer({ storage });

// Function to get uploaded files in a specific folder
export const listUploadedFiles = async (folderName) => {
  try {
    const folderPath = path.join(baseUploadPath, folderName || "default");
    const files = await fs.promises.readdir(folderPath);
    return files.map((file) => ({
      name: file,
      url: `uploads/${folderName}/${file}`,
      path: path.join(folderPath, file),
    }));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

export async function deleteFileByHashedName(hashedFileName) {
  try {
    console.log(hashedFileName);
    const returnedFileUrl = await fileInfoDb(hashedFileName);
    await unlink(returnedFileUrl.file_url);
    console.log(returnedFileUrl.file_url);
  } catch (err) {
    console.error("There was an error:", err.message);
  }
}
