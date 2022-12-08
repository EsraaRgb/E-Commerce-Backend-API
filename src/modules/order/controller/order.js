import { asyncHandler } from "../../../services/handleError.js"
import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
  updateOne,
} from "../../../../DB/DBMethods.js"
import OrderModel from "../../../../DB/model/order.model.js"
import ProductModel from "../../../../DB/model/product.model.js"
import CouponModel from "../../../../DB/model/coupon.model.js"
export const createOrder =asyncHandler( async (req, res, next) => {
  const { products, couponId } = req.body
  const finalProducts = []
  let finalPrice = 0
  let totalPrice = 0
  for (const product of products) {
    const availableProduct = await findOne({
      model: ProductModel,
      filter: { _id: product.productId, stock: { $gte: product.quantity } },
    })
    availableProduct ? finalProducts.push(product) : ""
    if (!availableProduct) {
      return next(
        new Error(`fail to place this item to the order ${product.productId}`)
      )
    } else {
      product.totalPrice = product.quantity * availableProduct.finalPrice
      totalPrice += product.totalPrice
      finalProducts.push(product)
    }
  }
  if (couponId) {
    const coupon = await findOne({
      model: CouponModel,
      filter: {
        _id: couponId,
        usedBy: { $nin: req.user._id },
      },
    })
    if (!coupon) {
      return next(new Error("in-valid coupon"))
    }
    finalPrice = totalPrice - totalPrice * (coupon.amount / 100)
  } else {
    finalPrice = totalPrice
  }
  req.body.finalPrice = finalPrice
  req.body.totalPrice = totalPrice
  req.body.userId = req.user._id
  const order = await create({ model: OrderModel, data: req.body })
  if (!order) {
    return next(new Error("fail to place this order", { cause: 400 }))
  }
  if (couponId) {
    await updateOne({
      model: CouponModel,
      filter: { _id: couponId },
      data: { $addToSet: { usedBy: req.user._id } },
    })
  }
  res.json({ message: "Done", order })
})

// export const createOrder = asyncHandler(async(req,res,next)=>{

// })
