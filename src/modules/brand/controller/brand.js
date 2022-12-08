import {
  create,
  findByIdAndUpdate,
  findById,
} from "../../../../DB/DBMethods.js"
import { asyncHandler } from "../../../services/handleError.js"
import BrandModel from "../../../../DB/model/brand.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { paginate } from "../../../services/pagination.js"
import slugify from "slugify"

export const addBrand = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    next(new Error("Image is required"), { cause: 400 })
  } else {
    const { name } = req.body
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "brands",
      }
    )
    const result = await create({
      model: BrandModel,
      data: {
        name,
        slug: slugify(name),
        image: secure_url,
        publicId: public_id,
        createdBy: req.user._id,
      },
    })
    if (!result) {
      await cloudinary.uploader.destroy(public_id)
      return next(new Error("fail to add brand"), { cause: 400 })
    }
    res.status(201).json({ message: "Done", result })
  }
})
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const brand = await findById({ model: BrandModel, filter: { _id: id } })
  if (!brand) {
    next(new Error("In-valid brand Id", { cause: 404 }))
  } else {
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "brand",
        }
      )
      req.body.image = secure_url
    }
    if (req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    const result = await findByIdAndUpdate({
      model: BrandModel,
      filter: { _id: id },
      data: req.body,
      options: { new: true },
    })
    res.status(201).json({ message: "Done", result })
  }
})
export const getAllBrands = asyncHandler(async (req, res, next) => {
  const { page, size } = req.query
  const { skip, limit } = paginate(page, size)
  const brands = await BrandModel.find({}).limit(limit).skip(skip)
  res.status(201).json({ message: "Done", brands })
})
export const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const brand = await findById({
    model: BrandModel,
    filter: { _id: id },
    populate: [{ path: "createdBy", select: "userName email" }],
  })
  res.status(201).json({ message: "Done", brand })
})
