import {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
} from "../../../../DB/DBMethods.js"
import { asyncHandler } from "../../../services/handleError.js"
import CartModel from "../../../../DB/model/cart.model.js"

export const addToCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user
  const { products } = req.body
  let cart = await findOne({ model: CartModel, filter: { userId: _id } })

  if (!cart) {
    req.body.userId = _id
    cart = createdCart = await create({
      model: CartModel,
      data: { products: req.body.products, userId: _id },
    })
    return res.status(201).json({ message: "Done", cart })
  }
  for (const product of products) {
    let match = false
    for (let i = 0; i < cart.products.length; i++) {
      if (product.productId == cart.products[i].productId.toString()) {
        cart.products[i] = product
        match = true
        break
      }
    }
    if (!match) {
      cart.products.push(product)
    }
  }
  cart = await findByIdAndUpdate({
    model: CartModel,
    filter: { _id: cart._id },
    data: { products: cart.products },
    options: { new: true },
  })
  return res.status(200).json({ message: "Done", cart })
})
export const deleteFromCart = asyncHandler(async (req, res, next) => {
  const { id, productId } = req.params
  let cart = await findOne({
    model: CartModel,
    filter: { _id: id, userId: req.user._id },
  })
  if (!cart) {
    return next(new Error("In-valid cart id", { cause: 404 }))
  }
  let products = []
  for (let product of cart.products) {
    if (product._id.toString() == productId) {
      cart.products.pull(product)
    }
  }
  cart = await findByIdAndUpdate({
    model: CartModel,
    filter: { _id: id },
    data: { products: cart.products },
    options: { new: true },
  })
  res.json({ message: "Done", cart })
})
