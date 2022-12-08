import { Router } from "express"
import * as categoryController from "./controller/category.js"
import { auth } from "../../middleware/auth.js"
import { myMulter, fileValidation } from "../../services/multer.js"
import { endPoint } from "./category.endPoint.js"
import subCategoryRouter from '../subcategory/subcategory.router.js'

const router = Router()
 router.use('/:id/subCategory',subCategoryRouter)
router.get(
  "/",categoryController.getAllCategories
)

router.post(
  "/add",
  auth(endPoint.addCategory),
  myMulter(fileValidation.image).single("image"),
  categoryController.addCategory
)
router.put(
  "/:id",
  auth(endPoint.updateCategory),
  myMulter(fileValidation.image).single("image"),
  categoryController.updateCategory
)
export default router
