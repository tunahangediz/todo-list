////tüm elementleri seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const ul = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    //tüm event listenerlar burada

    form.addEventListener("submit", addTodo);
    window.addEventListener("DOMContentLoaded", LoadAllTodos);
    ul.addEventListener("click", removeTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e) {
    let a=confirm("Emin misiniz?");

    if (a==true) {
        // const c=document.querySelectorAll(".list-group-item")
 
        // for (let i = 0; i < c.length; i++) {
            
        //     c[i].remove();
        // } kendi yazdığım method
        while(ul.firstElementChild!=null){
            ul.removeChild(ul.firstElementChild);
        }
        
        // localStorage.clear();
        localStorage.removeItem("todos");
        
        let alert=showAlert("success","Tüm todolar başarıyla silindi");
        secondCardBody.appendChild(alert);
    }

  
    
}

function filterTodos(e) {
    let todos =getTodosFromStorage();
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text=listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1) {
            //Bulunmadı
            // listItem.setAttribute("style","display:none !important");
            
            
        }
        else{
            // listItem.setAttribute("style","display:block ");
            ///Birden fazla class ekleme
            listItem.classList.add("bg-dark","text-white");
            
        }
        
        setTimeout(function () {
            ///Birden fazla class silme
            listItem.classList.remove("bg-dark","text-white");
            
        }, 1500);

    });


    
}
function removeTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        removeFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi.");
    }
}
function removeFromStorage(deletetodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}

function LoadAllTodos() {
    let todos = getTodosFromStorage();

    todos.forEach((todo) => {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo == "") {
        showAlert("danger", "Lütfen bir todo girin.");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi");
    }

    todoInput.value = "";

    e.preventDefault();
}
function getTodosFromStorage() {
    /// Storageden bütün todoları alırız
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(todo) {
    let todos = getTodosFromStorage();
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToUI(todo) {
    // <!-- <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li> -->
    ///list oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(todo));
    ///link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    /// list iteme linki ekleme
    listItem.appendChild(link);
    /// ul'ye listItem'ı ekleme
    ul.appendChild(listItem);
}

function showAlert(type, info) {
    /* <div class="alert alert-danger" role="alert">
    A simple danger alert with 
  </div> */

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.setAttribute("role", "alert");
    alert.appendChild(document.createTextNode(`${info}`));

    form.appendChild(alert);

    // setTimeout
    setTimeout(function () {
        alert.remove();
    }, 1500);
}
