// Register service worker
if ("serviceWorker" in navigator) {
  // checking if the browser supports service workers
  window.addEventListener("load", function () {
    // when app loads, fire callback
    navigator.serviceWorker.register("/sw.js").then(
      function () {
        // register sw
        console.log("ServiceWorker registration successful"); // registration was successful
      },
      function (err) {
        console.log("ServiceWorker registration failed", err); // registration failed
      }
    );
  });
}

// Get DOM elements
const form = document.querySelector("form");
const input = document.querySelector("[name='todo']");
const todoList = document.getElementById("todos");

// Side Effects / Lifecycle
const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

let todoData = [];
let todoId = 0
existingTodos.forEach((todo) => {
  addTodo(todo);
});

function addTodo(todoText) {

  if (todoText.length === 0) {
    return
  }

  todoData.push(todoText);
  const li = document.createElement("li");

  // create checkbox
  const checkboxElem = document.createElement("INPUT"); 
  checkboxElem.setAttribute("type", "checkbox");
  checkboxElem.setAttribute("id", ++todoId);

// Create a label
  let labelElem = document.createElement("label");
  labelElem.setAttribute("for", todoId); // Match the ID of the associated checkbox
  labelElem.textContent = todoText; // Set the label text

// Add onclick listener to the checkbox
checkboxElem.addEventListener("click", itemClicked);

// Append the checkbox and label to the list item
  li.appendChild(checkboxElem);
  li.appendChild(labelElem);

  todoList.appendChild(li);
  localStorage.setItem("todos", JSON.stringify(todoData));
  input.value = "";
}

// Listener to be executed when an item is clicked
function itemClicked(e) {
  //console.log("Checkbox is checked");
  let associatedLabel = document.querySelector('label[for="' + this.id + '"]');
  let labelText = associatedLabel.textContent.trim(); 
  console.log('Label text: ' + labelText);

  // Remove the item from the todoData list
  console.log('Before: ' + todoData);
  todoData = todoData.filter(function (target) {
      return target.trim() !== labelText; 
  });
  console.log('After: ' + todoData);
  localStorage.setItem('todos', JSON.stringify(todoData));
  location.reload()
}


// Events
form.onsubmit = (event) => {
  event.preventDefault();
  addTodo(input.value);
};

// Got this code from fireship-io -> https://github.com/fireship-io/10-javascript-frameworks/blob/main/vanilla-app/index.html

// TODO: 
// Test the application online {test}
// implement removing of the todo
// use localstorage to store and manage task 
// app should function offline 
// maybe add id to each item { future enhancement}