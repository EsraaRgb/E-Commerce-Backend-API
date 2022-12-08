import { findById, updateOne } from "../../../../DB/DBMethods.js";
import ProductModel from "../../../../DB/model/product.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/handleError.js";

export const add = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const product = await findById({model:ProductModel,filter:{_id:id}})
    if(!product )
        return next(new Error('In-valid Product id',{cause:404}))
    const result = await updateOne({model:userModel,filter:{_id:req.user._id},data:{$addToSet:{wishlist:id}}})
    res.json(result)
})

export const remove = asyncHandler(async(req,res,next)=>{
const {id} = req.params
const product = await findById({model:ProductModel,filter:{_id:id}})
if(!product )
        return next(new Error('In-valid Product id',{cause:404}))
    const result = await updateOne({model:userModel,filter:{_id:req.user._id},data:{$pull:{wishlist:id}}})
    res.json(result)
})
export const getWishlist = asyncHandler(async(req,res,next)=>{
    const result = await findById({model:userModel,filter:req.user._id,select:'wishlist',populate:[{
        path:'wishlist'
    }]})
    res.json(result)

})