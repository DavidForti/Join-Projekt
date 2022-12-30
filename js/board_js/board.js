




function board() {
    addAndRemove();

    let contantBoard = document.getElementById('contantBoard');
    contantBoard.innerHTML = '';
    contantBoard.innerHTML += headlineBoard();
    contantBoard.innerHTML += dragAndDrop();

}

function addAndRemove() {
    document.getElementById('contantSummary').classList.add("d-none");
    document.getElementById('contantBoard').classList.remove("d-none");
}

function headlineBoard() {
    return /*html*/`
    <div class="headline-board-continaer">
        <h1 class="headline-board">Board</h1>
        <div class="input-feld">
            <input type="Find Task" class="input">
            <button class="bnt-board" onclick="addTaskBnt()"> Add task +</button>
        </div>
    </div>
        
    `;
}

function addTaskBnt(){
     let contantAddToTask = document.getElementById('contantAddToTask');
     contantAddToTask.innerHTML = '';
     contantAddToTask.innerHTML += addTask();
}

// input felder noch hinzufügen und namen vergeben 
function addTask(){
    return/*html*/`
        <div>
        <input type="text">     
        <input type="text">
        <input type="text">
        <input type="text">



        </div>
    `;
}


function dragAndDrop() {
    return/*html*/`
        <div class="dad-container">
            <div>Todo</div>
            <div>In progress</div>
            <div>Awatinig Feedback</div>
            <div>Done</div>
        </div>
    
    
    `;
}

