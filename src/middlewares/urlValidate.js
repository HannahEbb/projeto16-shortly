import urlSchema from "../schemas/urlSchema";

export function urlValidate (req, res, next) {
    const url = req.body;
    const validation = urlSchema.validate(url);
    if(validation.error) {
        return res.sendStatus(422); //erro no formato do body enviado
    }
    next();
}