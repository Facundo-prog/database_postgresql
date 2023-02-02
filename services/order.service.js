const boom = require('@hapi/boom');

const { models } = require("../libraries/sequelize");

class OrderService {

    constructor(){}

    async create(data) {
        const result = await models.Order.create(data);
        return result;
    }

    async addItem(data) {
        const result = await models.OrderProduct.create(data);
        return result;
    }

    async find() {
        const result = await models.Order.findAll();
        return result;
    }
    
    async findOne(id) {
        const result = await models.Order.findByPk(id, {
            include: [
                {
                association: "customer",
                include: ["user"]
                },
                "items"
            ]
        });

        if(result === null){
            throw boom.notFound('order not found');
        }
        return result;
    }

    async update(id, changes) {
        const order = this.findOne(id);
        const result = await order.update(changes);
        return result;
    }

    async delete(id) {
        const order = this.findOne(id);
        const result = await order.destroy();
        return result;
    }

}

module.exports = OrderService;
