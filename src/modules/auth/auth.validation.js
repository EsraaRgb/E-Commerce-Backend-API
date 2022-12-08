import joi from "joi";


export const signup = {
    body: joi.object().required().keys({
        userName: joi.string().min(2).max(20).required(),
        email: joi
        .string()
        .email({ tlds: { allow: ["com", "edu", "net", "org"] } })
        .required(),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(.{6,50})$/)), // one digit, Capital letter at least and length from  6 to 50
      cPassword: joi.string().valid(joi.ref("password")).required(),
      address: joi.string(),
      phone: joi.string().min(11).max(11),
    }).options({ allowUnknown: true })
}
export const signin = {
    body: joi.object().required().keys({
        email: joi
        .string()
        .email({ tlds: { allow: ["com", "edu", "net", "org"] } })
        .required(),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(.{6,50})$/)), // one digit, Capital letter at least and length from  6 to 50
    }).options({allowUnknown:false})
}
export const token = {
    params: joi.object().required().keys({
      token: joi.string().required(),
    }),
  };