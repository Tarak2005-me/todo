// Updated script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Fetch tasks from backend
    async function fetchTasks() {
        const response = await fetch('http://localhost:5000/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" data-id="${task._id}">X</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    fetchTasks();

    // Add a new task
    async function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: taskText })
            });
            const newTask = await response.json();
            fetchTasks(); // Refresh the task list
            taskInput.value = '';
            taskInput.focus();
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Delete a task
    async function deleteTask(id) {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
        fetchTasks(); // Refresh the task list
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = e.target.getAttribute('data-id');
            deleteTask(taskId);
        }
    });
});
