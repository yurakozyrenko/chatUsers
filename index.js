const express = require('express');
require('dotenv').config();

const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const sequelize = require('./config/db');
const app = express();
const PORT = 9000;

const router = require('./routes/index');

app.use(express.json());
app.use('/', router);

//Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    }
};

start();
