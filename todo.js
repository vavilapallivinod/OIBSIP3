let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task-input")
  const taskDeadline = document.getElementById("task-deadline")

  const task = {
    name: taskInput.value,
    deadline: new Date(taskDeadline.value),
    completed: false,
  };
  if (task.name.trim() === "") {
    alert("Please enter task details");
  } else if (isNaN(task.deadline.getTime())) {
    alert("Please enter a valid deadline");
  } else {
    tasks.push(task);
  }
  taskInput.value = "  ";
  taskDeadline.value = "  ";

  renderTasks();
}
function renderTasks() {
  const pendingTasksList = document.getElementById("pending-tasks");
  const completedTasksList = document.getElementById("completed-tasks");

  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? 'checked' : ''}>
      <span>${task.name}</span>
      <span class="deadline">${task.deadline.toLocaleString()}</span>
      
    <button onclick="editTask(${index})" style="background-color:tomato;font-size:15px;"> Edit</button>
    
    <button onclick="deleteTask(${index})" style="background-color:red; font-size:15px; " onmouseover='style="background-color:black;color:white; font-size:15px;"'> Delete</button>
    `;

    if (task.completed) {
      completedTasksList.appendChild(taskItem);
    } else {
      pendingTasksList.appendChild(taskItem);
    }
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Enter new task name:");
  if (newName) {
    tasks[index].name = newName;
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
