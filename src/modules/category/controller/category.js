import { asyncHandler } from "../../../services/handleError.js"
import cloudinary from "../../../services/cloudinary.js"
import {
  create,
  findById,
  findByIdAndUpdate,
} from "../../../../DB/DBMethods.js"
import CategoryModel from "../../../../DB/model/Category.model.js"
import SubCategoryModel from "../../../../DB/model/subCategory.model.js"
import { paginate } from "../../../services/pagination.js"

export const addCategory = async (req, res, next) => {
  if (!req.file) {
    next(new Error("Image is required"), { cause: 400 })
  } else {
    const { name } = req.body
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "category",
      }
    )
    const result = await create({
      model: CategoryModel,
      data: {
        name,
        image: secure_url,
        publicId: public_id,
        createdBy: req.user._id,
      },
    })
    if (!result) {
      await cloudinary.uploader.destroy(public_id)
      return next(new Error("fail to add category"), { cause: 400 })
    }
    res.status(201).json({ message: "Done", result })
  }
}
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await findById({ model: CategoryModel, filter: { _id: id } })
  if (!category) {
    next(new Error("In-valid category Id", { cause: 404 }))
  } else {
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "category",
        }
      )
      req.body.image = secure_url
    }
    const result = await findByIdAndUpdate({
      model:CategoryModel,
      filter:{ _id: id },
      data:req.body,
      options:{ new: true }}
    )
    res.status(201).json({ message: "Done", result })
  }
})

export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await findById({
    model: CategoryModel,
    filter: { _id: id },
    populate: [
      {
        path: "createdBy",
        select: "userName email",
      },
    ],
  })
  if (!category) {
    next(new Error("In-valid category Id", { cause: 404 }))
  } else {
    res.status(201).json({ message: "Done", category })
  }
})
export const getAllCategories = async (req, res, next) => {
  const { page, size } = req.query
  const { skip, limit } = paginate(page, size)
  const categories = CategoryModel.find({}).limit(limit).skip(skip).cursor()
  const result = []
  for (
    let doc = await categories.next();
    doc != null;
    doc = await categories.next()
  ) {
    const obj = doc.toObject()
    obj.subCategories = await SubCategoryModel.find({
      categoryId: doc._id,
    }).populate([
      {
        path: "createdBy",
        select: "userName email",
      },
    ])
    result.push(obj)
  }
  res.status(201).json({ message: "Done" ,result})
}
