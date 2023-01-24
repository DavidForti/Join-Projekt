// Array to store temporarily the selected contacts
let newTaskSelectedContacts = [];

/**
 * Init Multiselect Dropdown to assign Contacts to New Task
 * Add Event-Listener for click-Event to fold out and in the Multiselect Checkboxes
 */
function initNewTaskAssignedToContactsMultiSelect() {
    onNewTaskCheckboxStatusChange();

    let newTaskContainer = document.getElementById('new-task-input-container');
    newTaskContainer.addEventListener("click", onNewTaskSelectAssignContactsDropdown);
}


/**
 * Remove Click-EventListener when closing or saving the New Task Form
 */
function removeNewTaskEventListener() {
    let newTaskContainer = document.getElementById('new-task-input-container');
    newTaskContainer.removeEventListener("click", onNewTaskSelectAssignContactsDropdown);
}


/**
 * Click-Event Handler-Function for the Multiselect Dropdown
 * 
 * @param {Object} event 
 */
function onNewTaskSelectAssignContactsDropdown(event) {
    let flyoutElement = document.getElementById('new-task-assigned-to-multiselect-container');
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
    toggleNewTaskAssignedToContactsCheckboxArea(true);
    // console.log('click outside');
}


/**
 * Get Html to render Multiselect Dropdown List to assign Contacts to Task
 * 
 * @returns - Html to render Dropdown list
*/
function getNewTaskAssignedToDropDownHtml() {
    let html;
    let contactsSortByName = sortContactsByName();
    html = `<div class="form-group col-sm-12">
                <div id="new-task-assigned-to-multiselect-container">
                    <div id="new-assigned-to-select-box" class="new-task-assigned-to-select-box" onclick="toggleNewTaskAssignedToContactsCheckboxArea()">
                        <select class="form-select">
                            <option>Select contacts to assign</option>
                        </select>
                        <div class="overSelect"></div>
                    </div>
                    <div id="new-task-assigned-to-select-options">`;
    for (let i = 0; i < contactsSortByName.length; i++) {
        const contactName = contactsSortByName[i]['name'];
        html += `<label for="chk${i}" class="d-flex flex-row justify-content-between align-items-center">
                    <span>${contactName}</span>
                    <input type="checkbox" id="chk${i}" onchange="onNewTaskCheckboxStatusChange()" value="${contactName}"> 
                </label>`;
    }
    html += `       </div>
                </div>
            </div id="">
            <div id="new-task-assigned-to-multiselect-selected"></div>`;
    return html;
}


/**
 * Show or Hide AssignedTo Contacts Dropdown list
 * 
 * @param {boolean}} onlyHide - Hide true/false
 */
function toggleNewTaskAssignedToContactsCheckboxArea(onlyHide = false) {
    let checkboxes = document.getElementById("new-task-assigned-to-select-options");
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
function onNewTaskCheckboxStatusChange() {
    let assignedToMultiSelectSelected = document.getElementById('new-task-assigned-to-multiselect-selected');
    let assignedToSelectOptions = document.getElementById("new-task-assigned-to-select-options");
    let checkedCheckboxes = assignedToSelectOptions.querySelectorAll('input[type=checkbox]:checked');
    newTaskSelectedContacts = [];

    for (let i = 0; i < checkedCheckboxes.length; i++) {
        const contactName = checkedCheckboxes[i].getAttribute('value');
        newTaskSelectedContacts.push(contactName);
    }

    // Show selected Contacts under the Dropdown
    if (newTaskSelectedContacts.length == 0)
        assignedToMultiSelectSelected.innerHTML = "Nothing is selected";
    else
        renderAssignedToMultiSelectSelectedArea(newTaskSelectedContacts, 'new-task-assigned-to-multiselect-selected');
}