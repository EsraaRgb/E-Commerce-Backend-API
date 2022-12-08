import { roles } from "../../middleware/auth.js";

export const endPoint = {
    add:[roles.User]
}