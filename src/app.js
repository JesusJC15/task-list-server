const express = require('express');

const app = express();
const PORT = 3000;

// Lista de tareas
const tasks = [
  {
    id: 123456,
    isCompleted: false,
    description: "Walk the dog"
  },
  {
    id: 789012,
    isCompleted: true,
    description: "Do homework"
  },
  {
    id: 345678,
    isCompleted: false,
    description: "Read a book"
  }
];

// Ruta principal
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
