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

    //await deleteAll();
    //await saveUsersToBackend();
    //await saveTasksToBackend();

    await downloadFromServer();

    await loadUsersFromBackend('script.js');
    await loadTasksFromBackend();

}

async function loadUsersFromBackend(page) {
    joinUsers = JSON.parse(await backend.getItem('users')) || [];
    console.log(`Users geladen (${page}):`, joinUsers);
}

async function loadTasksFromBackend() {
    editTasks = JSON.parse(await backend.getItem('tasks')) || [];
    console.log('Tasks geladen:', editTasks);
}


async function saveUsersToBackend() {
    joinUsers = [
        {
            "id": 0,
            "name": "Fritz Meier",
            "email": "f.meier@web.de",
            "password": "1234"
        },
        {
            "id": 1,
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "password": "4321"
        },
        {
            "id": 2,
            "name": "Helmut Dunz",
            "email": "h.duber@web.de",
            "password": "4321"
        }
    ];

    await backend.setItem('users', JSON.stringify(joinUsers));
}

async function saveTasksToBackend() {
    editTasks = [
        {
            "userId": 0,
            "title": "Webdesign redesign",
            "description": "Modify the contents of the main website. Adjust the UI to the company's brand design.",
            "category": "Sales",
            "assignedTo": [],
            "dueDate": "01.01.2023",
            "priority": "Medium",
            "subTasks": ['Create new icons']
        },
        {
            "userId": 1,
            "title": "Price increase",
            "description": "Price increase Description...",
            "category": "Back Office",
            "assignedTo": [],
            "dueDate": "01.02.2023",
            "priority": "High",
            "subTasks": ['Inform customers', 'Sales Manager Meeting']
        },
        {
            "userId": 2,
            "title": "Price increase",
            "description": "Price increase Description...",
            "category": "Back Office",
            "assignedTo": [],
            "dueDate": "01.02.2023",
            "priority": "High",
            "subTasks": ['Inform customers', 'Sales Manager Meeting']
        }
    ];

    await backend.setItem('tasks', JSON.stringify(editTasks));
}

async function deleteAll() {
    await backend.deleteItem('users');
    await backend.deleteItem('tasks');
}


function goToSignUpPage() {
    window.location.href = 'signup.html';
}

function goToPage(page, message) {
    window.location.href = `${page}?msg=${message}`;
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







