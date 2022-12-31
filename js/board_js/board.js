let subjectObject = {'Sales':'Backoffice'}



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
                <input type="text" placeholder="Enter a Description " class="description">
                <label for="category">Category</label> 

                <select name="category" id="category" class="category">
                <option value="" selected="selected" >Select task category</option>  
                </select>

               
                <label for="assigned-to">Assigned to</label> 
                <input type="text" placeholder="Select contacts to assign " class="assigned-to">
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
                <label for="subtask">Subtask</label> 
                <input type="text" name="" id="" placeholder="Add new subtask" class ="subtask">
            </div>   
    `;
}

// hier nach einr anderen funktion schuaen
window.onload =  function() {
    let dropDownCategory = document.getElementById("category");
    for (let x in subjectObject) {
        dropDownCategory.options[dropDownCategory.options.length] = new Option(x, x);
    }
    dropDownCategory.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        chapterSel.length = 1;
        topicSel.length = 1;
        //display correct values
        for (let y in dropDownCategory[this.value]) {
            topicSel.options[topicSel.options.length] = new Option(y, y);
        }
    };
    topicSel.onchange = function () {
        //empty Chapters dropdown
        chapterSel.length = 1;
        //display correct values
        let z = dropDownCategory[dropDownCategory.value][this.value];
        for (var i = 0; i < z.length; i++) {
            chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
        }
    };
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

