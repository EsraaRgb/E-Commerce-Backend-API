import { Router } from "express"
import * as subCategoryController from "./controller/subCategory.js"
import { auth } from "../../middleware/auth.js"
import { myMulter, fileValidation } from "../../services/multer.js"
import { endPoint } from "./subcategory.endPoint.js"
const router = Router({mergeParams:true})

router.get(
  "/",subCategoryController.getAllSubCategories
)

router.post(
  "/add",
  auth(endPoint.addSubCategory),
  myMulter(fileValidation.image).single("image"),
  subCategoryController.addSubCategory
)
router.put(
  "/:id",
  auth(endPoint.updateSubCategory),
  myMulter(fileValidation.image).single("image"),
  subCategoryController.updateSubCategory
)
export default router
