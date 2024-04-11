window.addEventListener("load", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const submitBtn = document.getElementById("todo-submit");
  const todoList = document.getElementById("todos");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value;
    console.log("------->", todoText);
    addTodo(todoText);
  });

  const addTodo = (todoText) => {
    console.log("addTodo running-----");
    const todoParagraph = document.createElement("div");
    todoParagraph.className = "todo";
    todoParagraph.textContent = todoText;

    todoList.appendChild(todoParagraph);

    console.log("todoList....>", todoList);
  };
});
