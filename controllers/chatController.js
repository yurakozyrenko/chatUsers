const ChatsService = require('../services/chat.service');
const ApiError = require('../error/ApiError');
const UserService = require('../services/user.service');

class ChatController {
    async create(req, res, next) {
        try {
            const { name, users } = req.body;

            if (!name) {
                return next(ApiError.badRequest('Некорректный name'));
            }
            const candidate = await ChatsService.getChat({ name });
            if (candidate) {
                return next(ApiError.badRequest('Чат с таким name существует'));
            }

            const checkUsers = await UserService.checkUsers({ users });
            if (!checkUsers) {
                return next(ApiError.badRequest('Некорректный список Users'));
            }
            const chat = await ChatsService.createChat({ name, users });
            const { id: chatId } = chat;

            await ChatsService.createUserChat({ users, chatId });
            return res.json(chat.id);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { user: authorId } = req.query;
            if (!authorId) {
                return next(ApiError.badRequest('Некорректный userId'));
            }
            const chats = await ChatsService.getAllChats({ authorId });

            if (!chats) {
                return next(
                    ApiError.badRequest(
                        'у пользователя с таким userId нет чатов'
                    )
                );
            }

            return res.json(chats);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ChatController();
