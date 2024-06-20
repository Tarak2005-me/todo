document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="complete-btn">&#10003;</button>
                <button class="delete-btn">X</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Function to mark a task as completed
    function completeTask(e) {
        if (e.target.classList.contains('complete-btn')) {
            const taskItem = e.target.parentElement;
            taskItem.classList.toggle('completed');
        }
    }

    // Function to delete a task
    function deleteTask(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    }

    // Event listener for the add button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for the enter key
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for completing and deleting tasks
    taskList.addEventListener('click', (e) => {
        completeTask(e);
        deleteTask(e);
    });
});
