let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let priority = document.querySelector(".priority");

// Empty Array To Store Tasks
let arrayOfTasks = [];

// Get Tasks From Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Show Tasks
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {

  if (input.value !== "") {

    addTaskToArray(input.value);

    input.value = "";
  }
};

// Click Events
tasksDiv.addEventListener("click", (e) => {

  // Delete Task
  if (e.target.classList.contains("del")) {

    deleteTaskWith(
      e.target.parentElement.getAttribute("data-id")
    );

    e.target.parentElement.remove();
  }

  // Complete Task
  if (e.target.classList.contains("task")) {

    toggleStatusTaskWith(
      e.target.getAttribute("data-id")
    );

    e.target.classList.toggle("done");
  }
});

// Add Task Function
function addTaskToArray(taskText) {

  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
    priority: priority.value,
  };

  // Add To Array
  arrayOfTasks.push(task);

  // Sort By Priority
  arrayOfTasks.sort((a, b) => {

    const priorities = {
      high: 1,
      medium: 2,
      low: 3
    };

    return priorities[a.priority] - priorities[b.priority];
  });

  // Add To Page
  addElementsToPageFrom(arrayOfTasks);

  // Save To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

// Add Elements To Page
function addElementsToPageFrom(arrayOfTasks) {

  // Empty Container
  tasksDiv.innerHTML = "";

  // Loop On Tasks
  arrayOfTasks.forEach((task) => {

    // Create Task Div
    let div = document.createElement("div");

    div.className = "task";

    // Completed Task
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);

    // Task Text + Priority Dot
    let text = document.createElement("span");

    text.innerHTML = `
      <span class="task-dot ${task.priority}-dot"></span>
      ${task.title}
    `;

    div.appendChild(text);

    // Delete Button
    let span = document.createElement("span");

    span.className = "del";

    span.appendChild(
      document.createTextNode("Delete")
    );

    div.appendChild(span);

    // Add To Page
    tasksDiv.appendChild(div);
  });
}

// Save Data To Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {

  window.localStorage.setItem(
    "tasks",
    JSON.stringify(arrayOfTasks)
  );
}

// Get Data From Local Storage
function getDataFromLocalStorage() {

  let data = window.localStorage.getItem("tasks");

  if (data) {

    let tasks = JSON.parse(data);

    // Sort Tasks
    tasks.sort((a, b) => {

      const priorities = {
        high: 1,
        medium: 2,
        low: 3
      };

      return priorities[a.priority] - priorities[b.priority];
    });

    addElementsToPageFrom(tasks);
  }
}

// Delete Task
function deleteTaskWith(taskId) {

  arrayOfTasks = arrayOfTasks.filter(
    (task) => task.id != taskId
  );

  addDataToLocalStorageFrom(arrayOfTasks);
}

// Toggle Task Status
function toggleStatusTaskWith(taskId) {

  for (let i = 0; i < arrayOfTasks.length; i++) {

    if (arrayOfTasks[i].id == taskId) {

      arrayOfTasks[i].completed =
        !arrayOfTasks[i].completed;
    }
  }

  addDataToLocalStorageFrom(arrayOfTasks);
}