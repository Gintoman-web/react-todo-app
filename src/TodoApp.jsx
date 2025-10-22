import React, { useState } from "react";
import './TodoApp.css';

function TodoApp() {
    const [tasks, setTasks] = useState([
        {id: 1, text: 'Изучить React!', completed: false},
        {id: 2, text: 'Создать Лист задач самостоятельно.', completed: false}
    ]);
    const [inputText, setInputText] = useState('');

    const handleInputText = (event) => {
        const newText = event.target.value;
        setInputText(newText)
    };

    const handleAddTask = (event) => {
        event.preventDefault();
        if (inputText === '') {
            return
        };
        const newTask = {
            text: inputText,
            completed: false,
            id: Date.now()
        };
        setTasks([...tasks, newTask]);
        setInputText('');
    };

    const handleDeleteTask = (id) => {
         const newTasks = tasks.filter(task => task.id !== id); 
         setTasks(newTasks);
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            };
            return task;
        }
        ))
    }

    return (
        <div className="todo-app">
            <h1>Список задач</h1>
            <form onSubmit={handleAddTask} className="add-task-form">
                <input type="text" value={inputText} onChange={handleInputText} />
                <button type="submit">Добавить</button>
            </form>
            <ul className="task-list">
               {tasks.map((task) => (
                 <li key={task.id} className="task-item">
                    <input type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)} />
                    <span className={`task.text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                    </span>
                 <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Удалить</button>
                 </li>
               ))}
            </ul>
        </div>
    )
}

export default TodoApp