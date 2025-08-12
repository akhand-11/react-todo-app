// //import react from 'react';
// import React, { useState, useEffect } from 'react';
// //import React, {useState, useEffect}  from 'react';


// function TodoInput() {
//     const [inputValue, setInputValue] = useState('');
//     const [darkMode, setDarkMode] = useState(() => {
//         const dark =localStorage.getItem('dark-mode');
//         return dark ? JSON.parse(dark) : [];
//     });
//     const [selectedCategory, setSelectedCategory] = useState("Work");
//     const [filter, setFilter] = useState('all');
//     const [tasks, setTasks] = useState(() => {
//         const stored = localStorage.getItem('todo-tasks');
//     return stored ? JSON.parse(stored) : [];
//     });
    
//     const addTask = () =>{
//         if(inputValue.trim() === '') return;
//         const newTask = {text: inputValue, completed:false, isEditing: false, category:selectedCategory}
//         setTasks([...tasks, newTask]);
//         setInputValue('');
//         };
//         const startEditing = (index) =>{
//             const updatedTasks = [...tasks];
//             updatedTasks[index].isEditing = true;
//             updatedTasks[index].editText = updatedTasks[index].text;
//             setTasks(updatedTasks);
//         };
//         const handleEditChange = (index, value) => {
//             const updatedTasks = [...tasks];
//             updatedTasks[index].editText = value;
//             setTasks(updatedTasks);
//         };
//         const saveEdit=(index) => {
//             const updatedTasks = [...tasks];
//             updatedTasks[index].text = updatedTasks[index].editText;
//             updatedTasks[index].isEditing = false;
//             delete updatedTasks[index].editText;
//             setTasks(updatedTasks);
//         };
//         const cancelEdit =(index) =>{
//             const updatedTasks = [...tasks];
//             updatedTasks[index].isEditing = false;
//             delete updatedTasks[index].editText;
//             setTasks(updatedTasks);
//         }
//         useEffect(() => {
//             localStorage.setItem('todo-tasks', JSON.stringify(tasks));

//         }, [tasks]);
//         const toggleComplete = (index) => {
//             const updatedTasks = [...tasks];
//             updatedTasks[index].completed = !updatedTasks[index].completed;
//             setTasks(updatedTasks);
//         };
//         const deleteTask = (taskIndex) => {
//             const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
//             setTasks(updatedTasks);
//         };
//         useEffect (() => {
//             localStorage.setItem('dark-mode', JSON.stringify(darkMode));
//         }, [darkMode]);
      
//     return (
//         <div className={darkMode ? 'dark-mode' : 'light-mode'}>
//             <button onClick={() => setDarkMode(prev => !prev)}>
//                 {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
//             </button>
//             <select value={selectedCategory}
//             onChange={(e) => setSelectedCategory (e.target.value)}>
//                 <option value ="Work">Work</option>
//                 <option value ="Personal">Personal</option>
//                 <option value ="Shopping">Shopping</option>
//                 <option value ="Other">Other</option>
//             </select>
//             <input 
//             type="text" 
//             placeholder="Add a new TASK"
//             value={inputValue} 
//             onChange= {(e) => setInputValue(e.target.value)}
//             />
//             <button onClick={addTask}>Add</button>

//             <div>
//                 <button onClick={() => setFilter('all')}>All</button>
//                 <button onClick={() => setFilter('active')}>Active</button>
//                 <button onClick={() => setFilter('completed')}>Completed</button>

//             </div>
//             <ul>
           
//                 {tasks
//                 .filter(task => {
//                     if(filter === 'active') return !task.completed;
//                     if(filter === 'completed') return task.completed;
//                     return true;
//                 })
//                 .map((task, index) => (
//                     <li 
//                     key ={index}
//                     style={{
//                         display:'flex', alignItems:'center', marginBottom:'8px'
//                     }}>
//                     <input 
//                      type='checkbox'
//                      checked={task.completed}
//                      onChange={() => toggleComplete(index)}
//                      style={{marginRight:'8px'}}/>
//                      {task.isEditing ? (
//                         <>
//                         <input 
//                         type='text'
//                         value={task.editText}
//                         onChange={(e) => handleEditChange(index, e.target.value)}
//                         style={{flexGrow:1, marginRight: '8px'}}
//                         />
//                         <button onClick={() => saveEdit(index)}>Save</button>
//                         <button onClick={() => cancelEdit(index)}>Cancel</button>
//                         </>
//                      ) : (
//                     <>
//                         <span
//                             style={{
//                                 textDecoration: task.completed ? 'line-through' : 'none',
//                                 flexGrow: 1,
//                                 cursor: 'default',
//                                 }}>
//                             {task.text} {task.category && ( <em style={{fontSize: '0.8rem'}}>({task.category})</em> )}
//                             <button onClick={() => startEditing(index)} style={{ marginLeft: '8px'}}>Edit</button>
//                             <button onClick={() => deleteTask(index)}>Delete</button>  
//                         </span> 
//                     </>
//                     )}
//                     </li>
//                 ))}
//             </ul>
//         </div>

//     );
// }

// export default TodoInput;

import React, {useState} from "react";

function TodoInput({onAdd}) {
    const[task, setTask] = useState("");
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(task.trim()){
            onAdd(task.trim());
            setTask("");
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
             <button type ="submit" className="add-btn">+</button>
        </form>
    );
}
export default TodoInput;