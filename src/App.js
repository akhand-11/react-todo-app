
import React, {useState, useEffect} from 'react';
import TodoInput from './components/TodoInputs';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const[tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
   const [darkMode, setDarkMode] = useState(() => {
        const dark =localStorage.getItem('dark-mode');
        return dark ? JSON.parse(dark) : [];
    });
  useEffect (() => {
      localStorage.setItem('dark-mode', JSON.stringify(darkMode));
        }, [darkMode]);

  const toggleDarkMode = () =>{
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if(darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else{
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  const addTasks = (taskText) => {
    if (taskText.trim() === "") return;
    setTasks([{id:Date.now(), text:taskText}, ...tasks]);
  };

  const handleDelete =(id) =>{
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id, newText) =>{
      setTasks(tasks.map(task => 
        task.id === id ? {...task, text:newText} : task
      ));
    };
  

  return (
    <div className ="app-container">
      <header className="app-header">
        <h1 className="app-title">To-Do List</h1>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <TodoInput onAdd={addTasks}/>
      <TodoList tasks={tasks}
      onEdit={handleEdit}
      onDelete={handleDelete}/>
    </div>
  );
}

export default App;
