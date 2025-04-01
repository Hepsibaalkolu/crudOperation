const express = require('express');
const Todo = require('../models/TodoList');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Sending Todos:", todos);  // Debugging log
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text, completed: false });
  await newTodo.save();
  res.json(newTodo);
});

router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo Deleted' });
});

module.exports = router;
