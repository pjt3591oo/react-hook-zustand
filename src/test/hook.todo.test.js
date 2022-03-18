import { renderHook, act } from "@testing-library/react-hooks";

import { useTodo } from '../hooks/todo';


test('addTodo', () => {
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
  
  expect(result.current.todos.length).toEqual(3)
})

test('removeTodo', () => {
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

  act(() => {
    result.current.removeTodo({id: 1, title: '1', completed: false})
  })

  expect(result.current.todos.length).toEqual(2)
  expect(result.current.todos[1].title).toEqual('2')
})

test('removeAllTodo', () => {
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

  act(() => {
    result.current.removeAllTodo();
  })

  expect(result.current.todos.length).toEqual(0)
})

test('toggleTodo', () => {
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

  act(() => {
    result.current.toggleTodo({id: 1, title: '1', completed: false})
  })

  expect(result.current.todos[0].completed).toBe(false)
  expect(result.current.todos[1].completed).toBe(true)
  expect(result.current.todos[2].completed).toBe(false)
})
