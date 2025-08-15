import React, {useState} from "react";
import './TodoInput.css';

function TodoInput({onAdd, isPremium}) {
    const[task, setTask] = useState("");
    const[category, setCategory] =useState("others");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.trim()){
            onAdd(task.trim(), category);
            setTask("");
            setCategory("others");
        }
    };

    return(
        <form className="todo-input-container" onSubmit={handleSubmit}>
            <input 
             type ="text"
             className="todo-input"
             placeholder="Type your task here..."
             value={task}
             onChange={(e) => setTask(e.target.value)}
             />
             <select
             className="category-select"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             disabled={!isPremium}
             title={!isPremium ? "Premium feature" : ""}
             >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="others">Others</option>
             </select>
             <button type ="submit" className="add-btn">+</button>
        </form>
    );
}
export default TodoInput;