window.addEventListener('load', () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || []
  let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
  let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || []

  const nameInput = document.querySelector('#name')
  const newTodoForm = document.querySelector('#new-todo-form')
  const viewAllButton = document.querySelector('#view')

  const username = localStorage.getItem('username') || ''

  nameInput.value = username

  nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value)
  })

  newTodoForm.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector('#content')
    if (!input.value.trim()) {
      const popup = document.querySelector('.pop-up')
      const clear = document.getElementById('x-mark')
      const audio = document.getElementById('audio')
      popup.style.display = 'block'
      audio.play()
      clear.addEventListener('click', () => {
        popup.style.display = 'none'
        audio.pause()
      })
      return
    }
    const todo = {
      id: generateId(),
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime()
    }

    // If the category is non-personal, show a pop-up box to add more information
    if (todo.category === 'non-personal') {
      const moreInfo = prompt('Add more information about the task:')
      if (moreInfo !== null) {
        todo.moreInfo = moreInfo
      }
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

    e.target.reset()

    DisplayTodos()
  })

  viewAllButton.addEventListener('click', () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks))
    window.location.href = 'view-all.html' // Redirect to view-all.html
  })

  function generateId () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  function DisplayTodos () {
    const todoList = document.querySelector('#todo-list')

    todoList.innerHTML = ''

    const activeTodos = todos.filter(todo => !todo.done)

    activeTodos.forEach(todo => {
      const todoItem = createTodoItem(todo)
      todoList.appendChild(todoItem)
    })

    DisplayCompletedTasks()
    DisplayDeletedTasks()
  }

  function DisplayCompletedTasks () {
    const completedContainer = document.querySelector('#completed-container')
    if (!completedContainer) {
      console.error('Completed container not found!')
      return
    }

    completedContainer.innerHTML = ''

    completedTasks.forEach(task => {
      const taskElement = createTodoItem(task, true)
      completedContainer.appendChild(taskElement)
    })
  }

  function DisplayDeletedTasks () {
    const deletedContainer = document.querySelector('#deleted-container')
    if (!deletedContainer) {
      console.error('Deleted container not found!')
      return
    }

    deletedContainer.innerHTML = ''

    deletedTasks.forEach(task => {
      const taskElement = createTodoItem(task, false, true)
      deletedContainer.appendChild(taskElement)
    })
  }

  function createTodoItem (task, isCompleted = false, isDeleted = false) {
    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')
    if (isCompleted) {
      todoItem.classList.add('done')
    }

    const label = document.createElement('label')
    const input = document.createElement('input')
    const span = document.createElement('span')
    const content = document.createElement('div')
    const actions = document.createElement('div')
    const edit = document.createElement('button')
    const deleteButton = document.createElement('button')

    input.type = 'checkbox'
    input.checked = task.done
    span.classList.add('bubble')
    if (task.category == 'personal') {
      span.classList.add('personal')
    } else {
      span.classList.add('non-personal')
      span.addEventListener('click', () => {
        if (task.moreInfo) {
          alert(`More Information about the task: ${task.moreInfo}`)
        } else {
          const moreInfo = prompt('Add more information about the task:')
          if (moreInfo !== null) {
            task.moreInfo = moreInfo
            localStorage.setItem('todos', JSON.stringify(todos))
          }
        }
      })
    }

    content.classList.add('todo-content')
    actions.classList.add('actions')
    edit.classList.add('edit')
    deleteButton.classList.add('delete')

    content.innerHTML = `<input type="text" value="${task.content}" readonly>`
    edit.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'

    label.appendChild(input)
    label.appendChild(span)
    actions.appendChild(edit)
    actions.appendChild(deleteButton)
    todoItem.appendChild(label)
    todoItem.appendChild(content)
    todoItem.appendChild(actions)

    input.addEventListener('click', e => {
      task.done = e.target.checked
      localStorage.setItem('todos', JSON.stringify(todos))

      if (task.done) {
        todoItem.classList.add('done')
        completedTasks.push(task)
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
      } else {
        todoItem.classList.remove('done')
        completedTasks = completedTasks.filter(t => t !== task)
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
      }

      DisplayTodos()
      DisplayCompletedTasks()
      DisplayDeletedTasks()
    })

    edit.addEventListener('click', e => {
      const input = content.querySelector('input')
      input.removeAttribute('readonly')
      input.focus
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true)
        task.content = e.target.value
        localStorage.setItem('todos', JSON.stringify(todos))
        DisplayTodos()
      })
    })

    deleteButton.addEventListener('click', () => {
      if (isDeleted) {
        deletedTasks = deletedTasks.filter(t => t !== task)
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks))
      } else {
        deletedTasks.push(task)
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks))

        if (isCompleted) {
          completedTasks = completedTasks.filter(t => t !== task)
          localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
        } else {
          todos = todos.filter(t => t !== task)
          localStorage.setItem('todos', JSON.stringify(todos))
        }
      }

      DisplayTodos()
      DisplayCompletedTasks()
      DisplayDeletedTasks()
    })

    return todoItem
  }

  DisplayTodos()
  DisplayCompletedTasks()
  DisplayDeletedTasks()
})
