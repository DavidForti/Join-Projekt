let taskInBoard = [0];
let tasInProgress = [0];
let feedBack = [0];
let urgant = [0];




 async function summary() {
    let contantSummary = document.getElementById('contantSummary');
    contantSummary.innerHTML = '';
    contantSummary.innerHTML = hedalineSummary();
    for (let i = 0; i < taskInBoard.length; i++) {
        const board = taskInBoard[i];
        const progress = tasInProgress[i];
        const feedBacks = feedBack[i];
        const urgants = urgant[i];
        contantSummary.innerHTML += progrssesBox(board, progress, feedBacks);
        contantSummary.innerHTML += urgentBox(urgants);
        contantSummary.innerHTML += toDoBox();
    }
   //await downloadFromServer();
    await init();
    const joinUser = getFromLocalStorage('joinUser');
    filterById(joinUser);
}

//async function downloadFromServer() {
  //  await init();
  //  const joinUser = getFromLocalStorage('joinUser');
  //  filterById(joinUser);
//}

function filterById(user) {
    let task = editTasks.filter(task => task.userId == user['id']);
}

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

function progrssesBox(board, progress, feedBacks) {
    return/*html*/`
    <div class="boxes">
        <div class="box"> ${editTasks.length}</div>
        <div class="box"> ${progress}</div>
        <div class="box"> ${feedBacks}</div>
    </div>
    
    `;
}

function urgentBox(urgants) {
    return /*html*/`
    <div class="urgent-box">
        <img src="/img/lineUrgent.png" class="line-vertical-Urgent">
        <img src="/img/urgant.png" class="urgant">
        <img src="/img/Ellipse.png" class="ellipse">        
        <h1 class="show-urgent">${urgants} <img src="/img/text.png"></h1>
        <h3 class="deadline">hier muss die deadline stehen von add Task <img  class="updead-line" src="/img/UpcomingDeadline.png" ></h2>
           
    </div>

    `;
}

function toDoBox() {
    return/*html*/`
    <div class="toDo-done-box">
        <div class="toDo-done"></div>
        <div class="toDo-done"></div>
    </div>
    
    `;
}