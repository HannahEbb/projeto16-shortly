import signinSchema from "../schemas/signinSchema";

export function signinValidate (req, res, next) {
    const data = req.body;
    const validation = signinSchema.validate(data);
    if(validation.error) {
        return res.sendStatus(422); //erro no formato do body enviado
    }
    next();
}