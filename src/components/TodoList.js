import Todo from './Todo';
import './TodoList.css'
import { useEffect, useState } from 'react';

export default function TodoList({
  todos,
  onDelete,
  swapTodos,
  onChange
}) {
  const [dragTodo, setDragTodo] = useState(null);

  function dragStart(e) {
    this.style.opacity = '0.4';
    setDragTodo(this);
  };

  function dragEnter(e) {
    this.classList.add('over');
  }

  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }

  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function dragDrop(e) {
    if (dragTodo != this) {
      setTimeout(() => {
        const html = this.innerHTML;
        try {
          this.innerHTML = dragTodo.innerHTML;
          dragTodo.innerHTML = html;
          swapTodos(this.dataset.id, dragTodo.dataset.id);
        }
        catch {}
      }, 100);
    }
    return false;
  }

  function dragEnd(e) {
    var listItems = document.querySelectorAll('.draggable');
    [].forEach.call(listItems, function (item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }

  function addDnD(el) {
    el.addEventListener('dragstart', dragStart, true);
    el.addEventListener('dragenter', dragEnter, true);
    el.addEventListener('dragover', dragOver, true);
    el.addEventListener('dragleave', dragLeave, true);
    el.addEventListener('drop', dragDrop, true);
    el.addEventListener('dragend', dragEnd, true);
  }
  function removeDnD(el) {
    el.removeEventListener('dragstart', dragStart, true);
    el.removeEventListener('dragenter', dragEnter, true);
    el.removeEventListener('dragover', dragOver, true);
    el.removeEventListener('dragleave', dragLeave, true);
    el.removeEventListener('drop', dragDrop, true);
    el.removeEventListener('dragend', dragEnd, true);
  }
  useEffect(() => {
    var listItems = document.querySelectorAll('.draggable');
    [].forEach.call(listItems, function (item) {
      removeDnD(item);
      addDnD(item);
    });
  });
  
  return (
    <ol className='todoList'>
      {todos.map(todo => (
        <ul data-id={todo.id} className="draggable" draggable="true" key={todo.id}>
          <Todo cellPadding="0px"
            todo={todo}
            onDelete={onDelete}
            onChange={onChange}
          />
        </ul>
      ))}
    </ol>
  );
}