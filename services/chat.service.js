const { Chat, User, UserChat, Message } = require('../models/models');
const ApiError = require('../error/ApiError');

class ChatsService {
    async createChat({ name, users }) {
        const data = await Chat.create({
            name,
            users,
        });
        return data;
    }

    async createUserChat({ users, chatId }) {
        for (let i = 0; i < users.length; i++) {
            let authorId = users[i];
            await UserChat.create({ authorId, chatId });
        }
    }

    async getChatById({ id }) {
        try {
            const data = await Chat.findOne({ where: { id } });
            return data;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getChat({ name }) {
        try {
            const data = await Chat.findOne({ where: { name } });
            return data;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAllChats({ authorId }) {
        try {            
            let id = authorId;
            const data = await User.findAll({
                where: { id },
                include: [{ model: Chat }],
                order: [[Chat, 'id', 'DESC']],
            });
            return data;
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new ChatsService();
