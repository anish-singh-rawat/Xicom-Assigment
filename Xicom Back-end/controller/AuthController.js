import UserModel from "../models/userModel.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storagePDF = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pdf");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImage = multer({ storage: storageImages });
const uploadPDF = multer({ storage: storagePDF });

export const registerUser = async (req, res) => {
  try {
    if (!req.body.documents.fileType || !req.body.documents.file || !req.body.documents.fileName){
      return res.status(400).json({ message: "Please provide user documents" });
    }
    let uploadHandler;
    if (req.body.documents.fileType === "image") {
      uploadHandler = uploadImage.single("file");
    } else if (req.body.documents.fileType === "pdf") {
      uploadHandler = uploadPDF.single("file");
    } else {
      return res.status(400).json({ message: "Invalid file type" });
    }

    uploadHandler(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading file", error: err });
      }

      const { firstName, lastName, dob, email, residentialAddress, permanentAddress } = req.body;

      if (!firstName || !lastName || !dob || !email || !residentialAddress.street1 || !permanentAddress.street1) {
        return res.status(402).json({ message: "Please provide all required data" });
      }

      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new UserModel({
        firstName,
        lastName,
        dob,
        email,
        residentialAddress,
        permanentAddress,
        documents: {
          filePath: `${process.env.API_URL}/${req.file.path}`,
          fileName: req.file.filename,
          fileType: req.body.documents.fileType,
        },
      });

      await newUser.save();

      return res.status(200).json({
        message: "User registered successfully",
        user: newUser,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
