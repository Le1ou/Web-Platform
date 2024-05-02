const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Используем middleware для обработки данных POST запросов
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Хранилище данных
let formDataStorage = [];

// Определяем статические файлы
app.use(express.static('./'));

// Обработка POST запроса для формы
app.post('/submit_form', (req, res) => {
    console.log('Получен POST-запрос на /submit_form');
    console.log('Тело запроса:', req.body);
    
    // Проверка наличия заголовка Origin (для CORS)
    if (req.headers.origin) {
        console.log('Origin:', req.headers.origin);
    }

    // Получаем данные из тела запроса
    const formData = req.body;

    // Сохраняем данные в хранилище
    formDataStorage.push(formData);
    console.log(formDataStorage.length);
    console.log('Данные сохранены в хранилище:', formDataStorage);

    // Отправляем ответ клиенту
    res.send('Данные успешно получены и обработаны!');
});

// Обработка GET-запроса для получения данных формы
app.get('/get_form_data', (req, res) => {
    console.log('Получен GET-запрос на /get_form_data');
    // Отправляем сохраненные данные клиенту
    console.log('Отправляем данные:', formDataStorage);
    res.json(formDataStorage);
});

// Обработка POST запроса для авторизации
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Проверка логина и пароля
    if (username === '1' && password === '1') {
        res.redirect('/employee_acc.html'); // Перенаправление на страницу сотрудника
    } else {
        res.status(401).send('Неверный логин или пароль'); // Отправка статуса 401 и сообщения об ошибке
    }
});

// Обработка POST запроса для удаления анкеты
app.post('/delete_form_data', (req, res) => {
    console.log('Получен POST-запрос на /delete_form_data');
    console.log('Тело запроса:', req.body);

    // Получаем данные из тела запроса
    const fullName = req.body.full_name;

    // Удаляем анкету из хранилища
    formDataStorage = formDataStorage.filter(item => item.full_name !== fullName);
    console.log('Данные после удаления:', formDataStorage);

    // Отправляем ответ клиенту
    res.send('Анкета успешно удалена!');
});


// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});








