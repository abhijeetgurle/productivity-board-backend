const express = require('express');
const bodyParser = require('body-parser');
const todoList = require('./data');

const port = 4000;
const app = express();
let id = 4;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/todo-list', (req, res) => {
    res.json(todoList);
});

app.post('/add-todo-item', (req, res) => {
    const todoItem = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        state: req.body.state
    };
    todoList.push(todoItem);
    id++;
    res.send("To do list item added successfully");
});

app.put('/update-todo-item', (req, res) => {
    let task = todoList.find(item => item.id === req.body.id);
    task.name = req.body.name;
    task.description = req.body.description;
    task.state = req.body.state;
    res.send("Task updated successfully");
});

app.delete('/delete-item', (req, res) => {
    const id = req.body.id;
    const index = todoList.findIndex(item => item.id === id);
    todoList.splice(index, 1);
    res.send("Item deleted successfully");
});

app.listen(port, () => {
    console.log("Server is running");
});