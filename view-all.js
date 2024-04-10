document.addEventListener('DOMContentLoaded', () => {
    // Retrieve tasks from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

    // Display tasks on the page
    displayAllTasks(todos, completedTasks, deletedTasks);
});

function displayAllTasks(todos, completedTasks, deletedTasks) {
    const allTasksContainer = document.getElementById('all-tasks-container');
    if (!allTasksContainer) {
        console.error("Element with ID 'all-tasks-container' not found.");
        return; // Exit function if element not found
    }
    allTasksContainer.innerHTML = ''; // Clear previous content

    // Display todos
    todos.forEach(todo => {
        const todoElement = createTaskElement(todo);
        allTasksContainer.appendChild(todoElement);
    });

    // Display completed tasks
    completedTasks.forEach(task => {
        const taskElement = createTaskElement(task, 'completed');
        allTasksContainer.appendChild(taskElement);
    });

    // Display deleted tasks
    deletedTasks.forEach(task => {
        const taskElement = createTaskElement(task, 'deleted');
        allTasksContainer.appendChild(taskElement);
    });

    // Add clear button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.style.width = '300px'
    clearButton.style.padding = '10px'
    clearButton.style.borderRadius = '20px'
    clearButton.style.margin = '30px'
    clearButton.addEventListener('click', () => {
        // Clear tasks from localStorage
        localStorage.removeItem('todos');
        localStorage.removeItem('completedTasks');
        localStorage.removeItem('deletedTasks');
        // Clear tasks displayed on the page
        allTasksContainer.innerHTML = '';
    });
    allTasksContainer.appendChild(clearButton);
}

function createTaskElement(task, type) {
    const taskElement = document.createElement('div');
    taskElement.textContent = task.content;
    taskElement.style.fontSize = '20px'
    // taskElement.style.marginRight = '30px'; // Add space between task and icon
    taskElement.style.margin = '30px'

    // Customize the task element according to the task type
    if (type === 'completed') {
        // Add a green tick icon for completed tasks
        const completedIcon = document.createElement('i');
        completedIcon.classList.add('bx', 'bx-check-circle');
        completedIcon.style.color = 'green';
        taskElement.appendChild(completedIcon);
    } else if (type === 'deleted') {
        // Add a red X icon for deleted tasks
        const deletedIcon = document.createElement('i');
        deletedIcon.classList.add('bx', 'bx-x-circle');
        deletedIcon.style.color = 'red';
        deletedIcon.style.marginLeft = '15px'
        taskElement.appendChild(deletedIcon);
    } else {
        // Add a timer icon for recently added tasks
        const timerIcon = document.createElement('i');
        timerIcon.classList.add('bx', 'bx-time');
        timerIcon.style.color = 'blue';
        timerIcon.style.marginLeft = '15px'
        taskElement.appendChild(timerIcon);
    }

    return taskElement;
}
