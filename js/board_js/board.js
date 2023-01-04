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

function cancelBnt() {
    document.getElementById('contantAddToTask').classList.add("d-none");
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

function addTaskBnt() {
    document.getElementById('contantAddToTask').classList.remove("d-none");
    let contantAddToTask = document.getElementById('contantAddToTask');
    contantAddToTask.innerHTML = '';
    contantAddToTask.innerHTML += addTask();
    // contantAddToTask.innerHTML = ('removeDnone').classList.remove("d-none");

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
                        <option>Sales</option>  
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
            <div class="selections-sec">
                <label for="due-date" class="correction-due-date">Due Date</label>
                <input type="date" id="dueDate" class ="due-date">
                <label for="status" class="correction-due-date">Prio</label>
                    <div class="status" id="chgeprio">
                        <div class="urgent-status"></div>
                        <div class="medium-status"></div>
                        <div class="low-status"></div>
                    </div>
                <!-- nach subtask nachfragen -->
                <label for="subtask">Subtask</label>
                <input type="text" name="chgesubtask" id="chgesubtask" placeholder="Add new subtask" class ="subtask">  
           
                <div class="bnts">
                    <button class="bnt-cancel" onclick="cancelBnt()"> Cancel <img src="img/cancelSymbol.png" ></button>
                    <button class="bnt-Task" onclick="add()">Create Task<img src="img/checkSymbol.png" class="check-symbol"></button>
                </div> 
             
            </div> 
            
            
        </div>
   
    `;
}

function closeTask(){
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
    pushTaskInArr(titel, description, category, assigned, dueDate, prio, subtask);
}

async function pushTaskInArr(titel, description, category, assigned, dueDate, prio, subtask) {
    let headOfTask = {
        "titel": titel.value,
        "description": description.value,
        "category": category.value,
        "assigned": assigned.value,
        "dueDate": dueDate.value,
        "prio": prio.value,
        "subtask": subtask.value
    };

    editTasks.push(headOfTask);
    await saveToBackend('tasks', editTasks);
    showTask();
    console.log(editTasks);
    titel.value = '';
    description.value = '';
    category.value = '';
    assigned.value = '';
    dueDate.value = '';
    prio.value = '';
    subtask.value = '';
}

function showTask() {
    let contantToDo = document.getElementById('contantToDo');
    contantToDo.innerHTML = '';
    let html = '';
    for (let i = 0; i < editTasks.length; i++) {
        let task = editTasks[i];
        html += `
                    <h3 >${task['titel']}</h3>
                    <h2 >${task['description']}</h2>
         `;
    }
    contantToDo.innerHTML = html;
}






// wird evtl später gebraucht 
//function changeWorkCategory() {
//  let chgeCategory= document.getElementById("myList");
// document.getElementById("favourite").value = chgeCategory.options[mylist.selectedIndex].text;
// }

function dragAndDrop() {
    return/*html*/`
        <div class="dad-container">
            <div>Todo</div>
            <div id="contantToDo" class="testdiv"></div>
            <div>In progress</div>
            <div>Awatinig Feedback</div>
            <div>Done</div>
        </div>
    
    
    `;
}

