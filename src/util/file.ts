import OSS from "ali-oss";
import multer from "multer";
import { FILE_BUCKET, FILE_ENDPOINT } from "../const/config";
import { FILE_ACCESSKEY_ID, FILE_ACCESSKEY_SECRET } from "../../local_config";

export const fileUpLoadToOSS = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/upload`);
    },
    filename: function (req, file, cb) {
      cb(null, `keyme-${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 2 } });

  return upload.single("singleFile");

  const client = new OSS({
    endpoint: FILE_ENDPOINT,
    accessKeyId: FILE_ACCESSKEY_ID,
    accessKeySecret: FILE_ACCESSKEY_SECRET,
    bucket: FILE_BUCKET,
  });
};
