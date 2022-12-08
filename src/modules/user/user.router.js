import { Router } from "express";
import wishlist from "../wishlist/wishlist.router.js"

const router = Router()


router.use('/wishlist',wishlist)

router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})




export default router