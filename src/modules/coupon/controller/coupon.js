import { create, find, findByIdAndUpdate, findOne } from "../../../../DB/DBMethods.js"
import { asyncHandler } from "../../../services/handleError.js"
import CouponModel from "../../../../DB/model/coupon.model.js"



export const createCoupon = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user._id
  const coupon = await create({ model: CouponModel, data: req.body })
  return coupon
    ? res.status(201).json({ message: "Done" ,coupon})
    : next(new Error("fail to create coupon", { cause: 400 }))
})

export const updateCoupon = asyncHandler(async (req, res, next) => {
    req.body.updatedBy = req.user._id
    const coupon = await findByIdAndUpdate({ model: CouponModel, filter:{_id:req.params.id}, data: req.body ,options:{new:true}})
    return coupon
      ? res.status(200).json({ message: "Done" ,coupon})
      : next(new Error("fail to update coupon", { cause: 400 }))
})

export const deleteCoupon = asyncHandler(async (req, res, next) => {
    req.body.isDeleted = true
    req.body.deletedBy = req.user._id
    const coupon = await findByIdAndUpdate({ model: CouponModel, filter:{_id:req.params.id}, data: req.body ,options:{new:true}})
    return coupon
      ? res.status(200).json({ message: "Done" ,coupon})
      : next(new Error("fail to delete coupon", { cause: 400 }))
})

export const getCoupon = asyncHandler(async(req,res,next)=>{
    const coupon = await findOne({model:CouponModel,filter:{name:req.params.name}})
    res.json({message:'done',coupon})
})