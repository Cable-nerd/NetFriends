import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/images");
    console.log("Upload path: ", uploadPath); // Add this line to log the upload path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log("File name: ", req.body.name); // Add this line to log the file name
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  console.log("Upload route middleware called");
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("File upload failed");
  }
});

export default router;


// for frontend 
// ../../client/public/images

// for backend
// ../public/images




