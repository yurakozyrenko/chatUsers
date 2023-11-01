const { Message, User, Chat } = require('../models/models');
const ApiError = require('../error/ApiError');

class MessagesService {
    async createMessage({ chatId, authorId, text }) {
        try {
            const data = await Message.create({ chatId, authorId, text });
            return data;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAllMessages({ chatId }) {
        try {
            let id = chatId;
            const data = await Chat.findAll({
                where: { id },
                include: [{ model: Message }],
                order: [[Message, 'createdAt', 'DESC']],
            });

            return data;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new MessagesService();
