import { useState } from 'react';

/**
 * todos properties
 *   id: number
 *   title: string
 *   completed: boolean
 */
export const useTodo = () => {
  const [ todos, setTodos] = useState([]);
  
  function addTodo (todo) {
    setTodos([...todos, todo])
  }
  
  function removeTodo (todo) {
    setTodos(todos.filter(t => t.id !== todo.id));
  }

  function removeAllTodo () {
    setTodos([]);
  }

  function toggleTodo (todo) {

    setTodos(
      todos.map(t => ({
        ...t,
        completed: t.id === todo.id ? !t.completed : t.completed
      }))
    );
  }

  return {
    todos, addTodo, removeTodo,
    removeAllTodo, toggleTodo
  }
}