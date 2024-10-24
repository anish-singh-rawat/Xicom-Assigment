import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';
import dotenv from "dotenv";
dotenv.config()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
export const addProfileImage = async (req, res) => {
  upload.single('photo')(req, res, async function (err) {
      const imagePath = `${process.env.API_URL}${req.file.path}`
      const filename = req.file.filename;
      const originalname = req.file.originalname;
      if (err) {
          return res.status(500).send({ message: 'Error uploading file', error: err });
      }
      else {
          return res.status(200).send({ message: "Product image uploaded successfully", imagePath: imagePath, filename: filename, originalname: originalname });
      }
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password, imagePath } = req.body;
  if (!username || !email, !password || !imagePath) {
    return res.status(402).json({ message: "Please provide all data" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await newUser.save();
    const token = jwt.sign({ email: user.email,  username: user.username, id: user._id , profileImage : imagePath }, process.env.JWTKEY);
    return res.status(200).json({ user, token, message: "user register successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "please provide all data" });
  }
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        return res.status(401).json({ message: "wrong password" });
      } else {
        const token = jwt.sign({  username: user.username, admin : user.isAdmin, email: user.email, id: user._id }, process.env.JWTKEY);
        return res.status(200).json({ user, token, message: "user login successfully", success: true });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
