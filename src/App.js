import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const storedTodos = [];
    if (localStorage.getItem('data')) {
      JSON.parse(localStorage.getItem('data')).forEach(todo => {
        storedTodos.push(todo);
      });
    }
    setTodos(storedTodos);
  }, []);

  const addTodo = () => {
    if (newTodo) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
      };
      setTodos([...todos, newTodoItem]);
      localStorage.setItem('data', JSON.stringify([...todos, newTodoItem]));
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('data', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const startEditing = (id, text) => {
    setEditingTodo(id);
    setEditedText(text);
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editedText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('data', JSON.stringify(updatedTodos));
    setEditingTodo(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, reorderedItem);
    localStorage.setItem('data', JSON.stringify(reorderedTodos));

    setTodos(reorderedTodos);
  };

  return (
    <div className="App" style={{ width: "250px" }}>
      <h1>Todo List</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div style={{ height: "30px" }}></div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        {editingTodo === todo.id ? (
                          <>
                            <input
                              type="text"
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                            />
                            <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
                          </>
                        ) : (
                          <>
                            <span>{todo.text}</span>
                            <button onClick={() => startEditing(todo.id, todo.text)}>
                              Edit
                            </button>
                          </>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
