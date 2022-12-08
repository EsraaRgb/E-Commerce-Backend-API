import jwt from "jsonwebtoken"
import userModel from "../../DB/model/User.model.js"
import { asyncHandler } from "../services/handleError.js"
export const roles = {
  Admin : "Admin",
  User: "User"
}
export const auth = (role = [roles.User]) => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization?.startsWith(process.env.BearerKey)) {
      next(new Error("In-valid Bearer key", { cause: 400 }))
    } else {
      const token = authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.tokenSignature)
      if (!decoded?.id) {
        next(new Error("In-valid token payload ", { cause: 400 }))
        // res.status(400).json({ message: "In-valid token payload " })
      } else {
        const user = await userModel
        .findById(decoded.id)
        .select("email userName role")
        if (!user) {
          
          next(new Error("Not register user", { cause: 400 }))
          // res.status(404).json({ message: "Not register user" })
        } else {
          if(role.includes(user.role)){
            req.user = user
            next()
          }
          else {
            console.log(user.role);
            next(new Error("Un-Authorized User", {cause:403}))
          }
        }
      }
    }
  })
}
