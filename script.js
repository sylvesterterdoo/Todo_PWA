// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function () {
        // register sw
        console.log("ServiceWorker registration successful"); 
      },
      function (err) {
        console.log("ServiceWorker registration failed", err);
      }
    );
  });
}

// Function to add a new todo task
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText !== "") {
      let taskList = document.getElementById("taskList");
      let li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="deleteTask(this)"> ${taskText}`;
      taskList.appendChild(li);
      taskInput.value = "";

      // Add task to local storage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Function to delete task
function deleteTask(checkbox) {
  let li = checkbox.parentNode;
  li.parentNode.removeChild(li);

  // Remove task from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskText = checkbox.nextSibling.textContent.trim();
  let index = tasks.indexOf(taskText);
  if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

window.onload = function() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  tasks.forEach(taskText => {
      let li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="deleteTask(this)"> ${taskText}`;
      taskList.appendChild(li);
  });
}

