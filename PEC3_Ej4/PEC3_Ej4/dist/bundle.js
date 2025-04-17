/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./controllers/todo.controller.ts":
/*!****************************************!*\
  !*** ./controllers/todo.controller.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoController = void 0;
/**
 * @class TodoController
 *
 * Links the user input and the view output.
 *
 * @param service
 * @param view
 */
/*Cumple con modelo anémico pues contiene datos, no logica de negocio,el metodo uuidv4 es lógica de soporte*/
class TodoController {
    constructor(service, view) {
        /**
         * Updates the view with the current list of todos.
         *
         * @param todos - The list of todos to be displayed.
         */
        this.onTodoListChanged = (todos) => {
            this.view.displayTodos(todos);
        };
        /**
         * Handles adding a new todo.
         *
         * @param todoText - The text of the todo to be added.
         */
        this.handleAddTodo = (todoText) => {
            this.service.addTodo(todoText);
        };
        /**
         * Handles editing an existing todo.
         *
         * @param id - The ID of the todo to be edited.
         * @param todoText - The new text of the todo.
         */
        this.handleEditTodo = (id, todoText) => {
            this.service.editTodo(id, todoText);
        };
        /**
         * Handles deleting a todo.
         *
         * @param id - The ID of the todo to be deleted.
         */
        this.handleDeleteTodo = (id) => {
            this.service.deleteTodo(id);
        };
        /**
         * Handles toggling the completion status of a todo.
         *
         * @param id - The ID of the todo to be toggled.
         */
        this.handleToggleTodo = (id) => {
            this.service.toggleTodo(id);
        };
        this.service = service;
        this.view = view;
        this.service.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindAddTodo(this.handleAddTodo);
        this.view.bindEditTodo(this.handleEditTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindToggleTodo(this.handleToggleTodo);
        this.onTodoListChanged(this.service.todos);
    }
}
exports.TodoController = TodoController;


/***/ }),

/***/ "./models/todo.model.ts":
/*!******************************!*\
  !*** ./models/todo.model.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Todo = void 0;
class Todo {
    constructor({ text, complete }) {
        this.id = this.uuidv4();
        this.text = text;
        this.complete = complete || false;
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.Todo = Todo;


/***/ }),

/***/ "./services/todo.service.ts":
/*!**********************************!*\
  !*** ./services/todo.service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoService = void 0;
const todo_model_1 = __webpack_require__(/*! ../models/todo.model */ "./models/todo.model.ts");
/**
 * @class TodoService
 *
 * Manages the data of the application.
 */
class TodoService {
    constructor() {
        this.todos = [];
        this.onTodoListChanged = () => { };
        const stored = localStorage.getItem("todos");
        const parsed = stored ? JSON.parse(stored) : [];
        this.todos = parsed.map((todoData) => new todo_model_1.Todo(todoData));
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    addTodo(text) {
        const todoData = { text };
        this.todos.push(new todo_model_1.Todo(todoData));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id ? new todo_model_1.Todo(Object.assign(Object.assign({}, todo), { text: updatedText })) : todo);
        this._commit(this.todos);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? new todo_model_1.Todo(Object.assign(Object.assign({}, todo), { complete: !todo.complete })) : todo);
        this._commit(this.todos);
    }
}
exports.TodoService = TodoService;


/***/ }),

/***/ "./views/todo.views.ts":
/*!*****************************!*\
  !*** ./views/todo.views.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * @class View
 *
 * Visual representation of the model.
 */
// views/todo.views.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoView = void 0;
class TodoView {
    constructor() {
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
    get _todoText() {
        return this.input.value;
    }
    _resetInput() {
        this.input.value = "";
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    getElement(selector) {
        return document.querySelector(selector);
    }
    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        if (todos.length === 0) {
            const p = this.createElement("p");
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            todos.forEach(todo => {
                const li = this.createElement("li");
                li.id = todo.id;
                const checkbox = this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                const span = this.createElement("span");
                span.contentEditable = "true";
                span.classList.add("editable");
                if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                const deleteButton = this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                this.todoList.append(li);
            });
        }
        console.log(todos);
    }
    _initLocalListeners() {
        this.todoList.addEventListener("input", event => {
            const target = event.target;
            if (target.classList.contains("editable")) {
                this._temporaryTodoText = target.innerText;
            }
        });
    }
    bindAddTodo(handler) {
        this.form.addEventListener("submit", event => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }
    bindDeleteTodo(handler) {
        this.todoList.addEventListener("click", event => {
            const target = event.target;
            if (target.classList.contains("delete")) {
                const id = target.parentElement.id;
                handler(id);
            }
        });
    }
    bindEditTodo(handler) {
        this.todoList.addEventListener("focusout", event => {
            if (this._temporaryTodoText) {
                const target = event.target;
                const id = target.parentElement.id;
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    }
    bindToggleTodo(handler) {
        this.todoList.addEventListener("change", event => {
            const target = event.target;
            if (target.type === "checkbox") {
                const id = target.parentElement.id;
                handler(id);
            }
        });
    }
}
exports.TodoView = TodoView;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************!*\
  !*** ./app.ts ***!
  \****************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const todo_controller_1 = __webpack_require__(/*! ./controllers/todo.controller */ "./controllers/todo.controller.ts");
const todo_service_1 = __webpack_require__(/*! ./services/todo.service */ "./services/todo.service.ts");
const todo_views_1 = __webpack_require__(/*! ./views/todo.views */ "./views/todo.views.ts");
const app = new todo_controller_1.TodoController(new todo_service_1.TodoService(), new todo_views_1.TodoView());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUNqRVQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7O0FDakJDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQixxQkFBcUIsbUJBQU8sQ0FBQyxvREFBc0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUhBQW1ILFdBQVcsbUJBQW1CO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUhBQW1ILFdBQVcsMEJBQTBCO0FBQ3hKO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUMxQ047QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7OztVQzNIaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwwQkFBMEIsbUJBQU8sQ0FBQyx1RUFBK0I7QUFDakUsdUJBQXVCLG1CQUFPLENBQUMsMkRBQXlCO0FBQ3hELHFCQUFxQixtQkFBTyxDQUFDLGlEQUFvQjtBQUNqRCIsInNvdXJjZXMiOlsid2VicGFjazovL3BlYzMvLi9jb250cm9sbGVycy90b2RvLmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vcGVjMy8uL21vZGVscy90b2RvLm1vZGVsLnRzIiwid2VicGFjazovL3BlYzMvLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGVjMy8uL3ZpZXdzL3RvZG8udmlld3MudHMiLCJ3ZWJwYWNrOi8vcGVjMy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZWMzLy4vYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG9kb0NvbnRyb2xsZXIgPSB2b2lkIDA7XHJcbi8qKlxyXG4gKiBAY2xhc3MgVG9kb0NvbnRyb2xsZXJcclxuICpcclxuICogTGlua3MgdGhlIHVzZXIgaW5wdXQgYW5kIHRoZSB2aWV3IG91dHB1dC5cclxuICpcclxuICogQHBhcmFtIHNlcnZpY2VcclxuICogQHBhcmFtIHZpZXdcclxuICovXHJcbi8qQ3VtcGxlIGNvbiBtb2RlbG8gYW7DqW1pY28gcHVlcyBjb250aWVuZSBkYXRvcywgbm8gbG9naWNhIGRlIG5lZ29jaW8sZWwgbWV0b2RvIHV1aWR2NCBlcyBsw7NnaWNhIGRlIHNvcG9ydGUqL1xyXG5jbGFzcyBUb2RvQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlLCB2aWV3KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjdXJyZW50IGxpc3Qgb2YgdG9kb3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gdG9kb3MgLSBUaGUgbGlzdCBvZiB0b2RvcyB0byBiZSBkaXNwbGF5ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vblRvZG9MaXN0Q2hhbmdlZCA9ICh0b2RvcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcuZGlzcGxheVRvZG9zKHRvZG9zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZXMgYWRkaW5nIGEgbmV3IHRvZG8uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gdG9kb1RleHQgLSBUaGUgdGV4dCBvZiB0aGUgdG9kbyB0byBiZSBhZGRlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmhhbmRsZUFkZFRvZG8gPSAodG9kb1RleHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFkZFRvZG8odG9kb1RleHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGFuZGxlcyBlZGl0aW5nIGFuIGV4aXN0aW5nIHRvZG8uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gaWQgLSBUaGUgSUQgb2YgdGhlIHRvZG8gdG8gYmUgZWRpdGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSB0b2RvVGV4dCAtIFRoZSBuZXcgdGV4dCBvZiB0aGUgdG9kby5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmhhbmRsZUVkaXRUb2RvID0gKGlkLCB0b2RvVGV4dCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuZWRpdFRvZG8oaWQsIHRvZG9UZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZXMgZGVsZXRpbmcgYSB0b2RvLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGlkIC0gVGhlIElEIG9mIHRoZSB0b2RvIHRvIGJlIGRlbGV0ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5oYW5kbGVEZWxldGVUb2RvID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5kZWxldGVUb2RvKGlkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIGNvbXBsZXRpb24gc3RhdHVzIG9mIGEgdG9kby5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSBpZCAtIFRoZSBJRCBvZiB0aGUgdG9kbyB0byBiZSB0b2dnbGVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVG9nZ2xlVG9kbyA9IChpZCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UudG9nZ2xlVG9kbyhpZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xyXG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmJpbmRUb2RvTGlzdENoYW5nZWQodGhpcy5vblRvZG9MaXN0Q2hhbmdlZCk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJpbmRBZGRUb2RvKHRoaXMuaGFuZGxlQWRkVG9kbyk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJpbmRFZGl0VG9kbyh0aGlzLmhhbmRsZUVkaXRUb2RvKTtcclxuICAgICAgICB0aGlzLnZpZXcuYmluZERlbGV0ZVRvZG8odGhpcy5oYW5kbGVEZWxldGVUb2RvKTtcclxuICAgICAgICB0aGlzLnZpZXcuYmluZFRvZ2dsZVRvZG8odGhpcy5oYW5kbGVUb2dnbGVUb2RvKTtcclxuICAgICAgICB0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkKHRoaXMuc2VydmljZS50b2Rvcyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Ub2RvQ29udHJvbGxlciA9IFRvZG9Db250cm9sbGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRvZG8gPSB2b2lkIDA7XHJcbmNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IoeyB0ZXh0LCBjb21wbGV0ZSB9KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMudXVpZHY0KCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlID0gY29tcGxldGUgfHwgZmFsc2U7XHJcbiAgICB9XHJcbiAgICB1dWlkdjQoKSB7XHJcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Ub2RvID0gVG9kbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub2RvU2VydmljZSA9IHZvaWQgMDtcclxuY29uc3QgdG9kb19tb2RlbF8xID0gcmVxdWlyZShcIi4uL21vZGVscy90b2RvLm1vZGVsXCIpO1xyXG4vKipcclxuICogQGNsYXNzIFRvZG9TZXJ2aWNlXHJcbiAqXHJcbiAqIE1hbmFnZXMgdGhlIGRhdGEgb2YgdGhlIGFwcGxpY2F0aW9uLlxyXG4gKi9cclxuY2xhc3MgVG9kb1NlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQgPSAoKSA9PiB7IH07XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2Rvc1wiKTtcclxuICAgICAgICBjb25zdCBwYXJzZWQgPSBzdG9yZWQgPyBKU09OLnBhcnNlKHN0b3JlZCkgOiBbXTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gcGFyc2VkLm1hcCgodG9kb0RhdGEpID0+IG5ldyB0b2RvX21vZGVsXzEuVG9kbyh0b2RvRGF0YSkpO1xyXG4gICAgfVxyXG4gICAgYmluZFRvZG9MaXN0Q2hhbmdlZChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMub25Ub2RvTGlzdENoYW5nZWQgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIF9jb21taXQodG9kb3MpIHtcclxuICAgICAgICB0aGlzLm9uVG9kb0xpc3RDaGFuZ2VkKHRvZG9zKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRvZG9zXCIsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XHJcbiAgICB9XHJcbiAgICBhZGRUb2RvKHRleHQpIHtcclxuICAgICAgICBjb25zdCB0b2RvRGF0YSA9IHsgdGV4dCB9O1xyXG4gICAgICAgIHRoaXMudG9kb3MucHVzaChuZXcgdG9kb19tb2RlbF8xLlRvZG8odG9kb0RhdGEpKTtcclxuICAgICAgICB0aGlzLl9jb21taXQodGhpcy50b2Rvcyk7XHJcbiAgICB9XHJcbiAgICBlZGl0VG9kbyhpZCwgdXBkYXRlZFRleHQpIHtcclxuICAgICAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG8pID0+IHRvZG8uaWQgPT09IGlkID8gbmV3IHRvZG9fbW9kZWxfMS5Ub2RvKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdG9kbyksIHsgdGV4dDogdXBkYXRlZFRleHQgfSkpIDogdG9kbyk7XHJcbiAgICAgICAgdGhpcy5fY29tbWl0KHRoaXMudG9kb3MpO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlVG9kbyhpZCkge1xyXG4gICAgICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4gdG9kby5pZCAhPT0gaWQpO1xyXG4gICAgICAgIHRoaXMuX2NvbW1pdCh0aGlzLnRvZG9zKTtcclxuICAgIH1cclxuICAgIHRvZ2dsZVRvZG8oaWQpIHtcclxuICAgICAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAoKHRvZG8pID0+IHRvZG8uaWQgPT09IGlkID8gbmV3IHRvZG9fbW9kZWxfMS5Ub2RvKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdG9kbyksIHsgY29tcGxldGU6ICF0b2RvLmNvbXBsZXRlIH0pKSA6IHRvZG8pO1xyXG4gICAgICAgIHRoaXMuX2NvbW1pdCh0aGlzLnRvZG9zKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvZG9TZXJ2aWNlID0gVG9kb1NlcnZpY2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogQGNsYXNzIFZpZXdcclxuICpcclxuICogVmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbC5cclxuICovXHJcbi8vIHZpZXdzL3RvZG8udmlld3MudHNcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRvZG9WaWV3ID0gdm9pZCAwO1xyXG5jbGFzcyBUb2RvVmlldyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLmdldEVsZW1lbnQoXCIjcm9vdFwiKTtcclxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICB0aGlzLmlucHV0LnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICB0aGlzLmlucHV0LnBsYWNlaG9sZGVyID0gXCJBZGQgdG9kb1wiO1xyXG4gICAgICAgIHRoaXMuaW5wdXQubmFtZSA9IFwidG9kb1wiO1xyXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcclxuICAgICAgICB0aGlzLmZvcm0uYXBwZW5kKHRoaXMuaW5wdXQsIHRoaXMuc3VibWl0QnV0dG9uKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiaDFcIik7XHJcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0Q29udGVudCA9IFwiVG9kb3NcIjtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0ID0gdGhpcy5jcmVhdGVFbGVtZW50KFwidWxcIiwgXCJ0b2RvLWxpc3RcIik7XHJcbiAgICAgICAgdGhpcy5hcHAuYXBwZW5kKHRoaXMudGl0bGUsIHRoaXMuZm9ybSwgdGhpcy50b2RvTGlzdCk7XHJcbiAgICAgICAgdGhpcy5faW5pdExvY2FsTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgX3RvZG9UZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0LnZhbHVlO1xyXG4gICAgfVxyXG4gICAgX3Jlc2V0SW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICAgICAgICBpZiAoY2xhc3NOYW1lKVxyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuICAgIGdldEVsZW1lbnQoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5VG9kb3ModG9kb3MpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy50b2RvTGlzdC5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9kb0xpc3QucmVtb3ZlQ2hpbGQodGhpcy50b2RvTGlzdC5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gdGhpcy5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiTm90aGluZyB0byBkbyEgQWRkIGEgdGFzaz9cIjtcclxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmQocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgICAgIGxpLmlkID0gdG9kby5pZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRvZG8uY29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gdGhpcy5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIHNwYW4uY29udGVudEVkaXRhYmxlID0gXCJ0cnVlXCI7XHJcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJlZGl0YWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0b2RvLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaWtlID0gdGhpcy5jcmVhdGVFbGVtZW50KFwic1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpa2UudGV4dENvbnRlbnQgPSB0b2RvLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5hcHBlbmQoc3RyaWtlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0b2RvLnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIkRlbGV0ZVwiO1xyXG4gICAgICAgICAgICAgICAgbGkuYXBwZW5kKGNoZWNrYm94LCBzcGFuLCBkZWxldGVCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmQobGkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codG9kb3MpO1xyXG4gICAgfVxyXG4gICAgX2luaXRMb2NhbExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQgPSB0YXJnZXQuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBiaW5kQWRkVG9kbyhoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG9kb1RleHQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIodGhpcy5fdG9kb1RleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRJbnB1dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBiaW5kRGVsZXRlVG9kbyhoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJpbmRFZGl0VG9kbyhoYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGVtcG9yYXJ5VG9kb1RleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGlkLCB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wb3JhcnlUb2RvVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJpbmRUb2dnbGVUb2RvKGhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRvZG9WaWV3ID0gVG9kb1ZpZXc7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB0b2RvX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzL3RvZG8uY29udHJvbGxlclwiKTtcclxuY29uc3QgdG9kb19zZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy90b2RvLnNlcnZpY2VcIik7XHJcbmNvbnN0IHRvZG9fdmlld3NfMSA9IHJlcXVpcmUoXCIuL3ZpZXdzL3RvZG8udmlld3NcIik7XHJcbmNvbnN0IGFwcCA9IG5ldyB0b2RvX2NvbnRyb2xsZXJfMS5Ub2RvQ29udHJvbGxlcihuZXcgdG9kb19zZXJ2aWNlXzEuVG9kb1NlcnZpY2UoKSwgbmV3IHRvZG9fdmlld3NfMS5Ub2RvVmlldygpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9