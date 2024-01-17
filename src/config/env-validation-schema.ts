import * as Joi from 'joi';

export default Joi.object({
  HOST: Joi.optional(),
  SERVER_PORT: Joi.required(),
  DB_URL: Joi.required(),
});
