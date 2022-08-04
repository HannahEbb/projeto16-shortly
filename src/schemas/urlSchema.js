import joi from "joi";

const categorySchema = joi.object({
    url: joi.string().required()
  });
  
  export default categorySchema;