import signupSchema from "../schemas/signupSchema.js";

export function signupValidate (req, res, next) {
    const data = req.body;
    const validation = signupSchema.validate(data);
    if(validation.error) {
        return res.sendStatus(422); 
    }
    next();
}