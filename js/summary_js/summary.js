let workflowToDo = 0;
let workflowInProgress = 0;
let workflowAwaitingFeedback = 0;
let workflowDone = 0;
let workflowUrgent = 0;
let workflowLow = 0;
let workflowMedium = 0;

const taskStatus = {
    todo: 'To do',
    inProgress: 'In Progress',
    awaitingFeedback: 'Awaiting Feedback',
    done: 'Done',
}

const taskPriority = {
    low: 'Low',
    medium: 'Medium',
    urgent: 'Urgent'
}

async function summary() {
    summaryChangeBackground();
    await initData();
    // summaryclick();
    document.getElementById('contacts-container').innerHTML = /*html*/ `
    <div id="d-div"></div>
    `;
    renderDiv();
    let contantSummary = document.getElementById('contantSummary');
    contantSummary.innerHTML = '';
    contantSummary.innerHTML = hedalineSummary();
    contantSummary.innerHTML += progrssesBox();
    contantSummary.innerHTML += urgentBox();
    contantSummary.innerHTML += toDoBox();
    const joinUser = getFromLocalStorage('joinUser');
}

function summaryChangeBackground() {
    document.getElementById('summaryId').classList.add("color-background");
    document.getElementById('boardId').classList.remove("color-background");
    document.getElementById('addTaskId').classList.remove("color-background");
    document.getElementById('contactsId').classList.remove("color-background");
    document.getElementById('showNoticeId').classList.remove("color-background");
    if (document.getElementById('content-add-to-task-box')) {
        document.getElementById('content-add-to-task-box').classList.add("d-none");
    }
}


function workflowStatus() {
    workflowToDo = editTasks.filter(task => task.status == taskStatus.todo).length;
    workflowInProgress = editTasks.filter(task => task.status == taskStatus.inProgress).length;
    workflowAwaitingFeedback = editTasks.filter(task => task.status == taskStatus.awaitingFeedback).length;
    workflowDone = editTasks.filter(task => task.status == taskStatus.done).length;
}

function workflowPriority() {
    workflowLow = editTasks.filter(task => task.priority == taskPriority.low).length;
    workflowMedium = editTasks.filter(task => task.priority == taskPriority.medium).length;
    workflowUrgent = editTasks.filter(task => task.priority == taskPriority.urgent).length;
}

function renderDiv() {
    document.getElementById('contacts-container').innerHTML = /*html*/ `
    <div  class="summary-div" id="d-div"></div>
    `;
    summaryChangeBackground();
    workflowStatus();
    workflowPriority();
    hedalineSummary();
    progrssesBox();
    urgentBox();
    toDoBox();
    hello();
}

function hedalineSummary() {
    document.getElementById('d-div').innerHTML = /*html*/`
    <div class=head-of-summary>
        <h1 class="head-summary">Summary</h1>
        <div class="cloum-rev"> 
            <img src="/img/verticalLine.png" class="vertical-Line">
            <img src="/img/nutshell.png" class="nutshell">
        </div>
    </div>
    `;
}

function progrssesBox() {
    document.getElementById('d-div').innerHTML += /*html*/`
    <div class="boxes">
        <div onclick="board()" class="box"> ${editTasks.length}<div class="tasks-in-Board">Tasks in <br>Board </div></div>
        <div onclick="board()" class="box"> ${workflowInProgress}<div class="tasks-in-Board">Tasks in <br>Progress </div></div>
        <div onclick="board()" class="box"> ${workflowAwaitingFeedback}<div class="tasks-in-Board">Awaiting<br>Feedback</div></div>
    </div>
    
    `;
}

editTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

function urgentBox() {
    document.getElementById('d-div').innerHTML += /*html*/`
    <div class="urgent-box" onclick="board()">
        <div class="urgent-style-box">
            <div class="red-circel">
                <div class="put-pic-togheter">
                    <img src="/img/Ellipse.png"  class="ellipse">  
                    <img src="/img/urgant.png" class="urgant">
                </div>
                <h1 class="show-urgent">${workflowUrgent} <img  class="img-urgent-change-color" src="/img/text.png"></h1>
            </div>     
            <img src="/img/lineUrgent.png" class="line-vertical-Urgent">
            <div class="show-deadline">
                
                <h3 class="deadline">${convertIntoDate()}<img  class="updead-line" src="/img/UpcomingDeadline.png" ></h2>
            </div>            
        </div>
    </div>

    `;
}

function convertIntoDate() {
    let thisDate = new Date(editTasks[0].dueDate);
    return thisDate.toDateString();
}

function toDoBox() {
    document.getElementById('d-div').innerHTML += /*html*/`
    <div class="toDo-done-box">
        <div class="toDo-done" onclick="board()">
            <div class="show-up-todo">
                <div class="show-up-style">
                    <img class="img-check-todo-box" src="/img/todo.png">  
                    <img src="/img/pencil.png" class="pencil">
                        <div class="show-up-style-1">
                            ${workflowToDo}
                            <img class="color-change-box-todo-done" src="/img/text-todo.png">
                        </div>
                </div>
            </div>
        </div>
        <div class="toDo-done" onclick="board()">
            <div class="show-up-todo">
                <div class="show-up-style">
                    <img class="img-check-todo-box" src="/img/done.png">  
                    <img src="/img/check chop.png" class="check-chop">
                        <div class="show-up-style-1">
                            ${workflowDone}
                            <img class="color-change-box-todo-done" src="/img/text-done.png">
                        </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function timeOfDay() {
    let time = new Date().getHours();
    if (time < 10 && time > 5) {
        return "Good Morning";
    }
    else if (time > 10 && time < 17) {
        return "Good Day";
    }
    else {
        return "Good Evening";
    }
}

function hello() {
    let content = document.getElementById('contacts-container');
    content.innerHTML += /*html*/ `
    <div class="none">
        <div class="hello d-flex gap10 flex-column">
            <p>${timeOfDay()},</p><b>${JSON.parse(localStorage.getItem('joinUser')).name}</b>
        </div>
    </div>
    `;
}
