import urlSchema from "../schemas/urlSchema.js";

export function urlValidate (req, res, next) {
    const url = req.body;
    const validation = urlSchema.validate(url);
    if(validation.error) {
        return res.sendStatus(422); 
    }
    next();
}