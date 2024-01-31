//import { TodoItem } from "module";

class TodoItem {
  constructor(id, todoData, priority = 1) {
      this.id = id;
      this.todoData = todoData;
      this.priority = priority;
  }

  get itemData() {
      return this.todoData;
  }

  serialize() {
      return `${this.id}|${this.todoData}|${this.priority}`;
  }

  static deserialize(text) {
      const [id, data, priority] = text.split("|");
      return new TodoItem(id, data, priority);
  }
}


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
  todoText = todoText.trim()
  if (todoText.length === 0) {
      return;
  }

  let serializedItem;

  if (!todoText.includes("|")) {
      const item = new TodoItem(++todoId, todoText, 1);
      serializedItem = item.serialize();
      todoData.push(serializedItem);
  } else {
      const deserializedItem = TodoItem.deserialize(todoText);
      todoText = deserializedItem.itemData;
      serializedItem = deserializedItem.serialize();
  }

  const li = document.createElement("li");

  // create checkbox
  const checkboxElem = document.createElement("INPUT");
  checkboxElem.setAttribute("type", "checkbox");
  checkboxElem.setAttribute("id", todoId);

  // Create a label
  const labelElem = document.createElement("label");
  labelElem.setAttribute("for", todoId); 
  labelElem.textContent = todoText; 

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
function itemClicked() {
  const associatedLabel = document.querySelector(`label[for="${this.id}"]`);
  const labelText = associatedLabel.textContent.trim();

  // Deserialize the todoData from localStorage
  const todoObjs = todoData.map(TodoItem.deserialize);

  // Remove the item from the todoData list
  const updatedTodoObjs = todoObjs.filter(item => !(item.id === this.id && item.itemData === labelText));

  // Serialize the todoData for storage
  const updatedTodoData = updatedTodoObjs.map(e => e.serialize());

  // Update the localStorage and reload the page
  localStorage.setItem('todos', JSON.stringify(updatedTodoData));
  location.reload();
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