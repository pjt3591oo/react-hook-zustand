import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload.id)
    },

    removeAllTodo: (state) => {
      state.todos = [];
    },

    toggleTodo: (state, action) => {
      state.todos = state.todos.map(t => ({
        ...t,
        completed: t.id === action.payload.id ? !t.completed : t.completed
      }))
    },
  },
})

export const { addTodo, removeTodo, removeAllTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer