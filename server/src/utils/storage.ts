import multer, { diskStorage } from "multer";

const storageDisk = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "dist/assets/images");
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split("/");
    const fileType = mimeType[1];
    const fileName = `${file.originalname}.${fileType}`;
    cb(null, fileName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

export const storage = multer({
  storage: storageDisk,
  fileFilter: fileFilter,
}).single("image");
