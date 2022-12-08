import { Schema, model, Types } from "mongoose"

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
      trim: [true],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "can not add coupon without owner"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    isDeleted:Boolean,
    deletedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    amount: {
      type: Number,
      default: 1,
      min: [1, "minimum discount 1%"],
      max: [100, "maximum discount 100%"],
    },
    expireDate:{
        type:Date,
        required:[true,'expiration date is required']
    }
  },
  {
    timestamps: true,
  }
)

const CouponModel = model("Coupon", couponSchema)
export default CouponModel
