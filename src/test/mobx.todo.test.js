import { renderHook, act } from "@testing-library/react-hooks";

import { Todo } from '../mobx/todo';

const todos = new Todo()

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  // const { result } = renderHook(() => new Todo());

  act(() => {
    todos.addTodo({id: 0, title: '0', completed: false})
  })
  act(() => {
    todos.addTodo({id: 1, title: '1', completed: false})
  })
  act(() => {
    todos.addTodo({id: 2, title: '2', completed: false});
  })

  // todos = result
})

test('addTodo', () => {
  expect(todos.todos.length).toBe(3);
})

test('removeTodo', () => {
  act(() => {
    todos.removeTodo({id: 1, title: '1', completed: false})
  })

  expect(todos.todos.length).toEqual(4)
  expect(todos.todos[0].title).toEqual('0')
  expect(todos.todos[1].title).toEqual('2')
  expect(todos.todos[2].title).toEqual('0')
  expect(todos.todos[3].title).toEqual('2')
})

test('removeAllTodo', () => {
  act(() => {
    todos.removeAllTodo();
  })

  expect(todos.todos.length).toEqual(0)
})

test('toggleTodo', () => {
  act(() => {
    todos.toggleTodo({id: 1, title: '1', completed: false})
  })

  expect(todos.todos[0].completed).toBe(false)
  expect(todos.todos[1].completed).toBe(true)
  expect(todos.todos[2].completed).toBe(false)
})
