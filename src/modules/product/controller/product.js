import slugify from "slugify"
import { asyncHandler } from "../../../services/handleError.js"
import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
} from "../../../../DB/DBMethods.js"
import ProductModel from "../../../../DB/model/product.model.js"
import SubCategoryModel from "../../../../DB/model/subCategory.model.js"
import BrandModel from "../../../../DB/model/brand.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { paginate } from "../../../services/pagination.js"

export const addProduct = asyncHandler(async (req, res, next) => {
  if (!req.files?.length) {
    return next(new Error("Images are required", { cause: 404 }))
  }
  const { name, amount, price, discount, category, subCategory, brand } =
    req.body
  req.body.slug = slugify("mn")
  req.body.stock = amount
  if (discount) {
    req.body.finalPrice = price - price * (discount / 100)
  } else {
    req.body.finalPrice = price
  }
  const checkCategoryResult = await findOne({
    model: SubCategoryModel,
    filter: { _id: subCategory, categoryId: category },
  })
  if (!checkCategoryResult) {
    return next(
      new Error("In-valid category or sub category id", { cause: 404 })
    )
  }
  const checkBrandResult = await findOne({
    model: BrandModel,
    filter: { _id: brand },
  })
  if (!checkBrandResult) {
    return next(new Error("In-valid Brand id", { cause: 404 }))
  }
  const images = []
  const imagesIds = []
  for (const file of req.files) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: "products",
      }
    )
    images.push(secure_url)
    imagesIds.push(public_id)
  }
  req.body.images = images
  req.body.imagesIds = imagesIds
  req.body.createdBy = req.user._id
  const product = await create({ model: ProductModel, data: req.body })
  if (!product) {
    for (const image of imagesIds) {
      await cloudinary.uploader.destroy(image)
    }
    return next(new Error("Error creating product", { cause: 404 }))
  }
  res.status(201).json({ message: "Done", product })
})

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { name, price, discount, amount, subCategory, category, brand } =
    req.body
  const product = await findById({ model: ProductModel, filter: id })
  if (!product) return next(new Error("In-valid product Id", { cause: 403 }))
  if (name) {
    const checkName = await findOne({
      model: ProductModel,
      filter: { _id: id, name },
    })
    if (checkName) {
      return next(new Error("Duplicated product Name", { cause: 409 }))
    }
    req.body.slug = slugify(name)
  }
  if (amount) {
    let stock = amount - product.soldCount
    stock >= 0 ? (req.body.stock = stock) : (req.body.stock = 0)
  }
  if (price && discount) {
    req.body.finalPrice = price - price * (discount / 100)
  } else if (price) {
    req.body.finalPrice = price - price * (product.discount / 100)
  } else if (discount) {
    req.body.finalPrice = product.price - product.price * (discount / 100)
  }
  if (subCategory && category) {
    const checkCategoryResult = await findOne({
      model: SubCategoryModel,
      filter: { _id: subCategory, categoryId: category },
    })
    if (!checkCategoryResult) {
      return next(
        new Error("In-valid category or sub category id", { cause: 404 })
      )
    }
  }
  if (brand) {
    const checkBrandResult = await findOne({
      model: BrandModel,
      filter: { _id: brand },
    })
    if (!checkBrandResult) {
      return next(new Error("In-valid Brand id", { cause: 404 }))
    }
  }
  req.body.updatedBy = req.user._id
  if (req.files) {
    const images = []
    const imagesIds = []
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        {
          folder: "products",
        }
      )
      images.push(secure_url)
      imagesIds.push(public_id)
    }
    req.body.images = images
    req.body.imagesIds = imagesIds
  }

  req.body.createdBy = req.user._id
  const updatedProduct = await findByIdAndUpdate({
    model: ProductModel,
    filter: id,
    data: req.body,
  })
  if (!updatedProduct) {
    req.files.length ? await cloudinary.api.delete_resources(imagesIds) : ""
    return next(new Error("Error creating product", { cause: 404 }))
  } else {
    if (req.files.length) {
      console.log(updatedProduct.imagesIds)
      let result = await cloudinary.api.delete_resources(
        updatedProduct.imagesIds
      )
    }
    res.json({ message: "done" })
  }
})

export const getAllProducts =asyncHandler( async (req, res, next) => {
  const { page, size } = req.query
  const { skip, limit } = paginate(page, size)
  const products = await find({
    model: ProductModel,
    skip,
    limit,
    populate: [
      {
        path: "createdBy",
        select: "userName email",
      },
      {path:'subCategory'},
      {path:'category'}

    ],
  })
  res.json(products)
})
