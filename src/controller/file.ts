import Msg from "../models/msg";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";
import multer from "multer";
import { fileUpLoadToOSS } from "../util/file";
import _ from "lodash";

const FileController = {
  upload: (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(req.file, body);
    return res.json({ code: 0, data: _.omit(file, ["destination", "path"]) });
  },
};

export default FileController;
