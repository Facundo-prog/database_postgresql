const boom = require('@hapi/boom');
const { models } = require("../libraries/sequelize");


class CustomerService {
    constructor() {}

    async create(data) {
        //const newUser = await models.User.create(data.user);
        //await models.Customer.create({ ...data, userId: newUser.id });
        await models.Customer.create(data, {
            include: ["user"]
        });
        return { message: "customer created" };
    }

    async find() {
        const result = await models.Customer.findAll({
            include: ["user"]
        });
        return result;
    }

    async findOne(id) {
        const result = await models.Customer.findByPk(id);
        if(result === null) throw boom.notFound('customer not found')
        return result;
    }

    async update(id, changes) {
        const customer = await this.findOne(id);
        const result = await customer.update(changes);
        return result;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        await customer.destroy(id);
        return { id };
    }
}

module.exports = CustomerService;