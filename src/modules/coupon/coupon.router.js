import { Router } from "express"
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./coupon.endPoint.js"
import * as couponController from "./controller/coupon.js"
const router = Router()

router.get("/:name", auth(endPoint.create), couponController.getCoupon)
router.post("/", auth(endPoint.create), couponController.createCoupon)
router.put("/:id", auth(endPoint.update), couponController.updateCoupon)
router.patch("/:id", auth(endPoint.delete), couponController.deleteCoupon)

export default router
