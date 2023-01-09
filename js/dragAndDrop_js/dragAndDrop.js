function renderFields() {
    let content = document.getElementById('contantBoard');
    content.innerHTML = /*html*/ `
<div class="main">
    <div class="second">
        <h3>To Do</h3>
        <div class="list">
        <p class="list-item" draggable="true">1</p>
        <p class="list-item" draggable="true">2</p>
        <p class="list-item" draggable="true">3</p>
        <p class="list-item" draggable="true">4</p>
        </div>
    </div>
    <div class="second">
        <h3>In Progress</h3>
        <div class="list"></div>
    </div>
    <div class="second">
        <h3>Awaiting Feedback</h3>
        <div class="list"></div>
    </div>
    <div class="second">
        <h3>Done</h3>
        <div class="list"></div>
    </div>
</div>
`;
    eventListener();
}

function eventListener() {
    const list_items = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.list');

    let draggedItem = null;

    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
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
                console.log('drop');
                this.append(draggedItem);
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            });
        }
    }
}