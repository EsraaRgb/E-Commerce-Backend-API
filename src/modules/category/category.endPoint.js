import { roles } from "../../middleware/auth.js"


export const endPoint = {
    addCategory: [roles.Admin],
    updateCategory: [roles.Admin]
}