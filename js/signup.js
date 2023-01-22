/**
 * Document onLoad-Event
 */
async function init() {
    initData();
}


/**
 * Register New User and save to global Array joinUsers and to Backend
 * 
 */
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
 * @returns {Object} - User - JSON-Object
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
 * Get Max User-Id to save a new registered User
 * 
 * @returns {number} - Max User Id
 */
function getMaxUserId() {
    return joinUsers.length;
}


/**
 * Check if a User with the specified Email Address exists
 * 
 * @param {string} email - Email address to check 
 * @returns {Boolean} - True/False if user with email address exists
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