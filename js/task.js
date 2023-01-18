let contactCheckboxEpanded = false;
let currentTask;

/**
 * Get Html to Render Selected Task in Show Mode
 * 
 * @param {int} taskId - Task-Id of selected Task
 */
function openCurrentTaskShowMode(taskId, para) {
    if (para === 1) {
        let html = '';
        let body = document.body;

        // Copy (not reference) selected Task-Object to new variable
        currentTask = JSON.parse(JSON.stringify(editTasks[taskId]));

        let priority = imgStatusPrio.filter(imgStatusPrio => imgStatusPrio.Name == currentTask.priority);
        html = `
            <div id="current-task-container" class="current-task-container">
                <div class="current-task-show-box">
                    <div class="current-task-show-header ${currentTask['category'].toLowerCase()}">
                       <span>${currentTask['category']}</span>
                       <img src="./img/close.png" onclick="closeCurrentTask()" class="current-task-show-close-img">
                    </div>
                    <div class="current-task-show-title">
                       <h2>${currentTask['title']}</h2>
                    </div>
                    <div class="current-task-show-description">
                       <span>${currentTask['description']}</span>
                    </div>
                    <div class="current-task-show-duedate">
                       <span class="current-task-show-label">Due date:</span><span>${formatDate(currentTask['dueDate'])}</span>
                    </div>
                    <div class="current-task-show-priority-container d-flex justify-content-center align-items-center">
                       <span class="current-task-show-label">Priority:</span>
                       <div class="task-priority-box d-flex justify-content-center align-items-center ${currentTask['priority'].toLowerCase()}">
                          <span>${currentTask['priority']}</span>
                          <img src="${priority[0]['src_white']}">
                       </div>
                    </div>
                    <div class="current-task-show-assigned">
                       <span class="current-task-show-label">Assigned To:</span>
                    </div>`;
        html += getAssignedToContactsHtml();
        html += `       <div class="current-task-show-edit-box" onclick="openCurrentTaskEditMode()">
                        <img src="./img/edit.png" class="current-task-show-edit-img">
                    </div>
                </div>
            </div>`;
        body.innerHTML += html;
        colorNameInitials();
    } else {
        
    }
}


/**
 * Get Html to render assignedTo Contacts Initials as Circle with the stored background Color 
 * 
 * @returns 
 */
function getAssignedToContactsHtml() {
    let html = '<div>';
    let contactNames = currentTask['assignedTo'].sort();
    for (let i = 0; i < contactNames.length; i++) {
        const contactName = contactNames[i];
        let contact = getContact(contactName);
        html += getAssignedToContactHtml(contact, i);
    }
    html += '</div>';
    return html;
}


/**
 * Get Html to render Circle of single Contact Initials
 * 
 * @param {object} contact - Contact-Object
 * @param {int} counter    - Value for Element-Id
 * @returns 
 */
function getAssignedToContactHtml(contact, counter) {
    return `<div class="current-task-show-assignedto-contact-box">
                <div id="name-initials${counter}" class="current-task-show-assignedto-letter-box">
                    <span>${getNameInitials(contact['name'])}</span>
                </div>
                <div class="current-task-show-assignedto-contactname-box">
                    <span>${contact['name']}</span>
                </div>
            </div>`;
}


/**
 * Get Contact-Object of specific Contact name
 * 
 * @param {string} contactName 
 * @returns 
 */
function getContact(contactName) {
    return contacts.filter(c => c.name == contactName)[0];
}


/**
 * Get First letter of first name and last name of contact Name
 * 
 * @param {string} contactName - Contact Full Name
 * @returns - Name Initials
 */
function getNameInitials(contactName) {
    let letters = contactName.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    return letters;
}


/**
 * Set Background Color of Initials of selected task assignedTo contacts
 */
function colorNameInitials() {
    let contactNames = currentTask['assignedTo'];
    for (let i = 0; i < contactNames.length; i++) {
        const contactName = contactNames[i];
        let contact = getContact(contactName);
        let elementId = 'name-initials' + i;
        document.getElementById(elementId).style.background = contact['color'];
    }
}

/**
 * Get Html to Render Selected Task in Edit Mode
 */
function openCurrentTaskEditMode() {
    let html;
    document.getElementById('current-task-container').remove();
    let body = document.body;
    html = `<form id="edit-task-form" onsubmit="saveEditedCurrentTask(); return false;">
            <div id="current-task-container" class="current-task-container">
                <div class="current-task-edit-box">
                    <div class="current-task-edit-header">
                       <img src="./img/close.png" onclick="closeCurrentTask()" class="current-task-edit-close-img">
                    </div>
                    <div class="current-task-edit-title d-flex flex-column">
                       <label for="task-edit-title">Title</label>
                       <div class="form-input-box">                       
                            <input type="text" placeholder="Enter a title" id="task-edit-title" value="${currentTask['title']}" required>                    
                       </div>
                    </div>
                    <div class="current-task-edit-description d-flex flex-column">
                       <label for="task-edit-description">Description</label>
                       <div class="form-input-box">      
                            <textarea id="task-edit-description" rows="2" name="text" placeholder="Enter a description" required>${currentTask['description']}</textarea>                 
                       </div>
                    </div>
                    <div class="current-task-edit-duedate">
                       <label for="task-edit-duedate">Due date</label>                       
                        <div class="form-input-box">      
                           <input type="date" placeholder="Enter a due date" id="task-edit-duedate" value="${currentTask['dueDate']}">                    
                       </div>
                    </div>
                    <div class="current-task-edit-priority d-flex flex-column">
                        <label>Priority</label>
                        <div id="priority-container">`;
    html += getPriorityHtml();
    html += `           </div>
                    </div>
                    <div class="current-task-edit-assigned">
                        <label>Assigned To</label>`;
    html += getAssignedToDropDown(currentTask['id'], currentTask['assignedTo']);
    html += `       </div>
                    <div class="current-task-edit-ok-box">
                        <button type="submit" name="edit-task-button">
                           <span>Ok</span>
                           <img src="./img/check chop.png">
                        </button>
                    </div>
                </div>
            </div>
            </form>`;
    body.innerHTML += html;
}


/**
 * Get Html to render Dropdown List to assign Contacts to Task
 * 
 * @param {int} taskId 
 * @param {Array} taskAssignedTo 
 * @returns - Html to render Dropdown list

TODO:
<input type="checkbox" id="chk${i}" ${setCheckboxContactIsAssignedByTask(taskAssignedTo, contactName)} onclick="setContactCheckbox('chk${i}','${contactName}')">
*/

function getAssignedToDropDown(taskId, taskAssignedTo) {
    let html;
    let contactsSortByName = sortContactsByName();
    html = `<div class="assigned-to-multiselect-container">
                <div class="assigned-to-select-box" onclick="showAssignedToCheckboxes()">
                    <select>
                        <option>Select contacts to assign</option>
                    </select>
                    <div class="overSelect"></div>
            </div>
            <div id="contact-checkboxes">`;
    for (let i = 0; i < contactsSortByName.length; i++) {
        const contactName = contactsSortByName[i]['name'];
        html += `<div class="checkbox-container d-flex flex-row justify-content-between align-items-center" onclick="setContactCheckbox('chk${i}','${contactName}')">
                   <label for="chk${i}">${contactName}</label>
                   <input type="checkbox" id="chk${i}" ${setCheckboxContactIsAssignedByTask(taskAssignedTo, contactName)}>
                 </div>`;
    }
    html += `   </div>
            </div>`;
    return html;
}


/**
 * Sort Contacts-Object By Name Property
 * @returns - Sorted Contacts By Name
 * 
 */
function sortContactsByName() {
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
}


/**
 * Check or uncheck Checkbox and Add or Remove Contact from AssignedTo Contacts of Selected Task
 * 
 * @param {string} checkboxId - Id of Checkbox Element
 * @param {string} contactName - Contact Name based on Checkbox to Add or Remove from Selected Task AssignedTo Contacts
 */
function setContactCheckbox(checkboxId, contactName) {
    let clickedCheckbox = document.getElementById(checkboxId);

    if (clickedCheckbox.checked == false) {
        clickedCheckbox.checked = true;
        addAssignedContactToContactsArray(contactName);
    } else {
        removeAssignedContactFromContactsArray(contactName);
        clickedCheckbox.checked = false;
    }
}


/**
 * Add Contact Name to Selected Task AssignedTo Contacts
 * 
 * @param {string} contactName 
 */

function addAssignedContactToContactsArray(contactName) {
    if (currentTask['assignedTo'].indexOf(contactName) == -1)
        currentTask['assignedTo'].push(contactName);
}


/**
 * Remove Contact Name from Selected Task AssignedTo Contacts
 * 
 * @param {string} contactName 
 */
function removeAssignedContactFromContactsArray(contactName) {
    let indexPos = currentTask['assignedTo'].indexOf(contactName);
    if (indexPos > -1)
        currentTask['assignedTo'].splice(indexPos, 1);
}


/**
 * Check if Contact Name exists in AssignedTo Array of Selected Task
 * 
 * @param {object} taskAssignedTo 
 * @param {string} contactName 
 * @returns - 'checked' or null to check or uncheck checkbox
 */
function setCheckboxContactIsAssignedByTask(taskAssignedTo, contactName) {
    if (taskAssignedTo.indexOf(contactName) != -1)
        return 'checked'
    else
        return null;
}


/**
 * Show or Hide AssignedTo Contacts Dropdown list
 * 
 */
function showAssignedToCheckboxes() {
    let contactCheckboxes = document.getElementById("contact-checkboxes");
    if (!contactCheckboxEpanded) {
        contactCheckboxes.style.display = "block";
        contactCheckboxEpanded = true;
    } else {
        contactCheckboxes.style.display = "none";
        contactCheckboxEpanded = false;
    }
}


/**
 * Get Html for Priority Area rendering
 * 
 * @returns - Html for rendering
 */
function getPriorityHtml() {
    let html = '<div class="d-flex flex-row justify-content-around align-items-center">';
    for (let i = 0; i < imgStatusPrio.length; i++) {
        const priority = imgStatusPrio[i];
        const backgroundColor = getTaskPriorityBackgroundColor(priority['Name']);
        const fontColor = getTaskPriorityFontColor(priority['Name']);
        const imgSrc = getTaskPriorityImgSrc(priority);
        html += `<div class="task-priority-box d-flex justify-content-center align-items-center ${backgroundColor}" onclick="changeTaskPriority('${priority['Name']}')">
                    <span class="${fontColor}">${priority['Name']}</span>
                    <img src="${imgSrc}">
                 </div>`;
    }
    html += '</div>';
    return html;
}


/**
 * Change Priority of Selected Task
 * 
 * @param {string} priorityName - Name of the Priority (Low, Medium, Urgent)
 */
function changeTaskPriority(priorityName) {
    currentTask['priority'] = priorityName;
    let taskPriorityContainer = document.getElementById('priority-container');
    let taskPriorityHtml = getPriorityHtml();
    taskPriorityContainer.innerHTML = taskPriorityHtml;
}


/**
 * Change Priority Background Color based on Selected Priority of Selected Task
 * 
 * @param {string} priorityName - Name of the priority (Low, Medium, Urgent)
 */
function getTaskPriorityBackgroundColor(priorityName) {
    if (currentTask['priority'] == priorityName)
        return currentTask['priority'].toLowerCase();
    else
        return 'white-bg';
}


/**
 * Change Priority Font Color based on Selected Priority of Selected Task
 * 
 * @param {string} priorityName - Priority Name (Low, Medium, Urgent)
 */
function getTaskPriorityFontColor(priorityName) {
    if (currentTask['priority'] == priorityName)
        return 'white';
    else
        return 'black';
}


/**
 * Get Priority Image source Property based on Priority is selected or not
 * 
 * @param {Object} priority 
 * @returns - Image Source Property
 */
function getTaskPriorityImgSrc(priority) {
    if (currentTask['priority'] == priority['Name'])
        return priority['src_white'];
    else
        return priority['src'];
}


/**
 * Format Date as dd.MM.jjjj
 * 
 * @param {date} date 
 * @returns  - Date formated as dd.MM.jjjj
 */
function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('.');
}


/**
 * Save edited Input Values to Current Task Variable
 * And save Current Task to global variable editTasks
 * And save editTasks to Backend
 */
async function saveEditedCurrentTask() {
    let title = document.getElementById('task-edit-title').value;
    let description = document.getElementById('task-edit-description').value;
    let dueDate = document.getElementById('task-edit-duedate').value;
    currentTask['title'] = title;
    currentTask['description'] = description;
    currentTask['dueDate'] = dueDate;
    await saveCurrentTaskToArray();
    await saveToBackend('tasks', editTasks);
    document.getElementById('current-task-container').remove();
    showTask(editTasks);
}

/**
 * Save Current selected Task to global Array editTasks
 * 
 */
async function saveCurrentTaskToArray() {
    let taskId = currentTask['id'];
    let task = editTasks[taskId];
    task['assignedTo'] = currentTask['assignedTo'];
    task['description'] = currentTask['description'];
    task['dueDate'] = currentTask['dueDate'];
    task['priority'] = currentTask['priority'];
    task['title'] = currentTask['title'];
}


/**
 * Close and remove selected or edited modal div container
 */
function closeCurrentTask() {
    document.getElementById('current-task-container').remove();
}