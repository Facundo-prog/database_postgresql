const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer().min(1);
const price_max = Joi.number().integer();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
    limit: limit,
    offset: offset,
    price: price,
    price_min: price_min,
    price_max: price_max.when("price_min", {
        is: Joi.number().integer().required(),
        then: Joi.required()
    })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
