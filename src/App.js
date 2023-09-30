import './App.css';
import Button from './components/Button';
import { useState } from 'react';
import TodoList from './components/TodoList';

let nextId = 4;

let initialTodos = [
  {
    id: 0,
    title: 'Learn HTML+CSS',
    done: true
  },
  {
    id: 1,
    title: 'Learn Javascript+React',
    done: true
  },
  {
    id: 2,
    title: 'Write dynamic UI frontend',
    done: true
  },
  {
    id: 3,
    title: 'Get points for the task',
    done: false
  }
];

function App() {
  let localstorageTodos = [];
  if (localStorage.getItem('allTodos')) {
    JSON.parse(localStorage.getItem('allTodos')).forEach(todo => {
      localstorageTodos.push(todo);
    });
  }
  else {
    localstorageTodos = null;
  }
  initialTodos = localstorageTodos || initialTodos;

  function sortTodos(todos) {
    todos.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      else if (a.id > b.id) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
  sortTodos(initialTodos);
  nextId = localStorage.getItem('nextId') || nextId;
  //localStorage.clear();
  const [todos, setTodos] = useState(initialTodos);

  function swapTodos(id1, id2) {
    let resTodos = [...todos];

    let i1 = resTodos.findIndex(x => x.id == id1);
    let i2 = resTodos.findIndex(x => x.id == id2);

    const id = resTodos[i1].id;
    resTodos[i1].id = resTodos[i2].id;
    resTodos[i2].id = id;

    sortTodos(resTodos);

    setTodos(
      resTodos
    );
    localStorage.setItem('allTodos', JSON.stringify(resTodos));
  }

  function handleAddTodo(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson);

    if (formJson.todoText === '' || !formJson.todoText) {
      formJson.todoText = 'Do something';
    }
    let resTodos = [
      ...todos,
      {
        id: nextId++,
        title: formJson.todoText,
        done: false
      }
    ]
    setTodos(
      resTodos
    );
    localStorage.setItem('allTodos', JSON.stringify(resTodos));
    localStorage.setItem('nextId', nextId);
  }

  function handleChangeTodo(todo) {
    const index = todos.findIndex(t => t.id === todo.id);
    todo.done = !todo.done;

    todos[index].done = todo.done;
    setTodos(todos);
    localStorage.setItem('allTodos', JSON.stringify(todos));
  }

  function handleDeleteTodo(todoId) {
    var remainingTodos = todos.filter(t => t.id !== todoId);
    setTodos(
      remainingTodos
    );
    localStorage.setItem('allTodos', JSON.stringify(remainingTodos));
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <header className="App-header">
          <Button
            handleSubmit={handleAddTodo}
          />
        </header>

        <TodoList todos={todos}
          onDelete={handleDeleteTodo}
          swapTodos={swapTodos}
          onChange={handleChangeTodo}/>
      </div>
    </div>
  );
}

export default App;
