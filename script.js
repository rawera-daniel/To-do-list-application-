"use strict";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemslist = document.querySelector(".todo-items");

let todos = [];

// This  addTodo() function will create a new todo object based on the text that was entered in the text input and push it into the 'todos' array.
const addTodo = function (item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    //then renders them between <ul>
    // renderTodos(todos);
    addToLocalStorage(todos);
    // Help us to empty the input box after adding our to-do list.
    todoInput.value = "";
  }
};

todoForm.addEventListener("submit", function (event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value);
});

// Function to render give todos to screen
const renderTodos = function (todos) {
  todoItemslist.innerHTML = "";

  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;
    // console.log(checked);

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `<input type='checkbox' class='checkbox' ${checked}> ${item.name} <button class='delete-button'>X</button>`;
    todoItemslist.append(li);
  });
};

// Function to add todos to local storage
const addToLocalStorage = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
};

// Function helps to get everything from local stroage
const getFromLocalStroage = function () {
  const reference = localStorage.getItem("todos");
  // if reference exists
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
};

getFromLocalStroage();

todoItemslist.addEventListener("click", function (event) {
  // check if the event is on checkbox
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  // check if that is a delete-button
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});

const toggle = function (id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
};

const deleteTodo = function (id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
};

// const deleteTodo = function (id) {
//   todos = todos.filter((item) => item.id != id);
//   addToLocalStorage(todos);
// };
