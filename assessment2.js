class Task {
  constructor(id, title, dueDate, status) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.status = status;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

//  TaskManager class 
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getAllTasks() {
    return this.tasks;
  }
}


const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const statusInput = document.getElementById("statusInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const manager = new TaskManager();

// Add Task
addBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const status = statusInput.value;

  if (title === "") {
    alert("Please enter a task title");
    return;
  }

  const id = Date.now(); 
  //new task object
  const newTask = new Task(id, title, dueDate, status);
  manager.addTask(newTask);

  renderTasks();

  taskInput.value = "";
  dueDateInput.value = "";
  statusInput.value = "To Do";
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  manager.getAllTasks().forEach((task) => {
    const li = document.createElement("li");

    // Editable title
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = task.title;
    titleInput.addEventListener("change", () => {
      task.updateTitle(titleInput.value);
    });

    // Status 
    const statusSelect = document.createElement("select");
    ["To Do", "In Progress", "Completed"].forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (task.status === status) option.selected = true;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", () => {
      task.updateStatus(statusSelect.value);
    });

    // Due date 
    const dateSpan = document.createElement("span");
    dateSpan.className = "date";
    dateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : "";

    // Delete 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      manager.deleteTask(task.id);
      renderTasks();
    });

    li.appendChild(titleInput);
    li.appendChild(statusSelect);
    li.appendChild(dateSpan);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}
