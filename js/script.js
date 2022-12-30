let joinUsers = [];
let editTasks = [];
let newUser = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg && msg !== 'undefined') {
        let msgbox = document.getElementById('msgbox');
        msgbox.classList.remove('d-none');
        msgbox.innerHTML = msg;
    }

    // await deleteAll();
    //  await saveUsersToBackend();
    //  await saveTasksToBackend();

    await downloadFromServer();

    await loadUsersFromBackend('script.js');
    await loadTasksFromBackend();

}

function animateLogo() {
    document.getElementById('join-logo').classList.add('join-logo-animate');
    document.getElementById('join-animation-container').classList.add('join-animation-container-animate');
    document.getElementById('join-animation-container').classList.add('join-animation-container-animate');
}

async function loadUsersFromBackend(page) {
    joinUsers = JSON.parse(await backend.getItem('users')) || [];
    console.log(`Users geladen (${page}):`, joinUsers);
}

async function loadTasksFromBackend() {
    editTasks = JSON.parse(await backend.getItem('tasks')) || [];
    console.log('Tasks geladen:', editTasks);
}


/**
 * 
 * @param {string} email - Email address to check 
 * @returns - Founded user with the entered email address
 */
function getUserFromEmailAddress(email) {
    return (joinUsers.find(u => u.email == email))
}


async function saveUsersToBackend() {
    joinUsers = [
        {
            "id": 0,
            "name": "Guest",
            "email": "guest@web.de",
            "password": "0000"
        },
        {
            "id": 1,
            "name": "Fritz Meier",
            "email": "f.meier@web.de",
            "password": "1111"
        },
        {
            "id": 2,
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "password": "2222"
        },
        {
            "id": 3,
            "name": "Helmut Dunz",
            "email": "h.dunz@web.de",
            "password": "3333"
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
            "category": "Back Office",
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
            "category": "Back Office",
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
            "category": "Sale",
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
            "category": "Sale",
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
            "category": "Sale",
            "assignedTo": [],
            "dueDate": "01.07.2023",
            "priority": "Low",
            "subTasks": [],
            "status": 'Done'
        }
    ];

    await backend.setItem('tasks', JSON.stringify(editTasks));
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







