const { User } = require('../models/models');
const ApiError = require('../error/ApiError');

class UsersService {
    async createUser({ username }) {
        try {
            const user = await User.create({
                username,
            });
            return user;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkUsers({ users }) {
        try {
            for (let i = 0; i <= users.length; i++) {
                let id = users[i];
                let user = await User.findOne({ where: { id } });
                if (!user) {
                    return;
                }
            }
            return users;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getUser({ username }) {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getUserById({ id }) {
        try {
            const user = await User.findOne({ where: { id } });
            return user;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new UsersService();
