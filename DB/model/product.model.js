import { Schema, model, Types } from "mongoose"

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "product name must be unique"],
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
      trim: [true],
    },
    slug: String,
    description: {
        type: String,
        required: [true, "description is required"],
    },
    stock: { type: Number, required: [true, "stock is required"] },
    price: { type: Number, required: [true, "price is required"] },
    discount: { type: Number },
    finalPrice: { type: Number, required: [true, "final price is required"] },
    colors:[String],
    sizes:{type:[String]},
    images: {
        type: [String],
        required: [true, "images is required"],
    },
    imagesIds: {
        type: [String],
    },
    coverImages: {
        type: [String],
        required: [true, "images is required"],
    },
    coverImagesIds: {
        type: [String],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "can not add product without owner"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User"
    },
    category:{
        type:Types.ObjectId,
        ref:'Category',
        required:[true,'Category id is required']
    },
    subCategory:{
        type:Types.ObjectId,
        ref:'SubCategory',
        required:[true,'SubCategory id is required']
    },
    brand:{
        type:Types.ObjectId,
        ref:'Brand',
        required:[true,'Category id is required']
    },
    avgRate:{
        type:Number
    },
    soldItems: { type: Number},
    totalAmount:Number
  },
  {
    timestamps: true,
  }
)

const ProductModel = model("Product", productSchema)
export default ProductModel
