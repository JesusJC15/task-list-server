const express = require('express');
const router = express.Router();

// Middleware validar ID
function validateIdParam(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID parameter"
    });
  }

  next();
}

// Middleware validar status
function validateStatusParam(req, res, next) {
  const status = req.params.status;

  if (status !== "true" && status !== "false") {
    return res.status(400).json({
      message: "Status must be 'true' or 'false'"
    });
  }

  next();
}

// GET /tasks → listar todas
router.get('/', (req, res) => {
  res.json(req.app.locals.tasks);
});

// GET /tasks/:id → obtener una tarea específica
router.get('/:id', validateIdParam, (req, res) => {
  const id = parseInt(req.params.id);
  const task = req.app.locals.tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});


// GET /tasks/status/:status → filtrar por estado
router.get('/status/:status', validateStatusParam, (req, res) => {
  const status = req.params.status === "true";

  const filtered = req.app.locals.tasks.filter(
    t => t.isCompleted === status
  );

  res.json(filtered);
});

module.exports = router;