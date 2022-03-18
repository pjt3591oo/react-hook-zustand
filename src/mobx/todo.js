import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react';

export class Todo {
  todos = []

  constructor () {
    makeAutoObservable(this);
  }

  addTodo (todo) {
    this.todos = [...this.todos, todo];
  }

  removeTodo (todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
  }
  
  removeAllTodo () {
    this.todos = []
  }

  toggleTodo (todo) {
    this.todos = this.todos.map(t => ({
      ...t,
      completed: t.id === todo.id ? !t.completed : t.completed
    }))
  }
}