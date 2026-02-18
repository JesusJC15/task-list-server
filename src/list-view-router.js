const express = require('express');
const router = express.Router();

// GET /tasks → listar todas
router.get('/', (req, res) => {
  res.json(req.app.locals.tasks);
});

// GET /tasks/:id → obtener una tarea específica
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = req.app.locals.tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// GET /tasks/status/:status → filtrar por estado
router.get('/status/:status', (req, res) => {
  const status = req.params.status === 'true';

  const filtered = req.app.locals.tasks.filter(
    t => t.isCompleted === status
  );

  res.json(filtered);
});

module.exports = router;