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

  // Function to convert image to Base64 data URL
  const convertImageToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Retrieve todos from local storage on page load
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Event listener for the form submission
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission
    const todoText = todoInput.value.trim();
    const imageFile = imageInput.files[0]; // Get the image file

    if (todoText !== "" && imageFile) {
      const imageUrl = convertImageToDataURL(imageFile); //! this line will stop execution until the convertImageToDataUrl no send any resolve or reject( as await keyword) , // Wait for the Promise to resolve
      addTodoToDOM(todoText, imageUrl); // Add todo to the list  //! this line will execute after that ,  This line will now use the resolved value
      saveTodos(); // Save todos to local storage
      todoInput.value = ""; // Clear the input field
      imageInput.value = ""; // Clear the image input field
      notaskMsg.style.display = "none"; // Hide the "No tasks" message
      removeAllBtn.style.display = "block"; // Display the "remove all btn"
    }
  });

  console.log("...............................................");

  // Event listener for the "Add" button
  //   submitBtn.addEventListener("click", async () => {
  //     const todoText = todoInput.value.trim();
  //     const imageFile = imageInput.files[0]; // Get the image file

  //     if (todoText !== "" && imageFile) {
  //       const imageUrl = await convertImageToDataURL(imageFile);
  //       addTodoToDOM(todoText, imageUrl);
  //       saveTodos();
  //       todoInput.value = "";
  //       imageInput.value = "";
  //       notaskMsg.style.display = "none";
  //       removeAllBtn.style.display = "block";
  //     }
  //   });

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
});

//! If not use async await (convertImageToDataURL)
//? What Happens Without async and await
// If you call convertImageToDataURL without using await in an asynchronous context, the function returns a Promise immediately.
// This means the subsequent code executes before the Promise is resolved, leading to potential issues.
// Promise Instead of Data URL: The variable imageUrl will be a Promise object, not the actual Base64 string. When you pass this Promise to addTodoToDOM, it won't work as expected because addTodoToDOM expects a string, not a Promise

//!notes

//? Detailed Explanation of Async/Await and Promises
// Promises:
// A Promise represents an operation that hasn't completed yet but is expected to in the future. It can be in one of three states:

// Pending: The initial state, neither fulfilled nor rejected.
// Fulfilled: The operation completed successfully.
// Rejected: The operation failed.

//? Async/Await
// async and await are syntactic sugar built on top of promises. They make asynchronous code look and behave more like synchronous code, making it easier to read and maintain.
// async: Used to declare an asynchronous function. The function will always return a promise.
// await: Used to pause the execution of an async function until the promise is resolved.

//?example
// async function fetchData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { message: "Data fetched successfully" };
//       resolve(data);
//     }, 2000);
//   });
// }

// async function main() {
//   console.log("Start fetching data");
//   const data = await fetchData(); // Wait for the promise to resolve
//   console.log(data); // This line runs after the promise resolves
//   console.log("End fetching data");
// }

// main();
// console.log("This line runs immediately after starting the main function");
//?In this example, main is an asynchronous function that waits for fetchData to complete. The code within main after await fetchData() executes only after the promise resolves.

//!summary

// Blocking Operations: Halt the execution of further code until they complete, making the browser unresponsive.
// Non-Blocking Operations: Allow the main thread to continue executing other code while the operation is in progress, maintaining responsiveness.
// Promises: Provide a way to handle asynchronous operations without blocking the main thread.
// Async/Await: Simplify the syntax of promises, making asynchronous code easier to write and understand.

//? Benefits of Using async and await
// Synchronous-Like Code: async and await make asynchronous code look like synchronous code, improving readability and maintainability.
// Correct Sequence: Ensures the code executes in the correct order. await pauses execution until the Promise is resolved, preventing the issues mentioned earlier.
// Error Handling: Using try-catch with async functions allows for better error handling of asynchronous operations.

//? Why Use try-catch Here?
// Error Handling: Network requests can fail for various reasons (e.g., network issues, server errors). Using try-catch ensures that your application can handle these errors gracefully.
// User Experience: By catching errors, you can provide feedback to the user (e.g., "An error occurred. Please try again later.") rather than leaving them in the dark.
// Prevent Crashes: Without proper error handling, an unhandled error can cause the application to crash or behave unpredictably.

//? try Block:

// The try block contains the code that might throw an error.
// If the code inside the try block executes without errors, the catch block is skipped.

//? catch Block:

// If any error occurs in the try block, the catch block is executed.
// catch (err) captures the error, allowing you to handle it gracefully (e.g., by showing an error message to the user).

//? finally Block:

// The finally block executes after the try and catch blocks, regardless of whether an error was thrown or not.
// It’s often used for cleanup actions, like hiding loading states.

//!? example
// const handleComment = async () => {
//   try {
//     setLoading(true);
//     const res = await fetch("https://dummyjson.com/comments/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         body: comment,
//         postId: 3,
//         userId: 5,
//       }),
//     });
//     if (res?.ok === true) {
//       setLoading(false);
//       console.log("comment successful....");
//     } else {
//       alert("something went wring");
//       setLoading(false);
//     }
//     console.log("data--->", res);
//   } catch (err) {
//     console.log("Error posting comment:", err);
//   } finally {
//     setLoading(false);
//     setComment("");
//   }
// };
