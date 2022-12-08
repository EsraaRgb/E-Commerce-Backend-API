import { Router } from "express"
import * as brandController from "./controller/brand.js"
import { auth } from "../../middleware/auth.js"
import { myMulter, fileValidation } from "../../services/multer.js"
import { endPoint } from "./brand.endPoint.js"
import subCategoryRouter from '../subcategory/subcategory.router.js'

const router = Router()
router.get(
  "/",brandController.getAllBrands
)
router.get(
  "/:id",brandController.getBrandById
)

router.post(
  "/add",
  auth(endPoint.create),
  myMulter(fileValidation.image).single("image"),
  brandController.addBrand
)
router.put(
  "/:id",
  auth(endPoint.update),
  myMulter(fileValidation.image).single("image"),
  brandController.updateBrand
)
export default router
