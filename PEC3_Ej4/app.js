"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_controller_1 = require("./controllers/todo.controller");
const todo_service_1 = require("./services/todo.service");
const todo_views_1 = require("./views/todo.views");
const app = new todo_controller_1.TodoController(new todo_service_1.TodoService(), new todo_views_1.TodoView());
