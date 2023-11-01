const UsersService = require('../services/user.service');
const ApiError = require('../error/ApiError');

class UserController {
    async create(req, res, next) {
        const { username } = req.body;
        if (!username) {
            return next(ApiError.badRequest('Некорректный username'));
        }
        const candidate = await UsersService.getUser({ username });

        if (candidate) {
            return next(
                ApiError.badRequest('Пользователь с таким username существует')
            );
        }
        const user = await UsersService.createUser({ username });
        return res.json(user.id);
    }
}

module.exports = new UserController();
