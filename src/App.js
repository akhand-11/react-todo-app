
import React, {useState, useEffect} from 'react';
import TodoInput from './components/TodoInputs';
import TodoList from './components/TodoList';
import { fetchTasks, createTask , updateTask , deleteTask } from './api';
import './App.css';


function App() {

  const[isPremium , setIsPremium] = useState(true);
  const[tasks, setTasks] =useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  
  // const[tasks, setTasks] = useState(() => {
  //   const stored = localStorage.getItem('tasks');
  //   return stored ? JSON.parse(stored) : [];
  // });
   const [darkMode, setDarkMode] = useState(() => {
        const dark =localStorage.getItem('dark-mode');
        return dark ? JSON.parse(dark) : [];
    });

    //Load tasks from backend when app starts
    useEffect(() => {
      loadTasks();
    }, []);

    const loadTasks = async () => {
      setLoading(true);
      try{
        const data =await fetchTasks();
        setTasks(data);
      } catch (err){
        console.error("Error fetching tasks:", err);
      }
      setLoading(false);
    };

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);
  
  //Dark mode toggle
  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
    if(darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else{


      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);
  
  const toggleDarkMode = () =>{
    setDarkMode(prev => !prev);
  };

  //Add tasks via backend
  const addTasks = async(taskText, category) => {
    if (taskText.trim() === "") return;
    const newTask = {text: taskText, completed: false, category};
    try{
      const savedTask  =await createTask(newTask);
      setTasks(prevTasks => [savedTask, ...prevTasks]);
    } catch (err){
      console.error("Error creating task:", err);
    }
    // setTasks([{id:Date.now(), text:taskText, completed:false, category}, ...tasks]);
  };

  //Delete tasks via backend
  const handleDelete = async (id) =>{
    try{
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter((task) => task._id !== id));
    }catch (err){
      console.error("Error deleting task:", err);
    }
    
  };

  // Edit tasks via backend
  const handleEdit = async (id, newText) =>{
    try{
    const updatedTask = await updateTask(id, { text: newText }); 

    setTasks(tasks.map((task) =>
      task._id === id || task.id === id
        ? { ...task, text: updatedTask.text, id: updatedTask._id } 
        : task
    ));
  }  catch(err){
      console.error("Error updating task:", err);
    }
    
    };
  
    //Toogle completed via backend
  const toggleComplete = async (id) => {
  // try {
  //   const taskToUpdate = tasks.find(task => task._id === id || task.id);
  //   const response = await updateTask(id, { completed: !taskToUpdate.completed });
  //   const updatedTask = response.data;

  //   setTasks(tasks.map(task => 
  //     (task._id === id || task.id === id) ? updatedTask : task
  //   ));
  // } 
    try {
    const taskToUpdate = tasks.find(
      (task) => task._id === id || task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = await updateTask(id, {
      completed: !taskToUpdate.completed,
    });
    
    setTasks(tasks.map((task) =>
      task._id === id || task.id === id
        ? { ...task, completed: updatedTask.completed, id: updatedTask._id }
        : task
    ));
  }catch (error) {
    console.error("Error toggling task:", error);
  }
    // setTasks(tasks.map(task => task.id === id ? {
    //   ...task, completed: !task.completed
    // } : task
    // ));
  };

  //Filter tasks
  const filteredTasks = (() => {
    if(filter === "active") return tasks.filter(t => !t.completed);
    if(filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  })();

  //Set due Date
  // const handleAddDueDate = async (id, dueDate) =>{
  //   try{
  //     const res = await fetch(`/api/tasks/${id}/dueDate`, {
  //       method:"PUT",
  //       headers:{"Content-Type": "application/json"},
  //       body: JSON.stringify({dueDate}),
  //     });
  //     const updatedTask =await res.json();
  //     setTasks(tasks.map(task => (task._id===id ? updatedTask : task)));

  //   } catch(err){
  //       console.error(err);
  //   }
  // };

  // Add comment
  const handleAddComment = async (id, comment) => {
    try{
      // const taskToUpdate =tasks.find(t=> t._id===id);
      // const updatedComments = [...(taskToUpdate.comments || []), comment];
      const res = await fetch(`/api/tasks/${id}/comments`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({comment}),
      });
      const updatedTask =await res.json();
      setTasks(tasks.map(task => task._id === id? updatedTask : task

      ));

    }catch(err){
      console.error(err);
    }
  };

  const handleEditComment = async (taskId, commentIndex, newComment) => {
  try {
    // Find the task
    const task = tasks.find(t => t._id === taskId);
    if (!task) return;

    // Create a new comments array with the edited comment
    const updatedComments = [...(task.comments || [])];
    updatedComments[commentIndex] = newComment;

    // Update task in backend
    const updatedTask = await updateTask(taskId, { comments: updatedComments });

    // Update local state
    setTasks(tasks.map(t =>
      t._id === taskId ? { ...t, comments: updatedTask.comments } : t
    ));
  } catch (err) {
    console.error("Error editing comment:", err);
  }
};

  const handleDeleteComment = async (id, index) => {
   try {
    const res = await fetch(`/api/tasks/${id}/comments/${index}`, {
      method: "DELETE",
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t._id === id ? updatedTask : t)));
  } catch (err) {
    console.error(err);
  }
  };

  // Set due Date
  const handleAddDueDate = async (taskId, dueDate) => {
    try{
      const response =await fetch(`/api/tasks/${taskId}/dueDate`,{
        method : "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({dueDate}),
      });
      const data  =await response.json();
     if(data.success) {
      setTasks((prev) => 
        prev.map((t)=> (t._id === taskId ? { ...t, dueDate}: t))
      );
     }
    }
    catch (err) {
      console.error("Error updating due date:", err);
    }
  };
  const handleDeleteDueDate = async (taskId) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}/dueDate`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, dueDate: null } : t))
      );
    }
  } catch (err) {
    console.error("Error deleting due date:", err);
  }
};

  return (
    <div className ="app-container">
      <header className="app-header">
        <h1 className="app-title">To-Do List</h1>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <TodoInput onAdd={addTasks} isPremium={isPremium}/>
      <div className="filters" role="tablist" aria-label="Filter tasks">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`}
        onClick={() => setFilter("all")}
        >
          All
        </button>
        <button className={`filter-btn ${filter === "active" ? "active" : ""}`}
        onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {loading ? (
        <p>Loading tasks</p>
      ): (
      <TodoList tasks={filteredTasks}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleComplete={toggleComplete}
      onAddDueDate={handleAddDueDate}
      onAddComment={handleAddComment}
      onDeleteComment={handleDeleteComment}
      onEditComment={handleEditComment}
      onDeleteDueDate={handleDeleteDueDate}
      isPremium={isPremium}
      />
      )}
    </div>
  );
}

export default App;
