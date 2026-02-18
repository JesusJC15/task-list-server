const express = require('express');
const router = express.Router();

// Middleware validar cuerpo vacío
function validateBody(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body cannot be empty"
    });
  }
  next();
}

// Middleware validar estructura de tarea
function validateTaskData(req, res, next) {
  const { description, isCompleted } = req.body;

  if (description === undefined || typeof description !== "string") {
    return res.status(400).json({
      message: "Invalid or missing 'description'"
    });
  }

  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return res.status(400).json({
      message: "'isCompleted' must be boolean"
    });
  }

  next();
}

// POST /tasks → crear nueva tarea
router.post(
  '/',
  validateBody,
  validateTaskData,
  (req, res) => {
    const { description, isCompleted } = req.body;

    const newTask = {
      id: Date.now(),
      description,
      isCompleted: isCompleted || false
    };

    req.app.locals.tasks.push(newTask);

    res.status(201).json(newTask);
  }
);

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

// PUT /tasks/:id → actualizar tarea (completa o parcial)
router.put(
  '/:id',
  validateBody,
  validateTaskData,
  (req, res) => {
    const id = parseInt(req.params.id);
    const task = req.app.locals.tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { description, isCompleted } = req.body;

    task.description = description ?? task.description;
    task.isCompleted = isCompleted ?? task.isCompleted;

    res.json(task);
  }
);

module.exports = router;