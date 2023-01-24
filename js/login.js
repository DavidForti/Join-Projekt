/**
 * Check if entered email address and password is correct
 * 
 */
async function loginUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = getUserFromEmailAddress(email);

    if (!user) {
        showErrorMessage('email-address-not-found', 'email');
        return;
    } else {
        if (user.password == password) {
            rememberMeIsChecked(user);
            saveToLocalStorage('joinUser', user);
            goToMainPage();
        } else {
            showErrorMessage('wrong-password', 'password');
        }
    }
}


/**
 * Detect if remember me is checked to automatically fill email and password for next login
 * 
 * @param {Object} user 
 */
function rememberMeIsChecked(user) {
    if (document.getElementById('rememberMeChk').checked)
        user['rememberMe'] = 1;
    else
        user['rememberMe'] = 0;
}


/**
 * Guest Login Button was pressed
 */
function loginAsGuest() {
    let guestUser = getUserFromEmailAddress('guest@web.de');
    saveToLocalStorage('joinUser', guestUser);
    goToMainPage();
}


/**
 * Get last logged join user from local storage
 * and check if remember me was checked at last login
 */
function getLastJoinUser() {
    lastJoinUser = getFromLocalStorage('joinUser');
    if (lastJoinUser && lastJoinUser['rememberMe'] == 1)
        fillLastJoinUserInputFields(lastJoinUser);
}


/**
 * Auto fill email and password input fields
 * 
 * @param {Object} joinUser 
 */
function fillLastJoinUserInputFields(joinUser) {
    document.getElementById('email').value = joinUser['email'];
    document.getElementById('password').value = joinUser['password'];
    document.getElementById('rememberMeChk').checked = joinUser['rememberMe'];
}


/**
 * Empty email and password input fields and clear remember me checkbox
 */
function emtpyInputFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('rememberMeChk').checked = false;
}


/**
 * Go to main page
 */
function goToMainPage() {
    window.location.href = 'main.html';
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


/**
 * Reset Login Warning Messages and Hide them
 */
function resetWarningMessagesLogin() {
    resetWarningMessages(['email-address-not-found', 'wrong-password']);
}