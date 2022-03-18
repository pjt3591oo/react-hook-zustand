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
    set(state => ({
      todos: state.todos.filter(t => t.id !== todo.id)
    }));
  },

  removeAllTodo: () => {
    set(state => ({
      todos: []
    }))
  },

  toggleTodo: todo => {
    
    set(state => {
      const idx = state.todos.findIndex(t => t.id === todo.id);
      
      return {
        todos: state.todos[idx].completed = !todo.completed
      }
    })
  }

}))