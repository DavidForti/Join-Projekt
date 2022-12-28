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
            window.location.href = 'main.html';
            // console.log('Password korrekt:', user);
        } else {
            showErrorMessage('wrong-password', 'password');
        }
    }
}


function loginAsGuest() {
    alert('LoginAsGuest-Function');
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


async function onSubmit(event) {
    event.preventDefault(); // Prevent Default Form Action
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML
    let response = await action(formData);
    if (response.ok)
        alert('Email was sent!');
    else
        alert('Email NOT sent!');
}

function action(formData) {
    const input = 'https://gruppe-411.developerakademie.net/reset_password/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(input, requestInit);
}

function forgotPassword() {
    window.location.href = 'forgot_password.html';
}

function resertPasswordOnlyForTesting() {
    window.location.href = 'reset_password/reset_password.html?email=test@web.de';
}

