let timer = false;

function board() {
    document.getElementById('changeColor').classList.add("backgorund");
    document.getElementById('changeColorboard').classList.remove("backgorund")
    document.getElementById('changeColor').classList.add("backgorund");
    document.getElementById('changeColorNotice').classList.add("backgorund")
    document.getElementById('changeColorboard').style.backgroundColor = "black";
    document.getElementById('contentNotice').classList.add("d-none");
    addAndRemove();
    let contantBoard = document.getElementById('contantBoard');
    contantBoard.innerHTML = '';
    contantBoard.innerHTML += headlineBoard();
    contantBoard.innerHTML += dragAndDrop();
    showTask(editTasks);
}

function addAndRemove() {
    document.getElementById('contantSummary').classList.add("d-none");
    document.getElementById('contantAddToTask').classList.add("d-none");
    document.getElementById('contantBoard').classList.remove("d-none");

}

function cancelBnt() {
    document.getElementById('contantAddToTask').classList.add("d-none");
}

function headlineBoard() {
    return /*html*/`
    <div class="headline-board-continaer">
        <h1 class="headline-board">Board</h1>
        <div class="input-feld">
            <input id="task-search-input" type="Find Task" class="input" onkeyup="searchTasks()">
            <button class="bnt-board" onclick="addTaskBnt()"> Add task +</button>
        </div>
    </div>
        
    `;
}

function addTaskBnt() {
    document.getElementById('contantAddToTask').classList.remove("d-none");
    let contantAddToTask = document.getElementById('contantAddToTask');
    contantAddToTask.innerHTML = '';
    contantAddToTask.innerHTML += addTask();
}
// funktion noch verkrüzen 
function addTask() {
    return/*html*/`
        <div class="input-container animation">
            <div class ="headlinetask-container">
            <p class="headline-task">Add Task</p>
            <img src="/img/close.png" class="close-button" onclick="closeTask()">
        </div>
            <div class="selections">
                <label for="title">Title</label> <!-- onsubmit noch eintragen in diefoerm taks -->
                <input type="Enter a title"  placeholder="Enter a title" class="title" id="title">  
                <label for="description">Description</label>   
                <textarea required="" placeholder="Enter a Description" id="description" class="description"></textarea>
                <!--dropDown-->
                <form class="form-container">
                    <label for="category">Category</label> 
                    <select id = "chgeCategory"   class="category">                
                        <option>Select task category</option>  
                        <option>New category</option> 
                        <option style= "backgorund-color = red;">Sales</option>  
                        <option>Backoffice</option>  
                    </select>
                </form>
                <form class="form-container">
                    <label for="assigned-to">Assigned to</label> 
                    <select id = "chgeAssigend"  class="assigned-to">
                        <option>Selsect contacts to assing</option>  
                        <option>You</option> 
                        <option>Musstermann</option>  
                        <option>Invite new contact</option>  
                    </select>
                </form>    
            </div> 
            <div class="vert-line"><img src="/img/long verticalLine.png" class="long-vertical-line"></div>  
            <div class="selections-sec">
                <label for="due-date" class="correction-due-date">Due Date</label>
                <input type="date" id="dueDate" class ="due-date">
                <label for="status" class="correction-due-date">Prio</label>
                    <div class="status" id="chgeprio">
                        <div class="urgent-status" id="stautsUrgent" onclick="statusUrgent()">Urgent <img src="/img/prio alta.png" id="imgStatusUrgent"></div>
                        <div class="medium-status" id="statusMedium" onclick="statusMedium()">Medium<img src="/img/prio medium.png" id="imgStatusMedium"></div>
                        <div class="low-status" id="statusLow" onclick="statusLow()">Low<img src="/img/prio low.png" id="imgStatusLow"></div>
                    </div>
                <div class="bnts">
                    <button class="bnt-cancel" onclick="cancelBnt()" > Cancel <img src="img/cancelSymbol.png" ></button>
                    <button class="bnt-Task" onclick="add()">Create Task<img src="img/checkSymbol.png" class="check-symbol"></button>
                </div>  
            </div>     
        </div>
    `;
}

function statusUrgent() {
    document.getElementById('stautsUrgent').classList.add("backgorund-urgent-status");
    document.getElementById('imgStatusUrgent').classList.add("img-urgent-color-change");
    document.getElementById('statusMedium').classList.remove("backgorund-medium-status");
    document.getElementById('imgStatusMedium').classList.remove("img-medium-color-change");
    document.getElementById('statusLow').classList.remove("backgorund-low-status");
    document.getElementById('imgStatusLow').classList.remove("img-low-color-change");
}

function statusMedium() {
    document.getElementById('statusMedium').classList.add("backgorund-medium-status");
    document.getElementById('imgStatusMedium').classList.add("img-medium-color-change");
    document.getElementById('stautsUrgent').classList.remove("backgorund-urgent-status");
    document.getElementById('imgStatusUrgent').classList.remove("img-urgent-color-change");
    document.getElementById('statusLow').classList.remove("backgorund-low-status");
    document.getElementById('imgStatusLow').classList.remove("img-low-color-change");

}

function statusLow() {
    document.getElementById('statusLow').classList.add("backgorund-low-status");
    document.getElementById('imgStatusLow').classList.add("img-low-color-change");
    document.getElementById('statusMedium').classList.remove("backgorund-medium-status");
    document.getElementById('imgStatusMedium').classList.remove("img-medium-color-change");
    document.getElementById('stautsUrgent').classList.remove("backgorund-urgent-status");
    document.getElementById('imgStatusUrgent').classList.remove("img-urgent-color-change");
}

function closeTask() {
    document.getElementById('contantAddToTask').classList.add("d-none");
}


function add() {
    document.getElementById('contantAddToTask').classList.add("d-none")
    let titel = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('chgeCategory');
    let assigned = document.getElementById('chgeAssigend');
    let dueDate = document.getElementById('dueDate');
    let prio = document.getElementById('chgeprio');
    let subtask = document.getElementById('chgesubtask');
    pushTaskInArr(titel, description, category, assigned, dueDate, prio);
}

async function pushTaskInArr(titel, description, category, assigned, dueDate, prio) {
    let headOfTask = {
        "titel": titel.value,
        "description": description.value,
        "category": category.value,
        "assigned": assigned.value,
        "dueDate": dueDate.value,
        "prio": prio.value,
       
    };

    editTasks.push(headOfTask);
    await saveToBackend('tasks', editTasks);
    showTask(editTasks);
    console.log(editTasks);
    titel.value = '';
    description.value = '';
    category.value = '';
    assigned.value = '';
    dueDate.value = '';
    prio.value = '';
  
}

function showTask(tasksArray) {
    let contantToDo = document.getElementById('contantToDo');
    contantToDo.innerHTML = '';
    let html = '';
    for (let i = 0; i < tasksArray.length; i++) {
        let task = tasksArray[i];
        html +=/*html*/ `
                <div class="contant-card">
                    <p class="category-desing" id ="salesColor" >${task['category']}</p>
                    <h3 >${task['titel']}</h3>
                    <h2 >${task['description']}</h2>
                    <h2 >${task['assigned']}</h2>
                    <h2 >${task['prio']}</h2>
                </div>
         `;
    }
    contantToDo.innerHTML = html;
}



function salesCategory(){
    document.getElementById('salesColor').style.backgroundColor = "black";
}





/**
 * Search Tasks based on task search input value
 * 
 */
function searchTasks() {
    let foundedTasks = [];
    if (!this.timer) {
        this.timer = true;
        setTimeout(() => {
            let searchInputValue = document.getElementById('task-search-input').value;
            foundedTasks = getFilteredTasks(searchInputValue);
            showTask(foundedTasks);
            this.timer = false;
        }, 250);
    }
}

/**
 * Get filterd Tasks or all tasks based on task search input value
 * 
 * @param {string} searchInputValue -  Task search input value
 * @returns - Founded Tasks
 */
function getFilteredTasks(searchInputValue) {
    let foundedTasks = [];

    if (searchInputValue.length > 0)
        foundedTasks = editTasks.filter(t => t['description'].toLowerCase().includes(searchInputValue.toLowerCase()));
    else
        foundedTasks = editTasks;
    return foundedTasks;
}

function dragAndDrop() {
    return/*html*/`
        <div class="dad-container">
            <div class="main-contant-todo">
                <div>Todo</div>
                <div id="contantToDo" class="contant-todo"></div>
            </div>
            <div>In progress</div>
            <div>Awatinig Feedback</div>
            <div>Done</div>
        </div> 
    `;
}

