import userModel from "../../../../DB/model/User.model.js"
import bcrypt from "bcryptjs"
import { sendEmail } from "../../../services/email.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../../../services/handleError.js"
import { findOne, updateOne } from "../../../../DB/DBMethods.js"

export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body
  
  // const user = await userModel.findOne({ email }).select("email");
  const user = await findOne({
    model: userModel,
    filter: { email },
    select: "email",
  })
  
  if (user) {
    // user Exist
    //   res.json({ message: "email Exist" });
    next(new Error("Email Exist"))
  } else {
    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALTROUND)
    )
    
    const newUser = new userModel({ userName, email, password: hashedPassword })
    const token = jwt.sign({ id: newUser._id }, process.env.emailToken, {
      expiresIn: "1h",
    })
    const refreshToken = jwt.sign({ id: newUser._id }, process.env.emailToken)

    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
    const refreshTokenLink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmailRf/${token}`

    const message = `
              <a href='${link}'>Confirm Email</a>
              <br>
              <a href='${refreshTokenLink}'>If Your link Expired Click Here</a>
              `
    const emailResult = await sendEmail(email, "Confirmation-Email", message)
    if (emailResult.accepted.length) {
      await newUser.save()
      res.json({ message: "Done", id: newUser._id })
    } else {
      // res.status(400).json({ message: "please provide Real Email" });
      next(new Error("please provide Real Email", { cause: 400 }))
    }
  }
})

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params
  const decoded = jwt.verify(token, process.env.emailToken)
  if (decoded && decoded.id) {
    const user = await updateOne({
      model: userModel,
      filter: { _id: decoded.id, confirmEmail: false },
      data: { confirmEmail: true },
    })
    res.redirect(process.env.FRONTENDEURL)
  } else {
    // res.status(400).json({ message: "In-valid Token" });
    next(new Error("In-valid Token"), { cause: 400 })
  }
})

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  console.log("login")
  const user = await findOne({model: userModel, filter:{ email }})
  if (user) {
    // user Exist
    if (!user.confirmEmail) {
      // res.json({ message: "confirm email" });
      next(new Error("confirm email"), { cause: 400 })
    } else {
      if (user.blocked) {
        //   res.json({ message: "user has been Blocked" });
        next(new Error("user has been Blocked"), { cause: 400 })
      } else {
        const result = bcrypt.compareSync(password, user.password)
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.tokenSignature, {
            expiresIn: 60 * 60 * 24,
          })
          res.json({ message: "Done", token })
        } else {
          // res.json({ message: "In-valid Password" });
          next(new Error("In-valid Password"), { cause: 400 })
        }
      }
    }
  } else {
    next(new Error("Email not Exist"), { cause: 400 })
    // res.status(404).json({ message: "Email not Exist" });
  }
})
