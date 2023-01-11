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
    await initData();
    workflowStatus();
    workflowPriority();
    summaryclick();
    let contantSummary = document.getElementById('contantSummary');
    contantSummary.innerHTML = '';
    contantSummary.innerHTML = hedalineSummary();
    contantSummary.innerHTML += progrssesBox();
    contantSummary.innerHTML += urgentBox();
    contantSummary.innerHTML += toDoBox();
    const joinUser = getFromLocalStorage('joinUser');

}

function summaryclick() {
    document.getElementById('changeColorboard').classList.add("backgorund");
    document.getElementById('changeColorNotice').classList.add("backgorund");
    document.getElementById('changeColor').style.backgroundColor = "black";
    document.getElementById('changeColor').classList.remove("backgorund");
    document.getElementById('contentNotice').classList.add("d-none");
    document.getElementById('contantSummary').classList.remove("d-none");
    document.getElementById('contantBoard').classList.add("d-none");
    document.getElementById('contentNotice').classList.add("d-none");
    document.getElementById('contantAddToTask').classList.add("d-none");
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

function hedalineSummary() {
    return /*html*/`
    <div class=head-of-summary>
        <h1 class="head-summary">Summary</h1>
        <img src="/img/verticalLine.png" class="vertical-Line">
        <img src="/img/nutshell.png" class="nutshell">
    </div>
    
    `;
}

function progrssesBox() {
    return/*html*/`
    <div class="boxes">
        <div class="box"> ${editTasks.length}<div class="tasks-in-Board">Tasks in <br>Board </div></div>
        <div class="box"> ${workflowInProgress}<div class="tasks-in-Board">Tasks in <br>Progress </div></div>
        <div class="box"> ${workflowAwaitingFeedback}<div class="tasks-in-Board">Awaiting<br>Feedback</div></div>
    </div>
    
    `;
}

editTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

function urgentBox(urgants) {
    return /*html*/`
    <div class="urgent-box">
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
                
                <h3 class="deadline">${editTasks[0].dueDate}<img  class="updead-line" src="/img/UpcomingDeadline.png" ></h2>
            </div>            
        </div>
    </div>

    `;
}

function toDoBox() {
    return/*html*/`
    <div class="toDo-done-box">
        <div class="toDo-done">
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
        <div class="toDo-done">
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
