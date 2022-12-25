let users = [];
// let users = [
//     {
//         "name": "Fritz Meier",
//         "email": "f.meier@web.de",
//         "password": "1234"
//     },
//     {
//         "name": "Andreas Huber",
//         "email": "a.huber@web.de",
//         "password": "4321"
//     }
// ];


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

    // await deleteAllUsers();
    // await saveUsersToBackend();
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    
}


async function saveUsersToBackend() {
    await backend.setItem('users', JSON.stringify(users));
}

function goToSignUpPage() {
    window.location.href = 'signup.html';
}


async function deleteAllUsers() {
    await backend.deleteItem('users');
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







