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

function addTodo() {
  var taskInput = document.getElementById("taskInput");
  var prioritySelect = document.getElementById("prioritySelect");
  var task = taskInput.value;
  var priority = prioritySelect.value;

  if (task.trim() === "") {
      alert("Please enter a task.");
      return;
  }

  var todoItem = { task: task, priority: priority };
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  todoList.push(todoItem);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayTodos();
  taskInput.value = "";
}

function deleteTodo(index) {
  var todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  displayTodos();
}

function displayTodos() {
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  var todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  todoList.forEach(function(todoItem, index) {
      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onclick = function() {
          deleteTodo(index);
      };

      var label = document.createElement("label");
      label.textContent = todoItem.task + " (" + todoItem.priority + ")";

      li.appendChild(checkbox);
      li.appendChild(label);
      todoListContainer.appendChild(li);
  });
}

displayTodos();
