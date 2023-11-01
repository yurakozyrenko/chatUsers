const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const chatsRoutes = require('./chats.routes');
const messagesRoutes = require('./messages.routes');

router.use('/messages', messagesRoutes);
router.use('/chats', chatsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
