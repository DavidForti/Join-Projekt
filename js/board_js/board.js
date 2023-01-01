



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

function addTaskBnt() {
    let contantAddToTask = document.getElementById('contantAddToTask');
    contantAddToTask.innerHTML = '';
    contantAddToTask.innerHTML += addTask();

}
// funktion noch verkrüzen 
function addTask() {
    return/*html*/`
        <div class="input-container">
            <div class="selections">
                <label for="title">Title</label>
                <input type="Enter a title"  placeholder="Enter a title" class="title">  
                <label for="description">Description</label>   
                <textarea required="" placeholder="Enter a Description" id="description" class="description"></textarea>
                <!--dropDown-->
                <form >
                <label for="category">Category</label> 
                <select id = "chgeCategory"   class="category">                
                <option>Select task category</option>  
                <option>New category</option> 
                <option>Sales</option>  
                <option>Backoffice</option>  
                </select>
                </form>
                <form >
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
                    <div class="status">
                        <div class="urgent-status"></div>
                        <div class="medium-status"></div>
                        <div class="low-status"></div>
                    </div>
                <!-- nach subtask nachfragen -->
                <label for="subtask">Subtask</label>
                <input type="text" name="" id="" placeholder="Add new subtask" class ="subtask">   
            </div>   
            <div class="bnts">
                <button class="bnt-cancel">Cancel <img src="img/cancelSymbol.png" ></button>
                <button class="bnt-Task">Create Task  <img src="img/checkSymbol.png" class="check-symbol">   </button>
            </div>
    `;
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
            <div>In progress</div>
            <div>Awatinig Feedback</div>
            <div>Done</div>
        </div>
    
    
    `;
}

