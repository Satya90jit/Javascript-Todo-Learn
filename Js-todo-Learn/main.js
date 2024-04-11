//main.js
window.addEventListener("load", () => {
  // wait for the page to load before executing the javascript code
  //get references to the HTML elements
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const submitBtn = document.getElementById("todo-submit");
  const todoList = document.getElementById("todos");
  const removeAllBtn = document.querySelector(".removeAll");
  const notaskMsg = document.querySelector(".notask");

  //what to do
  // eventlistener for the form submission
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value;
    console.log("my addTodo calling with form submission", todoText);
    addTodo(todoText); // call here
    removeAllBtn.style.display = "block";
    notaskMsg.style.display = "none";
    todoInput.value = "";
  });

  // eventlistener for the "add" button
  // submitBtn.addEventListener("click", () => {
  //   const todoText = todoInput.value;
  //   console.log("my addtodo calling with submitBtn---->", todoText);
  //   addTodo(todoText);
  // });

  //function to add a new todo // declare
  const addTodo = (todoText) => {
    // now we can write code for the create a new todo
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    localStorage.setItem("my-todo", todoText);

    const ValueGetFromLocal = localStorage.getItem("my-todo");

    console.log("value that get from local storage", ValueGetFromLocal);

    const todoParagraph = document.createElement("div");
    todoParagraph.className = "text";
    todoParagraph.textContent = todoText;

    const actionDiv = document.createElement("div");
    actionDiv.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      console.log("Edit button calling.....");
      if (editBtn.textContent == "Edit") {
        todoParagraph.contentEditable = true;
        editBtn.textContent = "Save";
        todoParagraph.focus();
      } else {
        todoParagraph.contentEditable = false;
        editBtn.textContent = "Edit";
      }
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure to delete the todo?")) {
        console.log("Todo deleted successfully...");
        todoDiv.remove();
      }
    });

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    todoDiv.appendChild(todoParagraph);
    todoDiv.appendChild(actionDiv);

    todoList.appendChild(todoDiv);
    // rest code ......
  };

  removeAllBtn.addEventListener("click", () => {
    removeAllFunc();
  });

  const removeAllFunc = () => {
    console.log("all the todo remove successfully...");
    todoList.innerHTML = "";
    removeAllBtn.style.display = "none";
    notaskMsg.style.display = "block";
  };
});
