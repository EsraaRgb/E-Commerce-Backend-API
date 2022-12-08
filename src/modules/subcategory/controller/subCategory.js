import { asyncHandler } from "../../../services/handleError.js";
import {findById,create, find, findOneAndUpdate,findByIdAndUpdate, findOne} from '../../../../DB/DBMethods.js'
import SubCategoryModel from "../../../../DB/model/subCategory.model.js";
import CategoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../services/cloudinary.js"
import {paginate} from '../../../services/pagination.js'

export const addSubCategory = asyncHandler(async (req,res,next)=>{
    if (!req.file) {
        next(new Error("Image is required"), { cause: 400 })
      } else {
        const { name } = req.body
        const {id} = req.params
        console.log(id);
        const category = await findById({model:CategoryModel,filter:{_id:id},select:'_id'})
        console.log(category);
        if(!category) {
            return next(new Error ('In-valid Category ID'))
        }
        else{
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                folder: "category/subCategory",
              })
              const result = await create({model:SubCategoryModel,data:{
                name,
                image: secure_url,
                publicId:public_id,
                createdBy: req.user._id,
                categoryId:category._id
              }})
              res.status(201).json({ message: "Done", result })
        }
       
      }
})

export const getAllSubCategories = asyncHandler(async(req,res,next)=>{
  const {page,size} = req.query
  const {skip,limit} = paginate(page,size)
  const subCategories = await find({model:SubCategoryModel,skip,limit})
  res.status(201).json({ message: "Done", subCategories })

})
export const updateSubCategory = asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  
  const subCategory = await findOne({model:SubCategoryModel,filter:{_id:id, createdBy:req.user._id}})
  if (!subCategory) {
    next(new Error("In-valid sub category Id or you are not authorized to update it", { cause: 404 }))
  } else {
    if (req.file) {
      const { secure_url,public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: "category",
      })
      req.body.image = secure_url
      req.body.publicId=public_id
    }
    const result = await findByIdAndUpdate({model: SubCategoryModel,filter: { _id: id },data: req.body})
    result?await cloudinary.uploader.destroy(result.publicId):await cloudinary.uploader.destroy(public_id)
    res.status(201).json({ message: "Done", result })
  }

})