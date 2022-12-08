import { Router } from "express"
import { auth } from "../../middleware/auth.js"
import { myMulter, fileValidation } from "../../services/multer.js"
import { endPoint } from "./product.endPoint.js"
import wishlist from "../wishlist/wishlist.router.js"
import * as productController from "./controller/product.js"
const router = Router()

router.use('/:id/wishlist',wishlist)
router.get("/",productController.getAllProducts)
router.post(
  "/",
  auth(endPoint.create),
  myMulter(fileValidation.image).array('images'),
  productController.addProduct
)
router.put('/:id',auth(endPoint.update), myMulter(fileValidation.image).array('images'),
productController.updateProduct)

export default router
