import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, process.env.HOME_FOLDER);

async function ensureUploadPath() {
  try {
    await fs.mkdir(uploadPath, { recursive: true });
    console.log(__dirname);
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadPath();
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage });

export const getUploadPath = () => uploadPath;

export const listUploadedFiles = async () => {
  try {
    const files = await fs.readdir(uploadPath);
    return files.map((file) => ({
      name: file,
      url: `uploads/${file}`,
      path: path.join(uploadPath, file),
    }));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};
