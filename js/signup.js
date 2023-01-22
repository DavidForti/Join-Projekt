/**
 * Get Users from Backend-Server
 */
async function init() {
    initData();
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
    await saveToBackend('users', joinUsers);
    goToPage('index.html','Benutzer erfolgreich registriert.');
}


/**
 * Get User as JSON-Object
 * 
 * @param {string} name - Fullname of User
 * @param {string} email - Email of User
 * @param {string} password - Password of User
 * @returns {user} - User - JSON-Object
 */
function getUserAsObject(name, email, password) {
    let newUserId = getMaxUserId(); 
    return {
        "id": newUserId,
        "name": name,
        "email": email,
        "password": password
    };
}


/**
 * Get Max User-Id 
 * 
 * @returns {number} - 
 */
function getMaxUserId() {
    return joinUsers.length;
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
function resetWarningMessagesSignup() {
    resetWarningMessages(['email-address-exists']);
}
