let currentDraggingTaskId

function renderFields() {
    let content = document.getElementById('d-board');
    content.innerHTML += /*html*/ `
    <div class="headline-board-continaer">
        <h1 class="headline-board">Board</h1>
        <div class="input-feld">
            <input id="task-search-input" type="Find Task" class="input" onkeyup="searchTasks()">
            <button class="bnt-board" onclick="addTaskBnt()"> Add task +</button>
        </div>
    </div>
<div class="main">
    <div class="second">
        <h3>To Do <img class="addb-button" src="/img/add button.png"></h3>
        <div id="todo-tasks" class="list">
            <p class="list-item" draggable="true">1</p>
        </div>
    </div>
    <div class="second">
        <h3>In Progress <img class="addb-button" src="/img/add button.png"></h3>
        <div id="in-progress-tasks" class="list"></div>
    </div>
    <div class="second">
        <h3>Awaiting Feedback <img  class="addb-button"src="/img/add button.png"></h3>
        <div id="awaiting-feedback-tasks" class="list"></div>
    </div>
    <div class="second">
        <h3>Done <img class="addb-button" src="/img/add button.png"></h3>
        <div id="done-tasks" class="list"></div>
    </div>
</div>
`;
    eventListener();
}

function eventListener() {
    const list_items = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.list');

    let draggedItem = "";

    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                currentDraggingTaskId = draggedItem.id;
                item.style.visibility = 'hidden';

            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.visibility = 'visible';
            }, 0);
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            });

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });

            list.addEventListener('drop', function (e) {
                // console.log('drop');
                this.append(draggedItem);
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                saveTaskStatus(e);
            });
        }
    }
}