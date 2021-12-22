import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [todos, setTodos] = useState([])

  const [input, setInput] = useState('')

  function getTodos() {
    axios.get('http://localhost:8000/todo')
      .then(response => setTodos(response.data))
  }

  function createTodo(input) {
    axios.post('http://localhost:8000/todo', { content: input })
      .then(() => getTodos())
      .then(() => setInput(''))
  }

  function deleteTodo(id) {
    axios.delete(`http://localhost:8000/todo/${id}`)
      .then(() => getTodos())
  }

  useEffect(() => {
    getTodos()
  }, [])

  function Todo(props) {
    return (
      <button button className='todo' onClick={() => deleteTodo(props.id)} >
        <p>
          {props.children}
        </p>
        <div>
          ✔
        </div>
      </button >
    )
  }

  return (
    <div className='root'>
      <div className='column'>
        <textarea
          className='text-area'
          rows={5}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className='add-button' onClick={() => createTodo(input)}>
          Add
        </button>
        {todos.map((todo) => <Todo id={todo.id}>{todo.content}</Todo>)}
      </div>
    </div>
  );
}

export default App;