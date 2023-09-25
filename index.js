const todoForm = document.querySelector('#todo-form');
const mainInput = document.querySelector('#todo-form input');
const todoList = document.getElementById('todos');
const totalTasks = document.querySelector('#total-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const remainingTasks = document.querySelector('#remaining-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if (localStorage.getItem('tasks')){
  tasks.map((task) => {
    createTask(task);
    console.log(totalTasks);
    countTasks();
  })
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (mainInput.value === '') {
    return;
  };

  const task = {
    id: new Date().getTime(),
    name: mainInput.value,
    isCompleted: false
  };

  console.log

  tasks.unshift(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  todoForm.reset();
  createTask(task);
  mainInput.focus();
  countTasks();
});

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-task')){
    const taskId = Number(e.target.parentElement.id)
    removeTask(taskId);
  }

  countTasks();
})

todoList.addEventListener('input', (e) => {
  const taskId = Number(e.target.id);
  updateTask(taskId, e.target)
})


function createTask(task){
  const taskEl = document.createElement('li');

  taskEl.setAttribute('id', task.id);

const taskElMarkup = `
          <div>
            <input type="checkbox" name="task" id="${task.id}" ${task.isCompleted ? 'checked': ""}>
            <span>${task.name}</span>
          </div>
          <button class="remove-task fas fa-close" title="remove-task"></button>
  `


  taskEl.innerHTML = taskElMarkup;
  todoList.children.length === 0 ? todoList.appendChild(taskEl) :
  todoList.insertBefore(taskEl, todoList.children[0]);
}

function countTasks(){
  const completedTaskArray = tasks.filter((task) => task.isCompleted === true);

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTaskArray.length;
  remainingTasks.textContent = tasks.length - completedTaskArray.length;
}

function removeTask(taskid){
  // redeclare tasks to include all taks but the task with the id
  tasks = tasks.filter((task) => task.id !== taskid);

  // update localstorage with the new taskq
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // remove element with the id from the DOM
  document.getElementById(taskid).remove();
};


function updateTask(taskid, target){
  const task = tasks.find((task) => taskid === task.id);

  // toggle the value of is completed, if false, make true, if true, make false
  task.isCompleted = !task.isCompleted

  const parent = target.closest('LI');

  console.log(parent)

  if (task.isCompleted){
    parent.classList.add('complete')
  } else {
    parent.classList.remove('complete')
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))

  countTasks();
}





