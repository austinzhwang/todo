let todoArray = [];

/* Adds a todo object to the todo array*/
function add(text) {
    
    const todo = {
        text, 
        checked: false,
        id: Date.now()
    };

    todoArray.push(todo);

    const list = document.querySelector('.todo-list');
    list.insertAdjacentHTML('beforeend', `
      <li class="todo-item" data-key="${todo.id}">
        <input id="${todo.id}" class="tick" type="checkbox"/>
        <label for="${todo.id}" class="tick-complete"></label>
        <span class="text">${todo.text}</span>
        <span class="delete">×</span></li>
      </li>
    `);
}

const form = document.querySelector('.task-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.todo-input');

    const text = input.value.trim();
    if (text !== '') {
        add(text);
        input.value = '';
        input.focus();
        displayTasks();
    }
});

/* Displays task board if there is atleast one task; else hides the task board */ 
function displayTasks() {
    
    let tasks = document.querySelector('.tasks');  

    if (todoArray.length == 0) {
        tasks.style.display = 'none';
    } else {
        tasks.style.display = 'block'; 
    }
}

/* Toggle to cross and uncross tasks by clicking on checkbox */
function toggleDone(key) {
    const index = todoArray.findIndex(item => item.id === Number(key));
    todoArray[index].checked = !todoArray[index].checked; 
  
    const item = document.querySelector(`[data-key='${key}']`);
    if (todoArray[index].checked) {
      item.classList.add('done');
    } else {
      item.classList.remove('done');
    }
}

/* Deletes the specified todo item */
function deleteTodo(key) {
    todoArray = todoArray.filter(item => item.id !== Number(key)); 
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    displayTasks();
}

const list = document.querySelector('.todo-list');
list.addEventListener('click', event => {

    if (event.target.classList.contains('tick')) {  
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
      }
});

/* Removes all tasks from the array */
function clear() {   
    while (todoArray.length > 0) {
        todoArray.pop(); 
    }

    let ul = document.querySelector('.todo-list');
    ul.innerHTML = '';   
    displayTasks();
}

const clearList = document.getElementById('clear'); 
clearList.addEventListener('click', event => {
    event.preventDefault();
    clear(); 
});

