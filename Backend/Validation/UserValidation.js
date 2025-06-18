import Joi from "joi";

const validateUserSchema=Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(8).required()

})

const validateUser=(userdata)=>{
    return validateUserSchema.validate(userdata);
}
export default validateUser;