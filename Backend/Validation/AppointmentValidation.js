import Joi from "joi";

const validateAppointmentSchema=Joi.object({
    name:Joi.string().min(3).required(),
    dateOfBirth:Joi.date().optional(),
    contactNo:Joi.string() .pattern(/^\d{10,15}$/).min(11).optional(),
    cnic:Joi.string().pattern(/^\d{5}-\d{7}-\d{1}$/).required(),
    Gender:Joi.string().optional(),
    Email:Joi.string().email().optional(),
    doctor_id:Joi.string().required(),
    appointmentDate:Joi.date().required(),
})

const validateAppointment=(userdate)=>{
    return validateAppointmentSchema.validate(userdate);
}

export default validateAppointment;