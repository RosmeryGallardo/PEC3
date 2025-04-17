
import { TodoService } from '../services/todo.service';
import { TodoView } from '../views/todo.views';
import { Todo } from '../models/todo.model';

/**
 * @class TodoController
 *
 * Links the user input and the view output.
 *
 * @param service 
 * @param view 
 */
/*Cumple con modelo anémico pues contiene datos, no logica de negocio,el metodo uuidv4 es lógica de soporte*/
export class TodoController {
  private service: TodoService;
  private view: TodoView;

  constructor(service: TodoService, view: TodoView) {
    this.service = service;
    this.view = view;

    this.service.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    this.onTodoListChanged(this.service.todos);
  }
  

  /**
   * Updates the view with the current list of todos.
   * 
   * @param todos - The list of todos to be displayed.
   */
  private onTodoListChanged = (todos: Todo[]): void => {
    this.view.displayTodos(todos);
  };

  /**
   * Handles adding a new todo.
   * 
   * @param todoText - The text of the todo to be added.
   */
  private handleAddTodo = (todoText: string): void => {
    this.service.addTodo(todoText);
  };

  /**
   * Handles editing an existing todo.
   * 
   * @param id - The ID of the todo to be edited.
   * @param todoText - The new text of the todo.
   */
  private handleEditTodo = (id: string, todoText: string): void => {
    this.service.editTodo(id, todoText);
  };

  /**
   * Handles deleting a todo.
   * 
   * @param id - The ID of the todo to be deleted.
   */
  private handleDeleteTodo = (id: string): void => {
    this.service.deleteTodo(id);
  };

  /**
   * Handles toggling the completion status of a todo.
   * 
   * @param id - The ID of the todo to be toggled.
   */
  private handleToggleTodo = (id: string): void => {
    this.service.toggleTodo(id);
  
  
  };
  
}
