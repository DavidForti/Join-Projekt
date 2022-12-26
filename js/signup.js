let joinUsers = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    await downloadFromServer();
    joinUsers = JSON.parse(backend.getItem('users')) || [];
}


async function saveUsersToBackend() {
    await backend.setItem('users', JSON.stringify(joinUsers));
}


function goToLoginPage() {
    window.location.href = 'index.html';
}

async function signUpNewUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (getUserFromEmailAddress(email)) {
        showErrorMessage('email-address-exists','email');
        return;
    }

    let user = {
                "name": name,
                "email": email,
                "password": password
    }

    joinUsers.push(user);
    await saveUsersToBackend();
    window.location.href='index.html?msg=Benutzer erfolgreich registriert';
}


/**
 * 
 * @param {string} email - Email address to check 
 * @returns - Founded user with the entered email address
 */
function getUserFromEmailAddress(email) {
    return (joinUsers.find(u => u.email == email))
}

/**
 * Show error message
 * 
 * @param {string} errorMessageElement - Error Message Element which is displayed
 * @param {string} elementSetFocus - Input Element that get's the focus
 */
// function showErrorMessage(errorMessageElement, elementSetFocus) {
//     document.getElementById(errorMessageElement).classList.remove('d-none');
//     document.getElementById(elementSetFocus).focus();
// }


