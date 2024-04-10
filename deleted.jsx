document.addEventListener('DOMContentLoaded', function() {
    // Fetch deleted tasks from localStorage
    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

    // Get the container where deleted tasks will be appended
    const deletedList = document.getElementById('deleted-list');

    // Iterate through deleted tasks and create HTML elements
    deletedTasks.forEach((task) => {
        const deletedTaskElement = createDeletedTask(task.content);
        deletedList.appendChild(deletedTaskElement);
    });

    // Add a button to clear all deleted tasks
    const clearAllButton = document.createElement('button');
    clearAllButton.innerHTML = 'Clear All Deleted Tasks';
    clearAllButton.addEventListener('click', clearAllDeletedTasks);
    deletedList.appendChild(clearAllButton);
    
});

function createDeletedTask(taskName) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('todo-item', 'done');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = true;
    span.classList.add('bubble', 'completed');

    content.classList.add('todo-content');
    actions.classList.add('actions');

    content.innerHTML = `<input type="text" value="${taskName}" readonly>`;
    deleteButton.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    taskElement.appendChild(label);
    taskElement.appendChild(content);
    taskElement.appendChild(actions);

    return taskElement;
}

function clearAllDeletedTasks() {
    // Clear all deleted tasks in localStorage
    localStorage.removeItem('deletedTasks');

    // Clear the content of the deleted-list container
    const deletedList = document.getElementById('deleted-list');
    deletedList.innerHTML = '';
}