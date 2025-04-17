import { Todo } from "../models/todo.model";
import { ITodoData } from "../models/todo.model";


/**
 * @class TodoService
 *
 * Manages the data of the application.
 */
export class TodoService {
  public todos: Todo[] = [];
  private onTodoListChanged: (todos: Todo[]) => void = () => {};

  constructor() {
    const stored = localStorage.getItem("todos");
    const parsed: any[] = stored ? JSON.parse(stored) : [];

    this.todos = parsed.map((todoData: ITodoData) => new Todo(todoData));
  }

  public bindTodoListChanged(callback: (todos: Todo[]) => void): void {
    this.onTodoListChanged = callback;
  }

  private _commit(todos: Todo[]): void {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  public addTodo(text: string): void {
    const todoData: ITodoData = { text };
    this.todos.push(new Todo(todoData));
    this._commit(this.todos);
  }

  public editTodo(id: string, updatedText: string): void {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? new Todo({ ...todo, text: updatedText }) : todo
    );
    this._commit(this.todos);
  }

  public deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this._commit(this.todos);
  }

  public toggleTodo(id: string): void {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? new Todo({ ...todo, complete: !todo.complete }) : todo
    );
    this._commit(this.todos);
  }
}
