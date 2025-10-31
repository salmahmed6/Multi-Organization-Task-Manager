import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only .jpg, .png, and .pdf files are allowed!"), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
