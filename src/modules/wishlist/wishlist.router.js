import { Router } from "express"
import * as wishlistController from "./controller/wishlist.js"
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./wishlist.endPoint.js"
const router = Router({mergeParams:true})

router.get(
  "/",auth(endPoint.add),wishlistController.getWishlist
)

router.patch(
  "/add",
  auth(endPoint.add),
  wishlistController.add
)
router.patch(
  "/remove",
  auth(endPoint.remove),
  wishlistController.remove
)
export default router
