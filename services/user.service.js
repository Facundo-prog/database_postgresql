const boom = require('@hapi/boom');
const { models } = require("../libraries/sequelize");


class UserService {
    constructor() {}

    async create(data) {
        await models.User.create(data);
        return { message: "user created" };
    }

    async find() {
        const result = await models.User.findAll({
            include: ["customer"]
        });
        return result;
    }

    async findOne(id) {
        const result = await models.User.findByPk(id);
        if(result === null) throw boom.notFound('user not found')
        return result;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const result = await user.update(changes);
        return result;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy(id);
        return { id };
    }
}

module.exports = UserService;
