import React from "react";
import TodoItem from "./TodoItem";

function TodoList({tasks, onDelete, onEdit}) {
    return(
        <ul className="todo-list">
            {tasks.map((tasks) =>(
                // <li key={tasks.id} className="todo-item">
                //     {tasks.text}
                // </li>
                <TodoItem
                key ={tasks.id}
                task={tasks}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TodoList;