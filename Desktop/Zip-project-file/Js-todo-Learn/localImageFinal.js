// Wait for the page to load before executing the JavaScript code
window.addEventListener("load", () => {
  // Get references to the HTML elements
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const imageInput = document.getElementById("image-input");
  const submitBtn = document.getElementById("todo-submit");
  const todoList = document.getElementById("todos");
  const removeAllBtn = document.querySelector(".removeAll");
  const notaskMsg = document.querySelector(".notask");

  // Function to add a new or stored todo to the list
  const addTodoToDOM = (text, imageUrl) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    const todoText = document.createElement("div");
    todoText.className = "text";
    todoText.textContent = text;

    const todoImage = document.createElement("img");
    todoImage.className = "image";
    todoImage.src = imageUrl; // Set the image source

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";

    // Event listener for the "Edit" button
    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        todoText.contentEditable = true;
        editBtn.textContent = "Save";
        editBtn.className = "save";
        todoText.classList.add("editing");
        todoText.focus();
      } else {
        todoText.contentEditable = false;
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        todoText.classList.remove("editing");
        saveTodos();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    // Event listener for the "Delete" button
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this todo?")) {
        todoDiv.remove();
        saveTodos();
        if (todoList.childElementCount === 0) {
          notaskMsg.style.display = "block";
          removeAllBtn.style.display = "none";
        }
      }
    });

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    todoDiv.appendChild(todoText);
    todoDiv.appendChild(todoImage);
    todoDiv.appendChild(actionsDiv);

    todoList.appendChild(todoDiv);
  };

  // Function to save todos to local storage
  const saveTodos = () => {
    const todos = [];
    document.querySelectorAll(".todo").forEach((todoDiv) => {
      const text = todoDiv.querySelector(".text").textContent;
      const imageUrl = todoDiv.querySelector(".image").src;
      todos.push({ text, imageUrl });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Retrieve todos from local storage on page load
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Event listener for the form submission
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
    const todoText = todoInput.value.trim();
    const imageFile = imageInput.files[0]; // Get the image file

    if (todoText !== "" && imageFile) {
      const imageUrl = saveImageToLocalStorage(imageFile);
      addTodoToDOM(todoText, imageUrl); // Add todo to the list
      saveTodos(); // Save todos to local storage
      todoInput.value = ""; // Clear the input field
      imageInput.value = ""; // Clear the image input field
      notaskMsg.style.display = "none"; // Hide the "No tasks" message
      removeAllBtn.style.display = "block"; // Display the "remove all btn"
    }
  });

  // Event listener for the "Add" button
  submitBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    const imageFile = imageInput.files[0]; // Get the image file

    if (todoText !== "" && imageFile) {
      const imageUrl = saveImageToLocalStorage(imageFile);
      addTodoToDOM(todoText, imageUrl);
      saveTodos();
      todoInput.value = "";
      imageInput.value = "";
      notaskMsg.style.display = "none";
      removeAllBtn.style.display = "block";
    }
  });

  // Display saved todos after the setting up event listener
  savedTodos.forEach((todo) => {
    addTodoToDOM(todo.text, todo.imageUrl);
  });

  // Event listener for the "remove all todo"
  removeAllBtn.addEventListener("click", () => {
    removeAllFunction();
  });

  // Function to handle the "Remove All" button click
  const removeAllFunction = () => {
    if (confirm("Are you sure you want to delete all todos?")) {
      todoList.innerHTML = "";
      notaskMsg.style.display = "block";
      removeAllBtn.style.display = "none";
      saveTodos(); // Save empty todos to local storage
    }
  };

  // Check for tasks after setting up event listeners
  if (savedTodos.length > 0) {
    notaskMsg.style.display = "none"; // Hide the "No tasks" message
    removeAllBtn.style.display = "block"; // Display the "remove all btn"
  }

  // Function to save image to local storage and return the image URL
  const saveImageToLocalStorage = (file) => {
    const imageUrl = URL.createObjectURL(file);
    localStorage.setItem("image", imageUrl);
    return imageUrl;
  };
});
