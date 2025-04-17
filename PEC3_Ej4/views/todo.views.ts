/**
 * @class View
 *
 * Visual representation of the model.
 */
// views/todo.views.ts

import { Todo } from '../models/todo.model';
import { ITodoView } from '../models/todo.model';
export class TodoView implements ITodoView { 
  private app: HTMLElement;
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private submitButton: HTMLButtonElement;
  private title: HTMLElement;
  private todoList: HTMLUListElement;
  private _temporaryTodoText: string = "";

  constructor() {
    this.app = this.getElement("#root") as HTMLElement;
    this.form = this.createElement("form") as HTMLFormElement;
    this.input = this.createElement("input") as HTMLInputElement;
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";

    this.submitButton = this.createElement("button") as HTMLButtonElement;
    this.submitButton.textContent = "Submit";
    this.form.append(this.input, this.submitButton);

    this.title = this.createElement("h1");
    this.title.textContent = "Todos";

    this.todoList = this.createElement("ul", "todo-list") as HTMLUListElement;
    this.app.append(this.title, this.form, this.todoList);

    this._initLocalListeners();
  }

  private get _todoText(): string {
    return this.input.value;
  }

  private _resetInput(): void {
    this.input.value = "";
  }

  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  private getElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }

  public displayTodos(todos: Todo[]): void {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li = this.createElement("li");
        li.id = todo.id;

        const checkbox = this.createElement("input") as HTMLInputElement;
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this.createElement("span");
        span.contentEditable = "true";
        span.classList.add("editable");

        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
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

  private _initLocalListeners(): void {
    this.todoList.addEventListener("input", event => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("editable")) {
        this._temporaryTodoText = target.innerText;
      }
    });
  }

  public bindAddTodo(handler: (todoText: string) => void): void {
    this.form.addEventListener("submit", event => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  public bindDeleteTodo(handler: (id: string) => void): void {
    this.todoList.addEventListener("click", event => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("delete")) {
        const id = (target.parentElement as HTMLElement).id;
        handler(id);
      }
    });
  }

  public bindEditTodo(handler: (id: string, text: string) => void): void {
    this.todoList.addEventListener("focusout", event => {
      if (this._temporaryTodoText) {
        const target = event.target as HTMLElement;
        const id = (target.parentElement as HTMLElement).id;
        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  public bindToggleTodo(handler: (id: string) => void): void {
    this.todoList.addEventListener("change", event => {
      const target = event.target as HTMLInputElement;
      if (target.type === "checkbox") {
        const id = (target.parentElement as HTMLElement).id;
        handler(id);
      }
    });
  }
}