window.addEventListener('load', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        };

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    });

    function DisplayTodos() {
        const todoList = document.querySelector('#todo-list');

        todoList.innerHTML = '';

        todos.forEach((todo) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');

            if (todo.category == 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.add('non-personal');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            input.addEventListener('click', (e) => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if (todo.done) {
                    todoItem.classList.add('done');
                    completedTasks.push(todo);
                    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                } else {
                    todoItem.classList.remove('done');
                    completedTasks = completedTasks.filter((t) => t !== todo);
                    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                }

                DisplayTodos();
                DisplayCompletedTasks();
            });

            edit.addEventListener('click', (e) => {
                const input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus;
                input.addEventListener('blur', (e) => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
                });
            });

            deleteButton.addEventListener('click', (e) => {
                todos = todos.filter((t) => t !== todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
        });
    }

    function DisplayCompletedTasks() {
        const completedContainer = document.querySelector('#completed-container');
        completedContainer.innerHTML = '';

        completedTasks.forEach((task) => {
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
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
            deleteButton.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(deleteButton);
            taskElement.appendChild(label);
            taskElement.appendChild(content);
            taskElement.appendChild(actions);

            completedContainer.appendChild(taskElement);

            deleteButton.addEventListener('click', () => {
                completedTasks = completedTasks.filter((t) => t !== task);
                localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
                DisplayCompletedTasks();
            });
        });
    }

    DisplayTodos();
    DisplayCompletedTasks();
})