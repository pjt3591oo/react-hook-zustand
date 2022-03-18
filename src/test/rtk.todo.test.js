import { act } from "@testing-library/react-hooks";
import { store } from '../redux';

import {addTodo, removeTodo, removeAllTodo, toggleTodo } from '../redux/todo';

describe('zustand Todo', () => {

  beforeEach(() => {
    act(() => {
      store.dispatch(addTodo({id: 0, title: '0', completed: false}));
    })
    act(() => {
      store.dispatch(addTodo({id: 1, title: '1', completed: false}));
    })
    act(() => {
      store.dispatch(addTodo({id: 2, title: '2', completed: false}));
    })
  })

  it('addTodo', () => {
    expect(store.getState().todos.todos.length).toEqual(3)
  })

  it('removeTodo', () => {
    act(() => {
      store.dispatch(removeTodo({id: 1, title: '1', completed: false}));
    })

    expect(store.getState().todos.todos.length).toEqual(4)
    expect(store.getState().todos.todos[0].title).toEqual('0')
    expect(store.getState().todos.todos[1].title).toEqual('2')
    expect(store.getState().todos.todos[2].title).toEqual('0')
    expect(store.getState().todos.todos[3].title).toEqual('2')
  })
  
  it('removeAllTodo', () => {
    act(() => {
      store.dispatch(removeAllTodo());
    })
  
    expect(store.getState().todos.todos.length).toEqual(0)
  })

  it('toggleTodo', () => {
    act(() => {
      store.dispatch(toggleTodo({id: 1, title: '1', completed: false}));
    })
  
    expect(store.getState().todos.todos[0].completed).toBe(false)
    expect(store.getState().todos.todos[1].completed).toBe(true)
    expect(store.getState().todos.todos[2].completed).toBe(false)
  })
  
})