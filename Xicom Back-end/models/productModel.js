import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filename: { type: String },
  imagePath: { type: String },
  originalname: { type: String }
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;