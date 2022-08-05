import joi from "joi";

const categorySchema = joi.object({
    url: joi.string().uri().required()
  });
  
  export default categorySchema; 