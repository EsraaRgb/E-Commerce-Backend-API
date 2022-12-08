import { Router } from "express"
import * as orderController from "./controller/order.js"
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./order.endPoint.js"
const router = Router()

router.get("/", (req, res) => {
  res.status(200).json({ message: "order Module" })
})
router.post("/add", auth(endPoint.add), orderController.createOrder)
router.patch("/remove/:id/:productId", auth(endPoint.add))

export default router
