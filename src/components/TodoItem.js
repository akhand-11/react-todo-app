import React, { useState, useEffect, useRef } from "react";
import "./TodoItem.css";

function TodoItem({ task, onDelete, onEdit , onToggleComplete}) {
  const [menuOpen, setMenuOpen] =useState(false);
  const [isEditing, setIsEditing] =useState(false);
  const [editText, setEditText] =useState(task.text);
  const ref =useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if(ref.current && !ref.current.contains(e.target)){
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const saveEdit =() =>{
    if(editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
      setMenuOpen(false);
    }
  };
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`} ref ={ref}>
      <input 
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete && onToggleComplete(task.id)}
      />
        {isEditing ? (
        <input
        className="edit-input" 
        value={editText} 
        onChange={(e) => setEditText(e.target.value)}
        onBlur={saveEdit} onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveEdit();
          } else if( e.key==="Escape"){
            setIsEditing(false);
            setEditText(task.text);
            setMenuOpen(false);
          }
        }}
        autoFocus
        />
      ):(
         <span className="task-text">{task.text}</span>
      )}
     
      <button className="more-icon" onClick={() => setMenuOpen((v) => !v)} aria-label="More actions">⁝</button>

      {menuOpen && (
        <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          {!isEditing && (
               <button className="dropdown-btn edit" 
               onClick={() => { 
                setIsEditing(true);
                setMenuOpen(false); 
            }}
              >Edit</button>
          )}
          <button className="dropdown-btn delete" onClick={() => {
            setMenuOpen(false); 
            onDelete && onDelete(task.id);}}
          >Delete</button>

        </div>
      )}
    </li>
  );
}

export default TodoItem;
