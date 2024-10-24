import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        filename: { type: String },
        imagePath: { type: String },
        originalname: { type: String }
    },
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
