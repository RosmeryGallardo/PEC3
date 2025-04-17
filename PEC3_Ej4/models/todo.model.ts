/**
 * @class Todo
 * @interface ITodoData
 * @interface ITodoView
 * Manages the data of the application.
 */
//Cumple como modelo anémico pues solo contiene datos, text, id, complete, no contiene lógica de negocio y la lógica está en el servicio. 
export interface ITodoView {
  displayTodos(todos: Todo[]): void;
  bindAddTodo(handler: (todoText: string) => void): void;
  bindDeleteTodo(handler: (id: string) => void): void;
  bindEditTodo(handler: (id: string, text: string) => void): void;
  bindToggleTodo(handler: (id: string) => void): void;
}
export interface ITodoData {
  text: string;
  complete?: boolean; 
} 
export class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor({ text, complete }: { text: string; complete?: boolean }) {
    this.id = this.uuidv4();
    this.text = text;
    this.complete = complete || false; 
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; 
      const v = c === 'x' ? r : (r & 0x3 | 0x8); 
      return v.toString(16); 
    });
  }
}

