let timer = false;

let color = ['FC71FF', '#1FD7C1'];

let priority;

let imgStatusPrio = [
    {
        "Name": "Urgent",
        "src": "/img/prio_alta.png",
        "src_white": "/img/prio_alta_white.png"
    },
    {
        "Name": "Medium",
        "src": "/img/prio_medium.png",
        "src_white": "/img/prio_medium_white.png"
    },
    {
        "Name": "Low",
        "src": "/img/prio_low.png",
        "src_white": "/img/prio_low_white.png"
    }
];

function board() {
    document.getElementById('contacts-container').innerHTML = /*html*/ `
    <div class="d-board"id="d-board"></div>
    `;
    addAndRemove();
    boardChangeBackground();
    let contantBoard = document.getElementById('contantBoard');
    contantBoard.innerHTML = '';
    contantBoard.innerHTML += dragAndDrop();
    renderFields();
    showTask(editTasks);
    eventListener();
}

function boardChangeBackground() {
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
    removeNewTaskEventListener();
    document.getElementById('content-add-to-task-box').remove();
    document.getElementById('contacts-container').classList.remove("new-background-color");
    document.getElementById('d-board').classList.remove("d-none"); 
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
    document.getElementById('contacts-container').classList.remove("new-background-color")
    taskChangeBackgpound();
    let place = document.getElementById('contacts-container');
    let html = `
        <div id="content-add-to-task-box" class="container-add-to-task">
            <div class="input-container2">
                <div class ="headlinetask-container">
                <p class="headline-task">Add Task</p>
            </div>

            <form onsubmit="add(); board(); return false;">
                <div class="formular new-formular">
                    <div id="new-task-input-container" class="selections new-selections">
                        <label for="title">Title</label>
                        <input required type="Enter a title"  placeholder="Enter a title" class="title" id="title">  
                        <label for="description">Description</label>   
                        <textarea required="" placeholder="Enter a Description" id="description" class="description"></textarea>

                        <div class="form-container">
                            <div class="bg">Category</div>
                            <select required id="chgeCategory" class="category" onchange="changeColor(this);">                
                                <option>Select task category</option>`;
    html += getCategories();
    html += `</select>
                        </div>
                        <div class="form-container">
                            <label for="assigned-to">Assigned to</label>`;
    html += getNewTaskAssignedToDropDownHtml();
    html += `           </div>   
                    </div>

                    <div class="vert-line new-vert-line"><img src="/img/long_verticalLine.png" class="long-vertical-line new-vertical-line"></div>  

                    <div class="selections-sec fix-due-date">
                        <div class="due-date1">
                            <label for="due-date" class="correction-due-date">Due Date</label>
                            <input id="due-date" required type="date" id="dueDate" class ="due-date" min="2023-01-31">
                            <label for="status" class="correction-due-date">Prio</label>
                        </div>

                        <div type="submit" class="status responsive-Status" id="chgeprio">
                            <div class="urgent-status" id="stautsUrgent" onclick="statusUrgent()">Urgent <img src="/img/prio_alta.png" id="imgStatusUrgent"></div>
                            <div class="medium-status" id="statusMedium" onclick="statusMedium()">Medium<img src="/img/prio_medium.png" id="imgStatusMedium"></div>
                            <div class="low-status" id="statusLow" onclick="statusLow()">Low<img src="/img/prio_low.png" id="imgStatusLow"></div>
                        </div>

                        <div class="bnts bnts-responsive">
                            <button class="bnt-cancel" onclick="clearAddTask(); return false;"> Clear <img src="img/cancelSymbol.png"></button>
                            <button type="submit" class="bnt-Task">Create Task<img src="img/checkSymbol.png" class="check-symbol"></button>
                        </div>
                    </div> 
                </div>
            </form>
        </div>
        `;
    place.innerHTML = html;
    initNewTaskAssignedToContactsMultiSelect();
    setInputDueDateDefaultDate();
}

function getCategories() {
    let html = '';
    for (let category in categories) {
        html += `<option>${category}</option>`
    }
    return html;
}

function clearAddTask() {
    removeNewTaskEventListener();
    renderAddTask();
}

function taskChangeBackgpound() {
    document.getElementById('summaryId').classList.remove("color-background");
    document.getElementById('boardId').classList.remove("color-background");
    document.getElementById('addTaskId').classList.add("color-background");
    document.getElementById('contactsId').classList.remove("color-background");
    document.getElementById('showNoticeId').classList.remove("color-background");
    if (document.getElementById('content-add-to-task-box')) {
        document.getElementById('content-add-to-task-box').classList.add("d-none");
    }
}


function addTaskBnt() {
    document.getElementById('contacts-container').classList.add("new-background-color");
    document.getElementById('d-board').classList.add("d-none");
    document.getElementById("dad-container").classList.add("d-none")
    let contantAddToTask = document.getElementById('contantAddToTask');
    contantAddToTask.classList.remove("d-none");
    contantAddToTask.innerHTML = '';
    contantAddToTask.innerHTML += addTask();
    initNewTaskAssignedToContactsMultiSelect();
    setInputDueDateDefaultDate();
}

function addTask() {
    let html = `
            <div id="content-add-to-task-box">
            <form onsubmit="add(); return false;">
                <div class="formular2">
                    <div class="sec-one">
                        <div id="new-task-input-container" class="input-container animation">
                            <div class="headlinetask-container">
                                <p class="headline-task">Add Task</p>
                                <img src="/img/close.png" class="close-button" onclick="closeTask()">
                            </div>
                            <div class="selections">
                                <label class="title-in-form" for="title">Title</label> <!-- onsubmit noch eintragen in diefoerm taks -->
                                <input required type="Enter a title" placeholder="Enter a title" class="title" id="title">
                                <label for="description">Description</label>
                                <textarea required placeholder="Enter a Description" id="description" class="description"></textarea>
                                <div class="form-container">
                                    <div class="bg">Category</div>
                                    <select required id="chgeCategory" class="category" onchange="changeColor(this);">
                                        <option>Select task category</option>`;
    html += getCategories();
    html += `</select>
                                </div>
                                <div class="form-container">
                                    <label for="assigned-to">Assigned to</label>`;
    html += getNewTaskAssignedToDropDownHtml();
    html += `
                                </div>
                            </div>
                            <div class="vert-line"><img src="/img/long_verticalLine.png" class="long-vertical-line"></div>
                            <div class="sec-tow">
                                <div class="selections-sec">
                                    <label for="due-date" class="correction-due-date">Due Date</label>
                                    <input id="due-date" required type="date" id="dueDate" class="due-date" min="2023-01-31">
                                    <label for="status" class="title-in-Prio">Prio</label>

                                    <div class="status" id="chgeprio">
                                        <div class="urgent-status" id="stautsUrgent" onclick="statusUrgent()">Urgent
                                            <img src="/img/prio_alta.png" id="imgStatusUrgent"></div>
                                        <div class="medium-status" id="statusMedium" onclick="statusMedium()">Medium
                                            <img src="/img/prio_medium.png" id="imgStatusMedium"></div>
                                        <div class="low-status" id="statusLow" onclick="statusLow()">Low
                                            <img src="/img/prio_low.png" id="imgStatusLow"></div>
                                    </div>
                                    <div class="bnts">
                                        <button class="bnt-cancel" onclick="cancelBnt(); return false;"> Cancel <img src="img/cancelSymbol.png"></button>
                                        <button type="submit" class="bnt-Task">Create Task<img src="img/checkSymbol.png" class="check-symbol"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>`;
    return html;
}

function setInputDueDateDefaultDate() {
    document.getElementById('due-date').defaultValue = new Date().toLocaleDateString('en-CA');
}

function changeColor() {
    let categoryDesing = document.querySelectorAll('.category-desing');
    for (let i = 0; i < categoryDesing.length; i++) {
        let categoryColor = categories[categoryDesing[i].innerHTML];
        categoryDesing[i].style.background = categoryColor;
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
    removeNewTaskEventListener();
    document.getElementById('content-add-to-task-box').remove();
    document.getElementById('contacts-container').classList.remove("new-background-color")
    document.getElementById('d-board').classList.remove("d-none");
}

function add() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('chgeCategory');
    let dueDate = document.getElementById('due-date');
    pushTaskInArr(title, description, category, dueDate);

    removeNewTaskEventListener();
    document.getElementById('content-add-to-task-box').remove();
}

async function pushTaskInArr(title, description, category, dueDate) {
    let newTaskId = getNewTaskId();
    let headOfTask = {
        "id": newTaskId,
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "assignedTo": newTaskSelectedContacts,
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
    renderShortName(tasksArray);
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
                    <div class="desing-assingt" id=${task['id'] + "task"}>
                        <div id="assigentId${i}" class="assingtTo-desing"></div>
                    </div>
                </div>      
            `;
    }
    content.innerHTML = html;
}



function renderShortName(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        let content = document.getElementById(`${tasks[i]['id']}task`);
        for (let x = 0; x < tasks[i]["assignedTo"].length; x++) {
            let contactId = tasks[i]["assignedTo"][x];
            content.innerHTML += circleContacts(contactId);
        }
    }
}

function circleContacts(contactId) {
    let html = '';
    let contactName = getContactFromId(contactId).name;
    html = `
        <div class="circle-name" style="background-color: ${autoBackgroundColor(contactName)}">
            ${letterNameCut(contactName)}
        </div> 
    `;
    return html;
}

function autoBackgroundColor(x) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name == x) {
            return contacts[i].color;
        }
    }
}

function letterNameCut(contactName) {
    for (let x in contactName) {
        if (contactName[x] == " ") {
            x++; return contactName[0] + contactName[x];
        }
    }
}


/**
 * Save Dragged Task to global Task Array and to Backend
 * @param {event} e - Target Div-Container in which the task is dropped 
 */
async function saveTaskStatus(e) {
    if (currentDraggingTaskId != -1) {
        // console.log(`${e.target.id} - ${currentDraggingTaskId}`);
        let taskStatus = getTaskStatus(e.target.id);
        editTasks[currentDraggingTaskId.charAt(0)]['status'] = taskStatus;
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
   <div class="dad-container" id="dad-container">
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