const boom = require('@hapi/boom');
const { models } = require("../libraries/sequelize");
const { Op } = require("sequelize");

class ProductsService {

  constructor(){}

  async create(data) {
    const result = await models.Product.create(data);
    return result;
  }

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query;
    const options = {
        where: {}
    };

    if(limit && offset){
        options.limit = limit;
        options.offset = offset;
    }

    if(price_min && price_max){
        options.where = { 
            price: {
                [Op.between]: [price_min, price_max]
            }
        } 
    }
    else if(price){
        options.where = { 
            price: price
        } 
    }

    const result = await models.Product.findAll(options);
    return result;
  }

  async findOne(id) {
    const result = await models.Product.findByPk(id, {
        include: ["category"]
    });

    if(result === null){
        throw boom.notFound('product not found');
    }
    return result;
  }

  async update(id, changes) {
    const product = this.findOne(id);
    const result = await product.update(changes);
    return result;
  }

  async delete(id) {
    const product = this.findOne(id);
    const result = await product.destroy();
    return result;
  }

}

module.exports = ProductsService;
