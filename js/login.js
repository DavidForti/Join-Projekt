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
            saveToLocalStorage('joinUser', user);
            goToMainPage();
            // console.log('Password korrekt:', user);
        } else {
            showErrorMessage('wrong-password', 'password');
        }
    }
}


function loginAsGuest() {
    let guestUser = getUserFromEmailAddress('guest@web.de');
    saveToLocalStorage('joinUser', guestUser);
    goToMainPage();
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


/**
 * Hide displayed warning messages
 */
function resetWarningMsg() {
    document.getElementById('email-address-not-found').classList.add('d-none');
    document.getElementById('wrong-password').classList.add('d-none');
}



