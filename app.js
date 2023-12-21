const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Для Heroku

app.use(express.json());

// Пример базы данных с контактами
let contacts = [
    { id: 1, name: "Иван", phone: "123-456-7890" },
    { id: 2, name: "Мария", phone: "987-654-3210" }
];

// Получение списка контактов
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

// Создание нового контакта
app.post('/contacts', (req, res) => {
    const newContact = req.body;
    newContact.id = contacts.length + 1;
    contacts.push(newContact);
    res.status(201).json(newContact);
});

// Получение контакта по ID
app.get('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    if (!contact) {
        return res.status(404).json({ error: 'Контакт не найден' });
    }
    res.json(contact);
});

// Обновление контакта по ID
app.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedContact = req.body;
    let index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Контакт не найден' });
    }
    updatedContact.id = id;
    contacts[index] = updatedContact;
    res.json(updatedContact);
});

// Удаление контакта по ID
app.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Контакт не найден' });
    }
    contacts = contacts.filter(c => c.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});