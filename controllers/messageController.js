const MessagesService = require('../services/message.service');
const ChatsService = require('../services/chat.service');
const UsersService = require('../services/user.service');
const ApiError = require('../error/ApiError');

class MessageController {
    async create(req, res, next) {
        try {
            const { chat: chatId, author: authorId, text } = req.body;

            if (!chatId) {
                return next(ApiError.badRequest('Некорректный chat id'));
            }
            if (!authorId) {
                return next(ApiError.badRequest('Некорректный author id'));
            }
            if (!text) {
                return next(ApiError.badRequest('text не может быть пустым'));
            }

            let id;

            id = chatId;
            const checkChat = await ChatsService.getChatById({ id });
            if (!checkChat) {
                return next(
                    ApiError.badRequest('Чат с таким id не существует')
                );
            }

            id = authorId;
            const checkAuthor = await UsersService.getUserById({ id });
            if (!checkAuthor) {
                return next(
                    ApiError.badRequest('Пользователя с таким id не существует')
                );
            }

            const message = await MessagesService.createMessage({
                chatId,
                authorId,
                text,
            });

            return res.json(message.id);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { chat: chatId } = req.query;
            if (!chatId) {
                return next(ApiError.badRequest('Некорректный chat id не найден'));
            }

            let id;
            id = chatId;
            const checkChat = await ChatsService.getChatById({ id });
            if (!checkChat) {
                return next(
                    ApiError.badRequest('Чат с таким id не существует')
                );
            }

            const messages = await MessagesService.getAllMessages({ chatId });
            if (!messages.length) {
                return res.json('Сообщения в чате не найдены');
            }
            return res.json(messages);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new MessageController();
