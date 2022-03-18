import { renderHook, act } from "@testing-library/react-hooks";
import { useStore } from '../stores/todo';

describe('zustand Todo', () => {
  let todos = {};

  beforeEach(() => {
    // global 상태 관리가 된다.
    // eslint-disable-next-line testing-library/no-render-in-setup
    const { result } = renderHook(() => useStore((state) => state));

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

  it('addTodo', () => {
    expect(todos.current.todos.length).toEqual(3)
  })

  it('removeTodo', () => {
    act(() => {
      todos.current.removeTodo({id: 1, title: '1', completed: false})
    })

    expect(todos.current.todos.length).toEqual(4)
    expect(todos.current.todos[0].title).toEqual('0')
    expect(todos.current.todos[1].title).toEqual('2')
    expect(todos.current.todos[2].title).toEqual('0')
    expect(todos.current.todos[3].title).toEqual('2')
  })
  
  it('removeAllTodo', () => {
    act(() => {
      todos.current.removeAllTodo();
    })
  
    expect(todos.current.todos.length).toEqual(0)
  })

  it('toggleTodo', () => {
    act(() => {
      todos.current.toggleTodo({id: 1, title: '1', completed: false})
    })
  
    expect(todos.current.todos[0].completed).toBe(false)
    expect(todos.current.todos[1].completed).toBe(true)
    expect(todos.current.todos[2].completed).toBe(false)
  })
  
})