import { roles } from "../../middleware/auth.js"


export const endPoint = {
    addSubCategory: [roles.Admin],
    updateSubCategory: [roles.Admin]
}