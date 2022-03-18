# hooks VS zustand

hooks와 zustand 비교

### usage

```bash
$ npm test

 PASS  src/test/hook.todo.test.js
 PASS  src/test/App.test.js
 PASS  src/test/store.todo.test.js

Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.146 s
Ran all test suites.

Watch Usage: Press w to show more.
```

### hooks

* description

```js
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
```

* test

```js
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
```

### zustand

* description

```js
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
```

* test

```js
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
```