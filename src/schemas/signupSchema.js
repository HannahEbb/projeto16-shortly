import joi from "joi";

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().required(), //.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/), 
    confirmPassword: joi.string.required()
});

export default signupSchema;

