// all the images and the documents afterloading the all the operation will call or occurs

window.addEventListener("load", () => {
  const todoInput = document.getElementById("todo-input");
  const imageInput = document.getElementById("image-input");
  const todoForm = document.getElementById("todo-form");
  const todoList = document.getElementById("todos");
  const removeAll = document.querySelector(".removeAll");
  const notodo = document.querySelector(".notodo");

  // const savedTodo = localStorage.getItem("todos");

  // const ConvertedSavedTodos = JSON.parse(savedTodo);

  // console.log("ConvertedSavedTodos---->", ConvertedSavedTodos);

  // operator  && , ||
  const savedTodo = JSON.parse(localStorage.getItem("todos")) || []; // when page load then initially todo data get from local storage

  console.log("savedTodo---->", savedTodo);

  const convertImageObjToStingUrl = (imageFile) => {
    //code ..... for convert the image object to string url and return
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  };

  // async function

  // const helo = async () => {};  // syntax explanation

  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault(); //  with  just prevent the by default nature of the form submit
    const todoText = todoInput.value;
    const imageFile = imageInput.files[0]; // The imageFile is a Object so we can't pass the object

    // now we have to convert the imageFile object into string url

    const imageUrl = await convertImageObjToStingUrl(imageFile);

    console.log("imageFile--->", imageFile);
    console.log("imageUrl--->", imageUrl);

    todoMaker(todoText, imageUrl); // we call the function here and provide the input value
    saveToLocalStorage();

    if (todoList.childElementCount > 0) {
      notodo.style.display = "none";
      removeAll.style.display = "block";
      todoInput.value = "";
    }

    console.log("input---", todoText);
  });

  const todoMaker = (todoText, imageUrl) => {
    console.log("todoText", todoText);
    console.log("imageUrl", imageUrl);

    const todoDiv = document.createElement("div");
    todoDiv.className = "singleTodo";
    console.log("what todoDiv ??? -->", todoDiv);

    const todoContent = document.createElement("div");
    todoContent.className = "todoContent";
    todoContent.innerText = todoText;

    const imageDiv = document.createElement("img");
    imageDiv.className = "image";
    // imageDiv.src = imageFile;  // here we are passing an object in the src of image tag which is wrong
    imageDiv.src = imageUrl;

    const actionDiv = document.createElement("div");
    actionDiv.className = "actionDiv";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";

    // function for the edit the todoList

    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        todoContent.contentEditable = true;
        editBtn.textContent = "Save";
        editBtn.classList.add("editing");
        todoContent.focus();
      } else {
        todoContent.contentEditable = false;
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        todoContent.classList.remove("editing");
      }
      saveToLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    // function for delete the todoList

    deleteBtn.addEventListener("click", () => {
      //here ok === true , cancel === false
      let text = "Are you sure want to delete this todo?";
      if (confirm(text) == true) {
        todoDiv.remove();
      }
      saveToLocalStorage();

      // if (confirm("Are you sure want to delete this todo?")) {
      //   todoDiv.remove();
      // }

      if (todoList.childElementCount === 0) {
        notodo.style.display = "block";
        removeAll.style.display = "none";
      }
    });

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(imageDiv);
    todoDiv.appendChild(actionDiv);

    todoList.appendChild(todoDiv);
  };
  // forEach is a array method ( loop ) ,  inside code will run through a loop
  savedTodo.forEach((item) => {
    todoMaker(item.eachTodoContent, item.eachImage); // it will run as the items present in the savedTodo array .
  });

  removeAll.addEventListener("click", () => {
    todoList.innerHTML = "";

    if (todoList.childElementCount === 0) {
      notodo.style.display = "block";
      removeAll.style.display = "none";
    }
    saveToLocalStorage();
  });

  // function to save the all todos to the local storage
  const saveToLocalStorage = () => {
    console.log("todoList--->", todoList);
    // let todos = [];
    // document.querySelectorAll(".todoContent").forEach((text) => {
    //   todos.push(text.textContent);
    // });

    let todos = []; // initial the array as blank array

    // const allTodo = ; // it target all the div which contain this class name todoContent

    // console.log("allTodo--->", allTodo);
    document.querySelectorAll(".singleTodo").forEach((eachTodo) => {
      // here the foreach work in the allTodo Array it will run as the length of the array
      console.log("eachTodo----->", eachTodo);

      const eachTodoContent =
        eachTodo.querySelector(".todoContent").textContent;
      const eachImage = eachTodo.querySelector(".image").src;
      console.log("eachTodoContent--->", eachTodoContent);
      console.log("eachImage--->", eachImage);
      todos.push({ eachTodoContent, eachImage });
    });

    console.log("allTodoContentValues--->", todos); // now it show all the todoContent values in a array

    // console.log("allTodoContent", allTodoContent); // it show the all div as a array

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  if (savedTodo.length === 0) {
    notodo.style.display = "block";
    removeAll.style.display = "none";
  }
});

// here the parameter of  the function  ( function can be the parameter of a function ).............>>>>>>>>>>>>>>>>>>>>>

// const cbd = () => {};

// function abc(a, cbd) {}

// window properties and methods  ( make notes and some tasks  )

// function scrollFun() {
//     window.scrollTo(0, 20);
//   }

// arrow function define   (ES6 javascript)  important  ecma script ( ES 6)

// const scrollFun = () => {
//     window.scrollTo(0, 20);
// }

// what is the difference between var , let ,  const.........................................>>>>>>>>>>>>>>>>

// var   (both reassign and redeclare)
// var a  = 8
// var a  = 9
// console.log(a)   output : 9

// let  (  only re assign the value , not re declare )

// let b = 8
//  let b = 9

//  console.log(b)   output :  error

// let b = 8
// b = 9

// console.log(b)   output :  9

// const    (  neither declare nor assign the value )

// const c = 8
// c = 10
//  output :  8

// Example .....................................................................>>>>>>>>>>>>>>>>>>>>

// <!DOCTYPE html>
// <html>
// <body>

// <h1>The Window Object</h1>
// <h2>The addEventListener() Method</h2>

// <p>Click anywhere in the window to display "Hello World!".</p>

// <p id="demo"></p>
// <div id ="sss">my div here</div>

// <script>

// const mydiv = document.getElementById("sss")
// mydiv.addEventListener("click", myFunction);

// function myFunction() {
//   document.getElementById("demo").innerHTML = "Hello World";
// }
// </script>

// </body>
// </html>

// ,,,,,,,,,,,,,,,,,,,,,,,..................................................................>>>>>>>>>>>>>
// object and JSON

// const obj = {
//   name: "Radha", // string
//   rollNo: 5, // number
//   todayPresent: true, // boolean
// };

// json :

// "name": "Radha", // string
// "rollNo": 5, // number
// "todayPresent": true, // boolean

// console.log("object ----->", obj);
// // if convert to json then
// const jsonData = JSON.stringify(obj);
// console.log("JsonObj ----->", jsonData);

// // if again convert the json into object then use

// const reObj = JSON.parse(jsonData);

// console.log("reBuildObj---->", reObj);

// const todos = ["task 1", "task 2", "task 3"];

const todos = [
  {
    title: "task 1",
    image: "todoImage1.jpg",
  },
  {
    title: "task 2",
    image: "todoImage2.png",
  },
  {
    title: "task 3",
    image: "todoImage3.webp",
  },
];
