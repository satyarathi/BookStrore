import Joi from '@hapi/joi';

export const newBookValidator = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string().min(2).required(),
    description: Joi.string().min(4).optional(),
    discountPrice: Joi.number().min(0).optional(),
    bookImage: Joi.string().min(0).optional(),
    admin_user_id: Joi.string().min(1).required(),
    author: Joi.string().min(4).optional(),
    quantity: Joi.number().min(1).optional(),
    price: Joi.number().min(1).optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};