"use strict";
/**
 * @class View
 *
 * Visual representation of the model.
 */
// views/todo.views.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoView = void 0;
var TodoView = /** @class */ (function () {
    function TodoView() {
        this._temporaryTodoText = "";
        this.app = this.getElement("#root");
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement("h1");
        this.title.textContent = "Todos";
        this.todoList = this.createElement("ul", "todo-list");
        this.app.append(this.title, this.form, this.todoList);
        this._initLocalListeners();
    }
    Object.defineProperty(TodoView.prototype, "_todoText", {
        get: function () {
            return this.input.value;
        },
        enumerable: false,
        configurable: true
    });
    TodoView.prototype._resetInput = function () {
        this.input.value = "";
    };
    TodoView.prototype.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    };
    TodoView.prototype.getElement = function (selector) {
        return document.querySelector(selector);
    };
    TodoView.prototype.displayTodos = function (todos) {
        var _this = this;
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        if (todos.length === 0) {
            var p = this.createElement("p");
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            todos.forEach(function (todo) {
                var li = _this.createElement("li");
                li.id = todo.id;
                var checkbox = _this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                var span = _this.createElement("span");
                span.contentEditable = "true";
                span.classList.add("editable");
                if (todo.complete) {
                    var strike = _this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                var deleteButton = _this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                _this.todoList.append(li);
            });
        }
        console.log(todos);
    };
    TodoView.prototype._initLocalListeners = function () {
        var _this = this;
        this.todoList.addEventListener("input", function (event) {
            var target = event.target;
            if (target.classList.contains("editable")) {
                _this._temporaryTodoText = target.innerText;
            }
        });
    };
    TodoView.prototype.bindAddTodo = function (handler) {
        var _this = this;
        this.form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (_this._todoText) {
                handler(_this._todoText);
                _this._resetInput();
            }
        });
    };
    TodoView.prototype.bindDeleteTodo = function (handler) {
        this.todoList.addEventListener("click", function (event) {
            var target = event.target;
            if (target.classList.contains("delete")) {
                var id = target.parentElement.id;
                handler(id);
            }
        });
    };
    TodoView.prototype.bindEditTodo = function (handler) {
        var _this = this;
        this.todoList.addEventListener("focusout", function (event) {
            if (_this._temporaryTodoText) {
                var target = event.target;
                var id = target.parentElement.id;
                handler(id, _this._temporaryTodoText);
                _this._temporaryTodoText = "";
            }
        });
    };
    TodoView.prototype.bindToggleTodo = function (handler) {
        this.todoList.addEventListener("change", function (event) {
            var target = event.target;
            if (target.type === "checkbox") {
                var id = target.parentElement.id;
                handler(id);
            }
        });
    };
    return TodoView;
}());
exports.TodoView = TodoView;
