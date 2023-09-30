import { useState } from 'react';
import './Todo.css';

export default function Todo({
  todo,
  onDelete,
  onChange
}) {
    const [checked, setChecked] = useState(todo.done);
    return (
      <div className="card">
      <div className='buttonContainer'>
        <button className = "deleteButton" onClick={() => onDelete(todo.id)} > 
            X
        </button>
      </div>
        <section>
          <h4 className = "todoTitle"><b>{todo.title}</b></h4>
        </section>
        <input type="checkbox" checked={checked} onChange={() => {
          onChange(todo);
          setChecked(!checked);
        }}></input>
      </div>
    );
  }