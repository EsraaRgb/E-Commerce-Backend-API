import { Router } from "express";
import * as cartController from './controller/cart.js'
import { auth } from "../../middleware/auth.js"
import { endPoint } from "./cart.endPoint.js"
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Cart Module"})
})
router.post('/add',auth(endPoint.add),cartController.addToCart)
router.patch('/remove/:id/:productId',auth(endPoint.add),cartController.deleteFromCart)




export default router