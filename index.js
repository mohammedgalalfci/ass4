const mongoose = require("mongoose");
const express = require("express");
const todoRouter = require("./Routes/todo");
const app = express();
app.use(express.json());
app.use("/todo", todoRouter);
mongoose.connect("mongodb://localhost/ass4")
    .then(() => {
        app.listen(3000, () => {
            console.log("server running");
        });
        console.log("connected db")
    })
    .catch(() => {
        console.log("error connecting");
    });

