
import React, { useState, useEffect, useRef } from "react";
import "./TodoItem.css";

function TodoItem({
  task,
  onDelete,
  onEdit,
  onToggleComplete,
  onAddComment,
  onDeleteComment,
  onEditComment,
  onAddDueDate,
  onDeleteDueDate,
  isPremium,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showDueDateModal, setShowDueDateModal] = useState(false);
  const [tempDueDate, setTempDueDate] = useState(task.dueDate || "");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tempComment, setTempComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const saveEdit = () => {
    if (editText.trim() && onEdit) {
      onEdit(task._id, editText.trim());
      setIsEditing(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <li className={`todo-item ${task.completed ? "completed" : ""}`}>
        <input
          className="task-checkbox"
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggleComplete && onToggleComplete(task._id)}
        />

        {isEditing ? (
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEdit();
              } else if (e.key === "Escape") {
                setIsEditing(false);
                setEditText(task.text);
                setMenuOpen(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="task-info">
            <span className="task-text">{task.text}</span>
            {task.category && (
              <span className={`task-category ${task.category.toLowerCase()}`}>
                {task.category}
              </span>
            )}
          </div>
        )}
      <div className="task-actions">
        <button 
        className="due-date-btn"
        onClick={() =>{
          if(!isPremium) return alert("Premium Feature");
          setShowDueDateModal(true);
        }}
        >
          🗓️
        </button>
         {/* 💬 Comment icon (only) */}
        <button
          className="comment-btn"
          onClick={() => {
            if(!isPremium) return alert("Premium Feature");
              setShowCommentModal(true)}}
          aria-label="View comments"
        >
          💬
        </button>

        <button 
        className="attachment-btn"
        onClick={()=>{
          if(isPremium) return alert("Premium Feature");
          
        }}
        >
          📎
        </button>

        {/* Dropdown menu */}
        <button
          className="more-action-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More actions"
        >
          <b>⁝</b>
        </button>
      </div>
        {menuOpen && (
          <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
            {!isEditing && (
              <button
                className="dropdown-btn edit"
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
              >
                Edit Task
              </button>
            )}

            <button
              className="dropdown-btn delete"
              onClick={() => {
                setMenuOpen(false);
                onDelete && onDelete(task._id);
              }}
            >
              Delete Task
            </button>
          </div>
        )}
            {/* <button
              className="dropdown-btn due-date"
              onClick={() => {
                if (!isPremium) return alert("Premium Feature");
                setShowDueDate(true);
              }}
            >
              Set Due Date
            </button> */}

            {/* {showDueDate && (
              <div className="inline-input">
                <input
                  type="date"
                  value={tempDueDate}
                  onChange={(e) => setTempDuedate(e.target.value)}
                />
                <button
                  onClick={() => {
                    onAddDueDate(task._id, tempDueDate);
                    setShowDueDate(false);
                    setMenuOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}*/}
      </li> 

      {/* 💬 Popup Modal for comments */}
      {/* <button className="comment-icon"
      onClick={()=>{
        if(!isPremium) return alert("premium Feature");
        setShowCommentModal(true);
      }}>💬</button> */}
      
      {showCommentModal && isPremium &&(
        <div className="modal-overlay">
          <div className="modal">
            <h3>{task.text}</h3>
            {task.dueDate && (
              <p>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}

            <h4>Comments</h4>
            {task.comments && task.comments.length > 0 ? (
              task.comments.map((c, i) => (
                <div key={i} className="comment-row">
                  {editingCommentIndex === i ? (
                    <div>
                      <input
                        type="text"
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          onEditComment(task._id, i, editingCommentText);
                          setEditingCommentIndex(null);
                          setEditingCommentText("");
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCommentIndex(null);
                          setEditingCommentText("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="comment-display">
                      <span>💬 {c}</span>
                      <div className="comment-actions">
                        <button
                          onClick={() => {
                            setEditingCommentIndex(i);
                            setEditingCommentText(c);
                          }}
                        >
                          ✏️
                        </button>
                        <button onClick={() => onDeleteComment(task._id, i)}>
                          ❌
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <div className="add-comment">
              <input
                type="text"
                value={tempComment}
                placeholder="Add new comment"
                onChange={(e) => setTempComment(e.target.value)}
              />
              <button
                onClick={() => {
                  onAddComment(task._id, tempComment);
                  setTempComment("");
                }}
              >
                Add
              </button>
            </div>

            <button className="close-btn" onClick={() => setShowCommentModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Due Date Model */}
      {showDueDateModal && isPremium &&(
        <div className="date-modal-overlay">
        <div className="date-modal-content">
          <h3>Set Due Date</h3>
          <input 
          type="date"
          value={tempDueDate}
          onChange={(e) => setTempDueDate(e.target.value)}
          />
          <button
          onClick={() => {
            onAddDueDate(task._id, tempDueDate);
            setShowDueDateModal(false);
          }}
          >Save</button>
          {task.dueDate && (
            <button
            onClick={() =>{
              onDeleteDueDate(task._id);
              setShowDueDateModal(false);
            }}
            >Remove Date</button>
          )}
          <button onClick={() => setShowDueDateModal(false)}>Close</button>
        </div>
        </div>
      )}
    
    </>
  );
}

export default TodoItem;


