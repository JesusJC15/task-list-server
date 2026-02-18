const express = require('express');
const router = express.Router();

// POST /tasks → crear tarea
router.post('/', (req, res) => {
  const { description, isCompleted } = req.body;

  const newTask = {
    id: Date.now(),
    description,
    isCompleted: isCompleted || false
  };

  req.app.locals.tasks.push(newTask);

  res.status(201).json(newTask);
});

// DELETE /tasks/:id → eliminar tarea
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = req.app.locals.tasks;

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted successfully" });
});

// PUT /tasks/:id → actualizar tarea
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = req.app.locals.tasks;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { description, isCompleted } = req.body;

  if (description !== undefined) task.description = description;
  if (isCompleted !== undefined) task.isCompleted = isCompleted;

  res.json(task);
});

module.exports = router;