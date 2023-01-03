let workflowToDo = 0;
let workflowInProgress = 0;
let workflowAwaitingFeedback = 0;
let workflowDone = 0;
let workflowUrgent = 0;
let workflowLow = 0;
let workflowMedium = 0;


const taskStatus = {
    todo: 'To do',
    inProgress: 'In progress',
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
    document.getElementById('contantSummary').classList.remove("d-none");
    document.getElementById('contantBoard').classList.add("d-none");

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



//function summaryclick()

//await downloadFromServer();




//async function downloadFromServer() {
//  await init();
//  const joinUser = getFromLocalStorage('joinUser');
//  filterById(joinUser);
//}


//function amounts(){
//  if (xxxx) {
//      emptyscreen()
//  }else{
//  die restlichen funktionen
//  }
//}


//function emptyscreen(){} => schreiben wenn keine task angelegt sind


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

function urgentBox(urgants) {
    return /*html*/`
    <div class="urgent-box">
        <div class="urgent-style-box">
            <img src="/img/lineUrgent.png" class="line-vertical-Urgent">
            <div class="red-circel">
                <img src="/img/urgant.png" class="urgant">
                <img src="/img/Ellipse.png" class="ellipse">   
            </div>     
                <h1 class="show-urgent">${workflowUrgent} <img src="/img/text.png"></h1>
            
            <h3 class="deadline">hier muss die deadline stehen von add Task <img  class="updead-line" src="/img/UpcomingDeadline.png" ></h2>
        </div>
    </div>

    `;
}

function toDoBox() {
    return/*html*/`
    <div class="toDo-done-box">
        <div class="toDo-done">${workflowToDo}</div>
        <div class="toDo-done">${workflowDone}</div>
    </div>
    
    `;
}