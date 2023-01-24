// Copy (not reference) of selected Task-Object
let currentTask;

/**
 * Get Html to Render Selected Task in Show Mode
 * 
 * @param {int} taskId - Task-Id of selected Task
 */
function openCurrentTaskShowMode(taskId) {
    let html = '';
    let body = document.body;

    // Copy (not reference) selected Task-Object to new variable
    currentTask = JSON.parse(JSON.stringify(editTasks[taskId]));

    let priority = imgStatusPrio.filter(imgStatusPrio => imgStatusPrio.Name == currentTask.priority);
    html = /*html*/ `
            <div id="current-task-container" class="current-task-container">
                <div class="current-task-show-box">
                    <div class="current-task-show-header ${currentTask['category'].toLowerCase()}">
                       <span>${currentTask['category']}</span>
                       <img src="./img/close.png" onclick="closeCurrentTask('Show'); eventListener()" class="current-task-show-close-img">
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
    // colorNameInitials();
}


/**
 * Get Html to render assignedTo Contacts Initials as Circle with the stored background Color 
 * 
 * @returns 
 */
function getAssignedToContactsHtml() {
    let html = '<div>';
    let contactNames;
    if (typeof currentTask['assignedTo'] !== "object") {
        console.log(typeof currentTask['assignedTo']);
        contactNames = new Array(currentTask['assignedTo']);
    } else {
        contactNames = currentTask['assignedTo'];
    }
    for (let i = 0; i < contactNames.length; i++) {
        const contactName = contactNames[i];
        const contact = getContact(contactName);
        html += getAssignedToContactHtml(contact);
    }
    html += '</div>';
    return html;
}


/**
 * Get Html to render Circle of single Contact Initials
 * 
 * @param {object} contact - Contact-Object
 * @returns - Html
 */
function getAssignedToContactHtml(contact) {
    let html = '';
    html = `<div class="current-task-show-assignedto-contact-box">`;
    html += getNameInitialsCircleHtml(contact['name'], contact['color'], 'vertical');
    html += `   <div class="current-task-show-assignedto-contactname-box">
                    <span>${contact['name']}</span>
                </div>
            </div>`;
    return html;
}


/**
 * Get Html for Name Intials as Circle with Background Color of Contact
 * 
 * @param {string} contactName - Contact Fullname
 * @param {string} contactColor - Background Color of Contact
 * @param {string} layout - Orientation how circles are aligned (Horizontal or vertical). To overlap the circles in Horizontal Layout add negative margin-left.
 * @returns - Html for Name Intials as Circle with Background Color of Contact
 */
function getNameInitialsCircleHtml(contactName, contactColor, layout) {
    let marginLeftStyle = '';
    if (layout == 'horizontal')
        marginLeftStyle = 'ml-negative-8'

    return `<div class="current-task-show-assignedto-letter-box ${marginLeftStyle}" style="background-color: ${contactColor}">
                <span>${getNameInitials(contactName)}</span>
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
 * Get Html to Render Selected Task in Edit Mode
 */
function openCurrentTaskEditMode() {
    let html;
    document.getElementById('current-task-container').remove();
    let body = document.body;
    html = `<form id="edit-task-form" onsubmit="saveEditedCurrentTask(); return false;">
            <div id="current-task-container" class="current-task-container">
                <div id="current-task-edit-box" class="current-task-edit-box">
                    <div class="current-task-edit-header">
                       <img src="./img/close.png" onclick="closeCurrentTask('Edit')" class="current-task-edit-close-img">
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
    html += getAssignedToDropDownHtml(currentTask['assignedTo']);
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

    initAssignedToContactsMultiSelect();
}


/**
 * Get Html to render Multiselect Dropdown List to assign Contacts to Task
 * 
 * @param {editTasks['assignedTo']} taskAssignedTo 
 * @returns - Html to render Dropdown list
*/
function getAssignedToDropDownHtml(taskAssignedToContacts) {
    let html;
    let contactsSortByName = sortContactsByName();
    html = `<div class="form-group col-sm-12">
                <div id="assigned-to-multiselect-container">
                    <div id="assigned-to-select-box" class="assigned-to-select-box" onclick="toggleAssignedToContactsCheckboxArea()">
                        <select class="form-select">
                            <option>Select contacts to assign</option>
                        </select>
                        <div class="overSelect"></div>
                    </div>
                    <div id="assigned-to-select-options">`;
    for (let i = 0; i < contactsSortByName.length; i++) {
        const contactName = contactsSortByName[i]['name'];
        html += `<label for="chk${i}" class="d-flex flex-row justify-content-between align-items-center">
                    <span>${contactName}</span>
                    <input type="checkbox" id="chk${i}" onchange="onCheckboxStatusChange()" value="${contactName}" ${setCheckboxContactIsAssignedByTask(taskAssignedToContacts, contactName)}> 
                </label>`;
    }
    html += `       </div>
                </div>
            </div id="">
            <div id="assigned-to-multiselect-selected"></div>`;
    return html;
}


/**
 * Init Multiselect Dropdown to assign Contacts to Task
 * Add Event-Listener for click-Event to fold out and in the Multiselect Checkboxes
 */
function initAssignedToContactsMultiSelect() {
    onCheckboxStatusChange();

    let editbox = document.getElementById('current-task-edit-box');
    editbox.addEventListener("click", onSelectAssignContactsDropdown);
}


/**
 * Click-Event Handler-Function for the Multiselect Dropdown
 * 
 * @param {Object} - Event 
 */
function onSelectAssignContactsDropdown(event) {
    let flyoutElement = document.getElementById('assigned-to-multiselect-container');
    let targetElement = event.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            // console.log('click inside');
            return;
        }

        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    toggleAssignedToContactsCheckboxArea(true);
    // console.log('click outside');
}


/**
 * Remove Click-EventListener when closing or saving the Edited Task Form
 */
function removeEditBoxEventListener() {
    let editbox = document.getElementById('current-task-edit-box');
    editbox.removeEventListener("click", onSelectAssignContactsDropdown);
}


/**
 * Show or Hide AssignedTo Contacts Dropdown list
 * 
 * @param {boolean}} onlyHide - Hide true/false
 */
function toggleAssignedToContactsCheckboxArea(onlyHide = false) {
    let checkboxes = document.getElementById("assigned-to-select-options");
    let displayValue = checkboxes.style.display;

    if (displayValue != "block") {
        if (onlyHide == false) {
            checkboxes.style.display = "block";
        }
    } else {
        checkboxes.style.display = "none";
    }
}


/**
 * OnChange Event-Handler when Checkbox-Status of the Multiselect Dropdown changed
 */
function onCheckboxStatusChange() {
    let assignedToMultiSelectSelected = document.getElementById('assigned-to-multiselect-selected');
    let assignedToSelectOptions = document.getElementById("assigned-to-select-options");
    let checkedCheckboxes = assignedToSelectOptions.querySelectorAll('input[type=checkbox]:checked');
    let selectedContacts = [];

    for (let i = 0; i < checkedCheckboxes.length; i++) {
        const contactName = checkedCheckboxes[i].getAttribute('value');
        selectedContacts.push(contactName);
    }
    saveAssignedContactToContactsArray(selectedContacts);

    // Show selected Contacts under the Dropdown
    if (selectedContacts.length == 0)
        assignedToMultiSelectSelected.innerHTML = "Nothing is selected";
    else
        renderAssignedToMultiSelectSelectedArea(selectedContacts, 'assigned-to-multiselect-selected');

}


/**
 * Render Html under the Dropdown with the Name Initials of the selected Contacts as Circles
 * 
 * @param {string[]} contactNames - Current Task AssignedTo Contacts Fullname
 */
function renderAssignedToMultiSelectSelectedArea(contactNames, elementId) {
    let assignedToMultiSelectSelected = document.getElementById(elementId);
    let html = '';
    for (let i = 0; i < contactNames.length; i++) {
        const contact = getContact(contactNames[i]);
        html += getNameInitialsCircleHtml(contact.name, contact.color, 'horizontal');
    }
    assignedToMultiSelectSelected.innerHTML = html;
}


/**
 * Sort Contacts-Object By Name Property
 * 
 * @returns - Sorted Contacts By Name
 */
function sortContactsByName() {
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
}


/**
 * Add Selected Contact Names to Current Task AssignedTo Property
 * 
 * @param {string[]} contactNames 
 */
function saveAssignedContactToContactsArray(contactNames) {
    currentTask['assignedTo'] = contactNames;
}


/**
 * Check if contact name exists in AssignedTo Array of Selected Task
 * to set or uncheck checkbox
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
 * @param {date} - Date 
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
    removeEditBoxEventListener();
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
function closeCurrentTask(taskMode) {
    if (taskMode == 'Edit')
        removeEditBoxEventListener();

    document.getElementById('current-task-container').remove();
}