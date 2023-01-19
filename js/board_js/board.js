let timer = false;

let color = ['FC71FF', '#1FD7C1'];

let priority;

let imgStatusPrio = [
    {
        "Name": "Urgent",
        "src": "/img/prio alta.png",
        "src_white": "/img/prio alta white.png"
    },
    {
        "Name": "Medium",
        "src": "/img/prio medium.png",
        "src_white": "/img/prio medium white.png"
    },
    {
        "Name": "Low",
        "src": "/img/prio low.png",
        "src_white": "/img/prio low white.png"
    }
];

function board() {
    document.getElementById('contacts-container').innerHTML = /*html*/ `
    <div id="d-board"></div>
    `;
    addAndRemove();
    boardChangeBackground();
    let contantBoard = document.getElementById('contantBoard');
    contantBoard.innerHTML = '';
    contantBoard.innerHTML += dragAndDrop();
    renderFields();
    showTask(editTasks);
    eventListener();
    // currenttask(editTasks);
}

function boardChangeBackground(){
    document.getElementById('summaryId').classList.remove("color-background");
    document.getElementById('boardId').classList.add("color-background");
    document.getElementById('addTaskId').classList.remove("color-background");
    document.getElementById('contactsId').classList.remove("color-background");
    document.getElementById('showNoticeId').classList.remove("color-background");
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
// Render addToTask
function renderAddTask() {
    taskChangeBackgpound();
    let place = document.getElementById('contacts-container');
    place.innerHTML = /*html*/`
    <div class="input-container2">
        <div class ="headlinetask-container">
        <p class="headline-task">Add Task</p>
    </div>
        <div class="selections">
            <label for="title">Title</label> <!-- onsubmit noch eintragen in diefoerm taks -->
            <input type="Enter a title"  placeholder="Enter a title" class="title" id="title">  
            <label for="description">Description</label>   
            <textarea required="" placeholder="Enter a Description" id="description" class="description"></textarea>
            <!--dropDown-->
            <form class="form-container">
                    <div class="bg">Category</div>
                        <select id = "chgeCategory"   class="category" onchange="changeColor(this);" >                
                            <option>Select task category</option>  
                            <option >New category</option> 
                            <option >Sales</option>  
                            <option vlaue="#1FD7C1">Backoffice</option>  
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
                <button class="bnt-cancel" onclick="renderAddTask()" > Cancel <img src="img/cancelSymbol.png" ></button>
                <button class="bnt-Task" onclick="board(); color2(1); add()">Create Task<img src="img/checkSymbol.png" class="check-symbol"></button>
            </div>  
        </div>     
    </div>
`;;
}

function taskChangeBackgpound(){
    document.getElementById('summaryId').classList.remove("color-background");
    document.getElementById('boardId').classList.remove("color-background");
    document.getElementById('addTaskId').classList.add("color-background");
    document.getElementById('contactsId').classList.remove("color-background");
    document.getElementById('showNoticeId').classList.remove("color-background");

}



function addTaskBnt() {
    document.getElementById('contantAddToTask').classList.remove("d-none");
    let contantAddToTask = document.getElementById('contantAddToTask');
    contantAddToTask.innerHTML = '';
    contantAddToTask.innerHTML += addTask();
}

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
                        <div class="bg">Category</div>
                            <select id = "chgeCategory"   class="category" onchange="changeColor(this);" >                
                                <option>Select task category</option>  
                                <option >New category</option> 
                                <option >Sales</option>  
                                <option vlaue="#1FD7C1">Backoffice</option>  
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

function changeColor() {
    let categoryDesing = document.querySelectorAll('.category-desing');
    for (let i = 0; i < categoryDesing.length; i++) {
        if (categoryDesing[i].innerHTML == 'Sales') {
            categoryDesing[i].style.background = "#FC71FF";
        }
        if (categoryDesing[i].innerHTML == 'Backoffice') {
            categoryDesing[i].style.background = "#1FD7C1";
        }
    }
}

function statusUrgent() {
    priority = 'Urgent';
    document.getElementById('stautsUrgent').classList.add("backgorund-urgent-status");
    document.getElementById('imgStatusUrgent').classList.add("img-urgent-color-change");
    document.getElementById('statusMedium').classList.remove("backgorund-medium-status");
    document.getElementById('imgStatusMedium').classList.remove("img-medium-color-change");
    document.getElementById('statusLow').classList.remove("backgorund-low-status");
    document.getElementById('imgStatusLow').classList.remove("img-low-color-change");
}

function statusMedium() {
    priority = 'Medium';
    document.getElementById('statusMedium').classList.add("backgorund-medium-status");
    document.getElementById('imgStatusMedium').classList.add("img-medium-color-change");
    document.getElementById('stautsUrgent').classList.remove("backgorund-urgent-status");
    document.getElementById('imgStatusUrgent').classList.remove("img-urgent-color-change");
    document.getElementById('statusLow').classList.remove("backgorund-low-status");
    document.getElementById('imgStatusLow').classList.remove("img-low-color-change");

}

function statusLow() {
    priority = 'Low';
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
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('chgeCategory');
    let assignedTo = document.getElementById('chgeAssigend');
    let dueDate = document.getElementById('dueDate');
    pushTaskInArr(title, description, category, assignedTo, dueDate, priority);
}

async function pushTaskInArr(title, description, category, assignedTo, dueDate, priority) {
    let newTaskId = getNewTaskId();
    let headOfTask = {
        "id": newTaskId,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "assignedTo": assignedTo.value,
        "dueDate": dueDate.value,
        "priority": priority,
        "status": 'To do',
    };

    editTasks.push(headOfTask);
    await saveToBackend('tasks', editTasks);
    showTask(editTasks);
    console.log(editTasks);
    title.value = '';
    description.value = '';
    category.value = '';
    assignedTo.value = '';
    dueDate.value = '';
    priority = '';

}
function showTask(tasksArray) {
    tasksToDo = tasksArray.filter(task => task.status == taskStatus.todo);
    showTaskByStatus(tasksToDo, 'todo-tasks');
    tasksInProgress = tasksArray.filter(task => task.status == taskStatus.inProgress);
    showTaskByStatus(tasksInProgress, 'in-progress-tasks')
    tasksAwaitingFeedback = tasksArray.filter(task => task.status == taskStatus.awaitingFeedback);
    showTaskByStatus(tasksAwaitingFeedback, 'awaiting-feedback-tasks');
    tasksDone = tasksArray.filter(task => task.status == taskStatus.done);
    showTaskByStatus(tasksDone, 'done-tasks');
    changeColor();
    eventListener();
}


/**
 * Show Task based on status in corresponding div element id
 * @param {*} tasks - Task array to render
 * @param {*} elementId - Element id of div container
 */
function showTaskByStatus(tasks, elementId) {
    content = document.getElementById(elementId)
    content.innerHTML = '';
    let html = '';
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let result = imgStatusPrio.filter(imgStatusPrio => imgStatusPrio.Name == task.priority);
        let prios = result[0]['src'];
        html +=/*html*/ `
                <div id=${task['id']} class="contant-card list-item" draggable="true" onclick="openCurrentTaskShowMode(${task['id']})">
                    <p class="category-desing">${task['category']}</p>
                    <h3  class="title-desing">${task['title']}</h3>
                    <h2 class="descriptoin-desing">${task['description']}</h2>
                    <img  class="pros-desing" src='${prios}'>
                    <div id ="assigentId${i}"  class="assingtTo-desing"></div>
                </div>
         `;
    }
    content.innerHTML = html;
}

function letterNameCut(i) {
    for (let x in i) {
        if (i[x] == " ") {
            x++; return i[0] + i[x]
        }
    }
}

/**
 * Save Dragged Task to global Task Array and to Backend
 * @param {event} e - Target Div-Container in which the task is dropped 
 */
async function saveTaskStatus(e) {
    if (currentDraggingTaskId != -1) {
        console.log(`${e.target.id} - ${currentDraggingTaskId}`);
        let taskStatus = getTaskStatus(e.target.id);
        editTasks[currentDraggingTaskId]['status'] = taskStatus;
        await saveToBackend('tasks', editTasks);
        currentDraggingTaskId = -1;
    }
}


/**
 * Get Task-Status based on Div-Container element id
 * @param {int} elementId 
 * @returns - Task Status - String
 */
function getTaskStatus(elementId) {
    let taskStatus;
    switch (elementId) {
        case 'todo-tasks':
            taskStatus = 'To do';
            break;
        case 'in-progress-tasks':
            taskStatus = 'In Progress';
            break;
        case 'awaiting-feedback-tasks':
            taskStatus = 'Awaiting Feedback';
            break;
        case 'done-tasks':
            taskStatus = 'Done';
            break;
        default:
            taskStatus = 'To do';
    }
    return taskStatus;
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
 * 
 * @returns - Number of Tasks
 */
function getNewTaskId() {
    return editTasks.length;
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