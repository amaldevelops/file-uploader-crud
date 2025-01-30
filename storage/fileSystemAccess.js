import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, process.env.HOME_FOLDER);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadPath, { recursive: true });
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

//File system Operations

export const getUploadPath = () => uploadPath;

export const listUploadedFiles = async () => {
  try {
    const files = await fs.promises.readdir(upload);
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
