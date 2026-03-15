const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

taskList.innerHTML = "";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;

checkbox.onchange = function(){
tasks[index].completed = checkbox.checked;
saveTasks();
renderTasks();
};

let span = document.createElement("span");
span.textContent = task.text;

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.style.background = "#e74c3c";

deleteBtn.onclick = function(){
tasks.splice(index,1);
saveTasks();
renderTasks();
};

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);

taskList.appendChild(li);

});

totalTasks.textContent = tasks.length;

}

function addTask(){

let text = taskInput.value.trim();

if(text === "") return;

tasks.push({
text:text,
completed:false
});

taskInput.value="";

saveTasks();
renderTasks();

}

addTaskBtn.onclick = addTask;

taskInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask();
}
});

clearCompleted.onclick = function(){

tasks = tasks.filter(task => !task.completed);

saveTasks();
renderTasks();

};

renderTasks();