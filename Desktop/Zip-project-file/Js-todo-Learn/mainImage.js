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
    console.log("todoDiv", todoDiv);

    const todoText = document.createElement("div");
    todoText.className = "text";
    todoText.textContent = text;

    const todoImage = document.createElement("img");
    todoImage.className = "image";
    todoImage.src = imageUrl;

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
    todoDiv.appendChild(actionsDiv);
    todoDiv.appendChild(todoImage);

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
    console.log("our todods array", todos);

    // document.querySelectorAll(".text").forEach((todoText) => {
    //   todos.push(todoText.textContent);
    // });
    // document.querySelectorAll(".image").forEach((todoImage) => {
    //   todos.push(todoImage.src);
    // });
  };

  // Retrieve todos from local storage on page load

  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log("getTodoDataFromLocal", savedTodos);

  // function to convert image to Base64 data URL
  const convertImageToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Event listener for the form submission
  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const todoText = todoInput.value.trim();
    const imageFile = imageInput.files;
    console.log("my-imageInput", imageFile);

    if (todoText !== "") {
      const imageUrl = await convertImageToDataURL(imageFile); // if this line not executed  not move to next line
      console.log("my-imageUrl", imageUrl);

      addTodoToDOM(todoText, imageUrl); // Add todo to the list
      saveTodos(); // Save todos to local storage
      todoInput.value = ""; // Clear the input field
      notaskMsg.style.display = "none"; // Hide the "No tasks" message
      removeAllBtn.style.display = "block"; // Display the "remove all btn"
    }
  });

  // Event listener for the "Add" button
  //   submitBtn.addEventListener("click", () => {
  //     const todoText = todoInput.value.trim();

  //     if (todoText !== "") {
  //       addTodoToDOM(todoText);
  //       saveTodos();
  //       todoInput.value = "";
  //       notaskMsg.style.display = "none";
  //       removeAllBtn.style.display = "block";
  //     }
  //   });

  // Display saved todos after the setting up event listener
  savedTodos.forEach((SingleTodo) => {
    addTodoToDOM(SingleTodo.text, SingleTodo.imageUrl);
    console.log("calling the add todo form");
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
});

// const todoArray = [
//   {
//     totoText: "satya",
//     totoImage: "todoIMageUrl",
//   },
//   {
//     totoText: "satya",
//     totoImage: "todoIMageUrl",
//   },
//   {
//     totoText: "satya",
//     totoImage: "todoIMageUrl",
//   },
//   {
//     totoText: "satya",
//     totoImage: "todoIMageUrl",
//   },
// ];

{
  /* <div className="todoDiv">
  <div className="text">paragraph(text)</div>
  <div className="actionDiv">
    <button className="edit"></button>
    <button className="delete"></button>
  </div>
  <img className="image" />
</div>;

<div>
  <img />
  <div className="">
    <p>user name</p>
    <p>date</p>
  </div>
  <div>
    <p>blog tile</p>
    <p>blog description</p>
  </div>
</div>; */
}
