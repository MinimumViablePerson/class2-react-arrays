import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Buy milk',
    completed: true
  },
  {
    id: 2,
    title: 'Cook dinner',
    completed: false
  },
  {
    id: 3,
    title: 'Conquer the World',
    completed: true
  }
]

function App () {
  const [todos, setTodos] = useState(initialTodos)

  // when I click a todo
  // it toggles the completed property
  function toggleTodo (todo: Todo) {
    // it toggles the completed property
    // to do this immutably:
    // 1) make a copy of the array
    // 2) update the copy of the todo
    // 3) replace the old todo list with the new, updated one
    // DEEP CLONE

    // copy
    const todosCopy = structuredClone(todos)

    // change
    const targetTodo = todosCopy.find(target => target.id === todo.id)
    targetTodo.completed = !targetTodo.completed

    setTodos(todosCopy)
  }

  function deleteTodo (todo: Todo) {
    const updatedTodos = todos.filter(target => target.id !== todo.id)
    setTodos(updatedTodos)
  }

  function addTodo (title: string) {
    const newTodo: Todo = {
      id: Math.random(),
      title: title,
      completed: false
    }

    const updatedTodos = structuredClone(todos)
    updatedTodos.push(newTodo)

    setTodos(updatedTodos)
  }

  return (
    <div className='App'>
      <h1>Todo App</h1>

      <button
        onClick={() => {
          setTodos(initialTodos)
        }}
      >
        RESET
      </button>

      <form
        onSubmit={event => {
          event.preventDefault()
          addTodo(event.target.todo.value)
          event.target.reset()
        }}
      >
        <input
          className='todo-input'
          type='text'
          placeholder='add a todo...'
          name='todo'
          required
          minLength={3}
        />
        <button>ADD TODO</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li className={todo.completed ? 'todo completed' : 'todo'}>
            <span
              onClick={() => {
                toggleTodo(todo)
              }}
            >
              {todo.title}
            </span>

            <button
              onClick={() => {
                deleteTodo(todo)
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
