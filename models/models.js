const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'author',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, unique: true },
    },
    {
        timestamps: true,
        updatedAt: false,
    }
);

const Chat = sequelize.define(
    'chat',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true },
        users: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    {
        timestamps: true,
        updatedAt: false,
    }
);

const UserChat = sequelize.define(
    'user_chat',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
        timestamps: true,
        updatedAt: false,
    }
);

const Message = sequelize.define(
    'message',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        text: { type: DataTypes.TEXT, allowNull: false },
    },
    {
        timestamps: true,
        updatedAt: false,
    }
);

User.belongsToMany(Chat, { through: UserChat });
Chat.belongsToMany(User, { through: UserChat });

User.hasMany(Message);
Message.belongsTo(User);

Chat.hasMany(Message);
Message.belongsTo(Chat);

module.exports = {
    User,
    Chat,
    UserChat,
    Message,
};
