const express = require('express'); // Подключаем фреймворк Express для создания веб-сервера.
const bodyParser = require('body-parser'); // Подключаем middleware для обработки тела запросов.
const mongoose = require('mongoose'); // Подключаем библиотеку для работы с MongoDB.
const path = require('path'); // Подключаем встроенный модуль path для работы с путями.
const app = express(); // Создаем экземпляр приложения Express.

mongoose.connect('mongodb://localhost:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true }); // Подключаемся к базе данных MongoDB под названием "taskmanager".

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
}); // Создаем схему Mongoose для модели "Task" с полями title, description и completed.

const Task = mongoose.model('Task', TaskSchema); // Создаем модель "Task" на основе схемы.

app.use(bodyParser.json()); // Подключаем middleware для обработки JSON-тел запросов.
app.use(express.static('public')); // Указываем Express обслуживать статические файлы из директории "public".

app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}); // Обрабатываем GET-запросы на /api/tasks, возвращая все задачи из базы данных.

app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
}); // Обрабатываем POST-запросы на /api/tasks, создавая новую задачу в базе данных.

app.put('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
}); // Обрабатываем PUT-запросы на /api/tasks/:id, обновляя задачу по ID в базе данных.

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
}); // Обрабатываем DELETE-запросы на /api/tasks/:id, удаляя задачу по ID из базы данных.

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); // Запускаем сервер на порту 3000 и выводим сообщение в консоль.
