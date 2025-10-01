//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo); // use 'change' instead of 'click'

//Functions
function addTodo(event){
    event.preventDefault();

    if(todoInput.value.trim() === "") return; // Prevent empty todos

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append Todo List
    todoList.appendChild(todoDiv);

    //Clear input
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete Todo
    if(item.closest(".trash-btn")){
        const todo = item.closest('.todo');
        todo.classList.add('fall'); // Add animation class
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //Check Mark
    if(item.closest(".complete-btn")){
        const todo = item.closest('.todo');
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.nodeType === 1){ // ensures only element nodes are checked
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    todo.style.display = todo.classList.contains('completed') ? "flex" : "none";
                    break;
                case "uncompleted":
                    todo.style.display = !todo.classList.contains('completed') ? "flex" : "none";
                    break;
            }
        }
    });
}
