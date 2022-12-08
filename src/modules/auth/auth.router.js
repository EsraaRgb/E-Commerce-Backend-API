import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as schema from './auth.validation.js'
import * as authController from './controller/registration.js'
const router = Router()

router.post('/signup',validation(schema.signup),authController.signup)

router.get('/confirmEmail/:token',validation(schema.token),authController.confirmEmail)

router.post('/signin',validation(schema.signin),authController.login)

export default router