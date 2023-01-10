let joinUsers = [];
let editTasks = [];
let contacts = [];
let newUser = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');

    if (message && message !== 'undefined') {
        showNotifyMessage('notification-login-container', message);
        emtpyInputFields(['email', 'password']);
    } else
        getLastJoinUser();

    await initData();
}


async function initData() {
    //  await deleteAll();
    // await saveUsersToBackend();
    // await saveTasksToBackend();
    // await saveContactsToBackend();

    await downloadFromServer();

    await loadUsersFromBackend('script.js');
    await loadTasksFromBackend('script.js');
    await loadContactsFromBackend('script.js');
}


function animateLogo() {
    document.getElementById('join-animation-container').classList.add('join-animation-container-animate');
    document.getElementById('join-logo-gray').classList.add('join-logo-animate-gray');
    document.getElementById('join-logo-white').classList.add('join-logo-animate-white');
}


async function loadUsersFromBackend(page) {
    joinUsers = JSON.parse(await backend.getItem('users')) || [];
    console.log(`Users geladen (${page}):`, joinUsers);
}


async function loadTasksFromBackend(page) {
    editTasks = JSON.parse(await backend.getItem('tasks')) || [];
    console.log(`Tasks geladen (${page}):`, editTasks);
}


async function loadContactsFromBackend(page) {
    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    console.log(`Contacts geladen (${page}):`, contacts);
}


/**
 * 
 * @param {string} email - Email address to check 
 * @returns - Founded user with the entered email address
 */
function getUserFromEmailAddress(email) {
    return (joinUsers.find(u => u.email == email))
}


async function saveToBackend(arrayName, array) {
    await backend.setItem(arrayName, JSON.stringify(array));
}


/**
 * 
 * @param {object} user - User-Object
 * @param {string} key - User property that is updated
 * @param {string} value - Value that is stored
 */
async function updateUser(user, keyValueArray) {
    for (let i = 0; i < keyValueArray.length; i++) {
        const element = keyValueArray[i];
        joinUsers[user['id']][element['key']] = element['value'];
    }

    await saveToBackend('users', joinUsers);
}


async function saveUsersToBackend() {
    joinUsers = [
        {
            "id": 0,
            "name": "Guest",
            "email": "guest@web.de",
            "password": "0000",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 1,
            "name": "Bernd Trossmann",
            "email": "mcptopgun@gmail.com",
            "password": "1111",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 2,
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "password": "2222",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 3,
            "name": "Helmut Dunz",
            "email": "h.dunz@web.de",
            "password": "3333",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        }
    ];

    await backend.setItem('users', JSON.stringify(joinUsers));
}


async function saveTasksToBackend() {
    editTasks = [
        {
            "userId": 1,
            "title": "Webdesign redesign",
            "description": "Modify the contents of the main website. Adjust the UI to the company's brand design.",
            "category": "Sales",
            "assignedTo": [],
            "dueDate": "01.01.2023",
            "priority": "Urgent",
            "subTasks": ['Create new icons'],
            "status": 'To do'     // Es gibt noch die Werte: "In Progress", "Awaiting Feedback", "Done" ("To do" wird als Standart verwendet)

        },
        {
            "userId": 2,
            "title": "Price increase",
            "description": "Price increase Description...",
            "category": "Backoffice",
            "assignedTo": [],
            "dueDate": "01.02.2023",
            "priority": "Medium",
            "subTasks": ['Inform customers', 'Sales Manager Meeting'],
            "status": 'To do'
        },
        {
            "userId": 3,
            "title": "Task 3",
            "description": "Description Task 3...",
            "category": "Backoffice",
            "assignedTo": [],
            "dueDate": "01.02.2023",
            "priority": "Urgent",
            "subTasks": ['Inform customers', 'Sales Manager Meeting'],
            "status": 'In Progress'
        },
        {
            "userId": 2,
            "title": "Task 4",
            "description": "Description Task 4...",
            "category": "Sales",
            "assignedTo": [],
            "dueDate": "01.05.2023",
            "priority": "Low",
            "subTasks": [],
            "status": 'Awaiting Feedback'
        },
        {
            "userId": 2,
            "title": "Task 5",
            "description": "Description Task 5...",
            "category": "Sales",
            "assignedTo": [],
            "dueDate": "01.06.2023",
            "priority": "Medium",
            "subTasks": [],
            "status": 'Done'
        },
        {
            "userId": 3,
            "title": "Task 6",
            "description": "Description Task 6...",
            "category": "Sales",
            "assignedTo": [],
            "dueDate": "01.07.2023",
            "priority": "Low",
            "subTasks": [],
            "status": 'Done'
        }
    ];

    await backend.setItem('tasks', JSON.stringify(editTasks));
}


async function saveContactsToBackend() {
    contacts = [
        {
            "name": "Bernd Trossmann",
            "email": "mcptopgun@gmail.com",
            "phone": "+49 6666 1111",
            "color": '#df7821'
        },
        {
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "phone": "+49 4444 9999",
            "color": '#85c1e0'
        },
        {
            "name": "Helmut Dunz",
            "email": "h.dunz@web.de",
            "phone": "+49 2222 3333",
            "color": '#ed474b'
        }
    ];

    await backend.setItem('contacts', JSON.stringify(contacts));
}


async function deleteAll() {
    await backend.deleteItem('users');
    await backend.deleteItem('tasks');
}


function goToPage(page, message) {
    window.location.href = `${page}?msg=${message}`;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


function showNotifyMessage(messageId, message, imageId, show) {
    let notifyMsg = document.getElementById(messageId);
    notifyMsg.classList.remove('d-none');
    document.getElementById('notification-message').innerHTML = message;
    notifyMsg.classList.add('notification-container-animate');
    if (imageId)
        showElement(imageId, show)

    setTimeout(() => {
        notifyMsg.classList.add('d-none');
    }, 2500)
}


function showElement(elementId, show) {
    let element = document.getElementById(elementId);
    if (show)
        element.classList.remove('d-none');
    else
        element.classList.add('d-none');
}


function emtpyInputFields(inputFields) {
    for (let i = 0; i < inputFields.length; i++) {
        let inputField = document.getElementById(inputFields[i]);
        inputField.classList.add('d-none');
    }
}


/**
 * Hide displayed warning messages
 */
function resetWarningMessages(messageIds) {
    for (let i = 0; i < messageIds.length; i++) {
        let messageId = document.getElementById(messageIds[i]);
        messageId.classList.add('d-none');
    }
}


/**
 * Show error message
 * 
 * @param {string} errorMessageElement - Error Message Element which is displayed
 * @param {string} elementSetFocus - Input Element that get's the focus
 */
function showErrorMessage(errorMessageElement, elementSetFocus) {
    document.getElementById(errorMessageElement).classList.remove('d-none');
    document.getElementById(elementSetFocus).focus();
}