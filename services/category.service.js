const boom = require('@hapi/boom');
const { models } = require("../libraries/sequelize");

class CategoryService {

  constructor(){}

  async create(data) {
    const result = await models.Category.create(data);
    return result;
  }

  async find() {
    const result = await models.Category.findAll();
    return result;
  }

  async findOne(id) {
    const result = await models.Category.findByPk(id, {
        include: ["products"]
    });

    if(result === null){
        throw boom.notFound('category not found');
    }
    return result;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    const result = await category.update(changes);
    return result;
  }

  async delete(id) {
    const category = this.findOne(id);
    const result = await category.destroy();
    return result;
  }

}

module.exports = CategoryService;
