const express = require("express");
const {Todo,validateTodo} = require("../models/todo");
const { catchAsyncErrors } = require("../middleware/index")

const router = express.Router();

router.get("/show", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    res.json(todo);
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id)
    res.json(todo);
});

router.put("/edit/:id", async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error})
    const { id } = req.params;
    const { value } = req.body;
    const todo = await Todo.findById(id)
    todo.value = value
    await todo.save();
    res.json(todo);
});


router.post("/add/", async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({ message: error})
    const { value } = req.body;
    const newTodo = new Todo({ value });
    await newTodo.save();
    res.json(newTodo);
});

module.exports = router