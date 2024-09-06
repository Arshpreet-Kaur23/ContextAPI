import React, { useState } from 'react';
import { useTodo } from '../context'; // Adjust the import path if necessary

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo(); // Call useTodo as a function

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id); // Call the context function
  };

  return (
    <div className={`flex border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
      <input 
        type='checkbox' 
        className='cursor-pointer' 
        checked={todo.completed} 
        onChange={toggleCompleted} 
      />
      <input 
        type='text' 
        className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`} 
        value={todoMsg} 
        onChange={(e) => setTodoMsg(e.target.value)} 
        readOnly={!isTodoEditable} 
      />
      <button 
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50' 
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(prev => !prev);
          }
        }} 
        disabled={todo.completed}
      >
        {isTodoEditable ? "DONE" : "EDIT"}
      </button>
      <button 
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0' 
        onClick={() => deleteTodo(todo.id)}
      >
        DELETE
      </button>
    </div>
  );
}

export default TodoItem;
