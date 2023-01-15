function openCurrentTaskShowMode(taskId) {
    let html = '';
    let body = document.body;
    let task = editTasks[taskId];
    let priority = imgStatusPrio.filter(imgStatusPrio => imgStatusPrio.Name == task.priority);
    html = `
            <div id="current-task-container" class="current-task-container">
                <div class="current-task-show-box">
                    <div class="current-task-show-header ${task['category'].toLowerCase()}">
                       <span>${task['category']}</span>
                       <img src="./img/close.png" onclick="closeCurrentTask()" class="current-task-show-close-img">
                    </div>
                    <div class="current-task-show-title">
                       <h2>${task['title']}</h2>
                    </div>
                    <div class="current-task-show-description">
                       <span>${task['description']}</span>
                    </div>
                    <div class="current-task-show-duedate">
                       <span class="current-task-show-label">Due date:</span><span>${task['dueDate']}</span>
                    </div>
                    <div class="current-task-show-priority-container d-flex justify-content-center align-items-center">
                       <span class="current-task-show-label">Priority:</span>
                       <div class="task-priority-box d-flex justify-content-center align-items-center ${task['priority'].toLowerCase()}">
                          <span>${task['priority']}</span>
                          <img src="${priority[0]['src_white']}">
                       </div>
                    </div>
                    <div class="current-task-show-assigned">
                       <span class="current-task-show-label">Assigned To:</span>
                    </div>`;
    html += getAssignedToContactsHtml(taskId);
    html += `       <div class="current-task-show-edit-box" onclick="openCurrentTaskEditMode(${taskId})">
                        <img src="./img/edit.png" class="current-task-show-edit-img">
                    </div>
                </div>
            </div>`;
    body.innerHTML += html;
    colorNameInitials(taskId);
}

function getAssignedToContactsHtml(taskId) {
    let html = '<div>';
    let contactNames = editTasks[taskId]['assignedTo'];
    for (let i = 0; i < contactNames.length; i++) {
        const contactName = contactNames[i];
        let contact = getContact(contactName);
        html += getAssignedToHtml(contact, i);
    }
    html += '</div>';
    return html;
}


function getAssignedToHtml(contact, counter) {
    return `<div class="current-task-show-assignedto-contact-box">
                <div id="name-initials${counter}" class="current-task-show-assignedto-letter-box">
                    <span>${getNameInitials(contact['name'])}</span>
                </div>
                <div class="current-task-show-assignedto-contactname-box">
                    <span>${contact['name']}</span>
                </div>
            </div>`;
}


function getContact(contactName) {
    return contacts.filter(c => c.name == contactName)[0];
}


/**
 * Get First letter of first name and last name
 * 
 * @param {string} contactName - Contact Full Name
 * @returns - Name Initials
 */
function getNameInitials(contactName) {
    let letters = contactName.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    return letters;
}


function colorNameInitials(taskId) {
    let contactNames = editTasks[taskId]['assignedTo'];
    for (let i = 0; i < contactNames.length; i++) {
        const contactName = contactNames[i];
        let contact = getContact(contactName);
        let elementId = 'name-initials' + i;
        document.getElementById(elementId).style.background = contact['color'];
    }
}


function openCurrentTaskEditMode(taskId) {
    let html;
    document.getElementById('current-task-container').remove();
    let body = document.body;
    let task = editTasks[taskId];
    html = `<div id="current-task-container" class="current-task-container">
                <div class="current-task-edit-box">
                    <div class="current-task-edit-header">
                       <img src="./img/close.png" onclick="closeCurrentTask()" class="current-task-edit-close-img">
                    </div>
                    <div class="current-task-edit-title d-flex flex-column">
                       <label for="task-edit-title">Title</label>
                       <div class="form-input-box">                       
                            <input type="text" placeholder="Enter a title" id="task-edit-title" value="${task['title']}">                    
                       </div>
                    </div>
                    <div class="current-task-edit-description d-flex flex-column">
                       <label for="task-edit-description">Description</label>
                       <div class="form-input-box">      
                            <textarea id="task-edit-description" rows="2" name="text" placeholder="Enter a description">${task['description']}</textarea>                 
                       </div>
                    </div>
                    <div class="current-task-edit-duedate">
                       <label for="task-edit-duedate">Due date</label>                       
                        <div class="form-input-box">      
                           <input type="date" placeholder="Enter a due date" id="task-edit-duedate" value="${formatDate(task['dueDate'])}">                    
                       </div>
                    </div>
                    <div class="current-task-edit-priority d-flex flex-column">
                        <label>Priority</label>`;
    html += getPriorityHtml(task);
    html += `       </div>
                    <div class="current-task-edit-assigned">
                        <label>Assigned To</label>
                    </div>
                    <div class="current-task-edit-ok-box" onclick="saveEditedCurrentTask()">
                        <img src="./img/check chop.png" class="current-task-edit-ok-img">
                    </div>
                </div>
            </div>
    `;
    body.innerHTML += html;
}

function getPriorityHtml(task) {
    let html = '<div class="d-flex flex-row justify-content-around align-items-center">';
    for (let i = 0; i < imgStatusPrio.length; i++) {
        const priority = imgStatusPrio[i];
        const backgroundColor = getTaskPriorityBackgroundColor(task, priority['Name']);
        const fontColor = getTaskPriorityFontColor(task, priority['Name']);
        const imgSrc = getTaskPriorityImgSrc(task, priority);
        html += `<div class="task-priority-box d-flex justify-content-center align-items-center ${backgroundColor}">
                    <span class="${fontColor}">${priority['Name']}</span>
                    <img src="${imgSrc}">
                 </div>`;
    }
    html += '</div>';
    return html;
}

function getTaskPriorityBackgroundColor(task, priorityName) {
    if (task['priority'] == priorityName)
        return task['priority'].toLowerCase();
    else
        return 'white-bg';
}


function getTaskPriorityFontColor(task, priorityName) {
    if (task['priority'] == priorityName)
        return 'white';
    else
        return 'black';
}

function getTaskPriorityImgSrc(task, priority) {
    if (task['priority'] == priority['Name'])
        return priority['src_white'];
    else
        return priority['src'];
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



function closeCurrentTask() {
    document.getElementById('current-task-container').remove();
}

function saveEditedCurrentTask() {
    document.getElementById('current-task-container').remove();
}
