const express = require('express');
const app = express();
const cors= require('cors');
const path=require('path');

app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname)));

// In-memory array to store tasks
let tasks = [];

// Home Route
app.get('/', (req, res) => {
    res.send('Hello World! Your server is working!');
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: tasks.length + 1,  // simple auto-increment ID
        title: title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



