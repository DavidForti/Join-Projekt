// let joinUsers = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    await downloadFromServer();
    joinUsers = loadUsersFromBackend('signup.js');
    // joinUsers = JSON.parse(backend.getItem('users')) || [];
}


async function saveUsersToBackend() {
    await backend.setItem('users', JSON.stringify(joinUsers));
}


async function signUpNewUser() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (userExists(email)) {
        showErrorMessage('email-address-exists', 'email');
        return;
    }

    let user = getUserAsObject(name, email, password);
    joinUsers.push(user);
    await saveUsersToBackend();
    goToPage('index.html','Benutzer erfolgreich registriert.');
}

function getUserAsObject(name, email, password) {
    return {
        "name": name,
        "email": email,
        "password": password
    };
}


/**
 * 
 * @param {string} email - Email address to check 
 * @returns - True/False if user with email address exists
 */
function userExists(email) {
    // In combination with two negation operators !! you’ll receive a boolean value. 
    return !!(joinUsers.find(u => u.email == email))
}

/**
 * Hide displayed warning messages
 */
function resetWarningMsg() {
    document.getElementById('email-address-exists').classList.add('d-none');
}
