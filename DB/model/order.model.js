import { Schema, model, Types } from "mongoose"

const orderSchema = new Schema(
  {

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "can not add order without owner"],
    },
    products:{
        type:[{
            productId:{
                type:Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                default:1
            }
        }]
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    finalPrice:{
        type:Number,
        required:true
    },
    coupon:{
        type:Types.ObjectId,
        ref:'Coupon'
    },
    status:{
        type:String,
        enum:['placed','received'],
        default:'placed'
    },
    payment:{
        type:String,
        enum:['cash','visa'],
        default:'cash'
    }
   
  },
  {
    timestamps: true,
  }
)

const OrderModel = model("Order", orderSchema)
export default OrderModel
