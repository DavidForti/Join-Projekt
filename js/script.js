let users = [];
let tasks = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg) {
        let msgbox = document.getElementById('msgbox');
        msgbox.classList.remove('d-none');
        msgbox.innerHTML = msg;
    }

    // await deleteAll();
    // await saveUsersToBackend();
    //await saveTasksToBackend();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    // tasks = JSON.parse(backend.getItem('tasks')) || [];

}


async function saveUsersToBackend() {
    users = [
        {
            "name": "Fritz Meier",
            "email": "f.meier@web.de",
            "password": "1234"
        },
        {
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "password": "4321"
        }
    ];

    await backend.setItem('users', JSON.stringify(users));
}

async function saveTasksToBackend() {
    tasks = [
        {
            "title": "Webdesign redesign",
            "description": "Modify the contents of the main website. Adjust the UI to the company's brand design.",
            "category": "Sales",
            "assignedTo": ['You', 'Maximilian Vogel', 'Fritz Meier'],
            "dueDate": "01.01.2023",
            "priority": "Medium",
            "subTasks": ['Create new icons']
        },
        {
            "title": "Price increase",
            "description": "Price increase Description...",
            "category": "Back Office",
            "assignedTo": ['You'],
            "dueDate": "01.02.2023",
            "priority": "High",
            "subTasks": ['Inform customers', 'Sales Manager Meeting']
        }
    ];

    await backend.setItem('tasks', JSON.stringify(tasks));
}


function goToSignUpPage() {
    window.location.href = 'signup.html';
}


async function deleteAll() {
    await backend.deleteItem('users');
    await backend.deleteItem('tasks');
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







