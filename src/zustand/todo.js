import create from 'zustand';

/**
 * todos properties
 *   id: number
 *   title: string
 *   completed: boolean
 */
export const useStore =  create(set => ({
  todos: [],
  
  addTodo: todo => {
    set(state => ({
      todos: [...state.todos, todo]
    }));
  },
  
  removeTodo: todo => {
    set(state => {
      return {
        todos: state.todos.filter(t => t.id !== todo.id)
      }
    });
  },

  removeAllTodo: () => {
    set(state => ({
      todos: []
    }))
  },

  toggleTodo: todo => {
    set(state => {
      return {
        todos: state.todos.map(t => ({
        ...t,
        completed: t.id === todo.id ? !t.completed : t.completed
      }))
      }
    })
  }

}))