import joi from "joi";

const signinSchema = joi.object({
    email: joi.string().email({tlds: { allow: false}}).required(),
    password: joi.string().required() //.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,16}$/), 
});

export default signinSchema;