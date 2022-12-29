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
    low : 'Low',
    medium: 'Medium',
    urgent: 'Urgent'
}



async function summary() {
    await init();
    workflowStatus();
    workflowPriority();
    let contantSummary = document.getElementById('contantSummary');
    contantSummary.innerHTML = '';
    contantSummary.innerHTML = hedalineSummary();
    contantSummary.innerHTML += progrssesBox();
    contantSummary.innerHTML += urgentBox();
    contantSummary.innerHTML += toDoBox();
    const joinUser = getFromLocalStorage('joinUser');
    
}

function workflowStatus() {
    workflowToDo = editTasks.filter(task => task.status == taskStatus.todo).length;
    workflowInProgress = editTasks.filter(task => task.status == taskStatus.inProgress).length; 
    workflowAwaitingFeedback = editTasks.filter(task => task.status == taskStatus.awaitingFeedback).length; 
    workflowDone = editTasks.filter(task => task.status == taskStatus.done).length; 
}

function  workflowPriority(){
    workflowLow = editTasks.filter(task => task.priority == taskPriority.low).length; 
    workflowMedium = editTasks.filter(task => task.priority == taskPriority.medium).length;
    workflowUrgent= editTasks.filter(task => task.priority == taskPriority.urgent).length;
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
        <div class="box"> ${editTasks.length}</div>
        <div class="box"> ${workflowInProgress}</div>
        <div class="box"> ${workflowAwaitingFeedback}</div>
    </div>
    
    `;
}

function urgentBox(urgants) {
    return /*html*/`
    <div class="urgent-box">
        <img src="/img/lineUrgent.png" class="line-vertical-Urgent">
        <img src="/img/urgant.png" class="urgant">
        <img src="/img/Ellipse.png" class="ellipse">        
        <h1 class="show-urgent">${workflowUrgent} <img src="/img/text.png"></h1>
        <h3 class="deadline">hier muss die deadline stehen von add Task <img  class="updead-line" src="/img/UpcomingDeadline.png" ></h2>
           
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