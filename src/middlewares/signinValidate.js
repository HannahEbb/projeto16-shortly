import signinSchema from "../schemas/signinSchema.js";

export function signinValidate (req, res, next) {
    const data = req.body;
    const validation = signinSchema.validate(data);
    if(validation.error) {
        return res.sendStatus(422); 
    }
    next();
}