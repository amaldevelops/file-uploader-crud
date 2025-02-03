import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { unlink } from "node:fs/promises";
import { fileInfoDb } from "../db/prismaQuery.js";
import { supabase } from "./supabaseClient.js"; // Ensure this path is correct

// Get the current filename and dirname for path operations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base Upload Path (HOME_FOLDER from environment or default 'uploads')
const baseUploadPath = path.join(
  __dirname,
  process.env.HOME_FOLDER || "uploads"
);

// Multer Storage Configuration (using memory storage)
const memStorage = multer.memoryStorage(); // Use memory storage to handle files in memory

// Multer upload configuration
export const upload = multer({ storage: memStorage });

// Function to upload file to Supabase Storage
export const storage = async (file, folderName) => {
  const { data, error } = await supabase.storage
    .from("your-bucket-name") // Replace with your Supabase bucket name
    .upload(`${folderName}/${file.originalname}`, file.buffer, {
      contentType: file.mimetype, // Set the content type
    });

  if (error) {
    console.error("Error uploading to Supabase:", error);
    throw error;
  }

  console.log("File uploaded successfully:", data);
  return data;
};

// Function to handle file upload
export const handleFileUpload = async (req, res) => {
  try {
    const folderName = req.body.folder_names || "default"; // Default folder if not provided
    const file = req.file; // Get the uploaded file from the request

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Upload the file to Supabase
    const uploadResponse = await storage(file, folderName);
    res
      .status(200)
      .json({ message: "File uploaded successfully", data: uploadResponse });
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).send("Error uploading file.");
  }
};

// Function to get uploaded files in a specific folder (if needed)
export const listUploadedFiles = async (folderName) => {
  try {
    const { data, error } = await supabase.storage
      .from("your-bucket-name") // Replace with your Supabase bucket name
      .list(folderName);

    if (error) {
      console.error("Error listing files:", error);
      throw error;
    }

    return data.map((file) => ({
      name: file.name,
      url: `https://your-project-ref.supabase.co/storage/v1/object/public/${file.name}`, // Adjust the URL as needed
    }));
  } catch (err) {
    console.error("Error retrieving files:", err);
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
