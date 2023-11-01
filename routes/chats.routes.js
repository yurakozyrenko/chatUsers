const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chatController');

router.post('/add', ChatController.create);
router.get('/', ChatController.getAll);

module.exports = router;