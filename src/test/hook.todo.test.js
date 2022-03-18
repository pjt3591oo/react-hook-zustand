// https://testing-library.com/docs/react-testing-library/example-intro

import { renderHook, act } from "@testing-library/react-hooks";

import { useTodo } from '../hooks/todo';

let todos = {};

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  const { result } = renderHook(() => useTodo());
  
  act(() => {
    result.current.addTodo({id: 0, title: '0', completed: false});
  })
  act(() => {
    result.current.addTodo({id: 1, title: '1', completed: false});
  })
  act(() => {
    result.current.addTodo({id: 2, title: '2', completed: false});
  })

  todos = result
})

test('addTodo', () => {
  expect(todos.current.todos.length).toEqual(3)
})

test('removeTodo', () => {
  act(() => {
    todos.current.removeTodo({id: 1, title: '1', completed: false})
  })

  expect(todos.current.todos.length).toEqual(2)
  expect(todos.current.todos[1].title).toEqual('2')
})

test('removeAllTodo', () => {
  act(() => {
    todos.current.removeAllTodo();
  })

  expect(todos.current.todos.length).toEqual(0)
})

test('toggleTodo', () => {
  act(() => {
    todos.current.toggleTodo({id: 1, title: '1', completed: false})
  })

  expect(todos.current.todos[0].completed).toBe(false)
  expect(todos.current.todos[1].completed).toBe(true)
  expect(todos.current.todos[2].completed).toBe(false)
})
