import Joi from 'joi';

const validateUser = ( data ) =>{
    const userSchemaValidation = Joi.object({
        password: Joi.string().required(),
		email: Joi.string().email().required(),
		confirmPassword: Joi.ref('password')
    });
    return userSchemaValidation.validate(data);
}

export default validateUser;