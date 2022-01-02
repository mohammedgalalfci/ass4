const mongoose = require("mongoose");
const joi=require("joi")
const todoSchema = new mongoose.Schema({
    value: String,
});
const validationTodoSchema=joi.object({
    value:joi.string().min(3).max(12).required()
})
const Todo = mongoose.model("Todo", todoSchema);
const validateTodo=(_todo)=>{
    return validationTodoSchema.validate(_todo)
}
module.exports = {Todo,validateTodo}