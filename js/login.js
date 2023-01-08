/**
 * Check if entered email address and password is correct
 * 
 * @returns 
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
            // console.log('Password korrekt:', user);
        } else {
            showErrorMessage('wrong-password', 'password');
        }
    }
}

function rememberMeIsChecked(user) {
    if (document.getElementById('rememberMeChk').checked)
        user['rememberMe'] = 1;
    else
        user['rememberMe'] = 0;
}


function loginAsGuest() {
    let guestUser = getUserFromEmailAddress('guest@web.de');
    saveToLocalStorage('joinUser', guestUser);
    goToMainPage();
}


function getLastJoinUser() {
    lastJoinUser = getFromLocalStorage('joinUser');
    if (lastJoinUser && lastJoinUser['rememberMe'] == 1)
        fillLastJoinUserInputFields(lastJoinUser);
}

function fillLastJoinUserInputFields(joinUser) {
    document.getElementById('email').value = joinUser['email'];
    document.getElementById('password').value = joinUser['password'];
    document.getElementById('rememberMeChk').checked = joinUser['rememberMe'];
}

function emtpyInputFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('rememberMeChk').checked = false;
}


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

function resetWarningMessagesLogin() {
  resetWarningMessages(['email-address-not-found','wrong-password']);
}





