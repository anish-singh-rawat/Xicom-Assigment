import UserModel from "../models/userModel.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const storagePDF = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/pdf");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const uploadPDF = multer({
  storage: storagePDF,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImg = multer({
  storage: storageImg,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const registerUserPDF = async (req, res) => {
  try {
    uploadPDF.single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).send({
          message: "Error uploading file",
          error: err.message || "Unknown error occurred",
        });
      }
      return res.status(200).send({
        message: "PDF file uploaded successfully",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const registerUserImage = async (req, res) => {
  try {
    uploadImg.single("file")(req, res, (err) => {
      if (err) {
        return res.status(500).send({
          message: "Error uploading file",
          error: err.message || "Unknown error occurred",
        });
      }
      return res.status(200).send({
        message: "PDF file uploaded successfully",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      email,
      residentialAddress,
      permanentAddress,
      isSameAsResidential,
      documents,
    } = req.body;

    if (isSameAsResidential == false) {
      if (!permanentAddress.street1 || !permanentAddress.street2) {
        return res
          .status(200)
          .json({
            message: "Please provide all required data of parmanent address",
          });
      }
    }

    if (
      !firstName ||
      !lastName ||
      !dob ||
      !email ||
      !residentialAddress.street1 ||
      !residentialAddress.street1 ||
      !documents.fileType ||
      !documents.fileName
    ) {
      return res
        .status(200)
        .json({ message: "Please provide all required fields" });
    }

    if (req.body.documents.fileType === "image") {
      uploadImg.single("file")(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: "Error uploading file",
            error: err.message || "Unknown error occurred",
          });
        }

        return res.status(200).send({
          message: "PDF file uploaded successfully",
        });
      });
    } else if (req.body.documents.fileType === "pdf") {
      uploadPDF.single("file")(req, res, (err) => {
        if (err) {
          return res.status(500).send({
            message: "Error uploading file",
            error: err.message || "Unknown error occurred",
          });
        }

        return res.status(200).send({
          message: "PDF file uploaded successfully",
        });
      });
    } else {
      return res.status(200).json({ message: "Invalid file type" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const newUser = new UserModel({
      firstName,
      lastName,
      dob,
      email,
      residentialAddress,
      permanentAddress,
      documents: {
        file: `${process.env.API_URL}/${req.file.path}`,
        fileName: req.file.filename,
        fileType: req.body.documents.fileType,
      },
    });

    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
