const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); // Para leer JSON del body

// Base de datos simulada en memoria
let tasks = [
  { id: 1, isCompleted: false, description: "Walk the dog" },
  { id: 2, isCompleted: true, description: "Do homework" },
  { id: 3, isCompleted: false, description: "Read a book" }
];

// Exportamos tasks para que los routers puedan usarla
app.locals.tasks = tasks;

// Importar routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Usar routers
app.use('/tasks', listViewRouter);
app.use('/tasks', listEditRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});