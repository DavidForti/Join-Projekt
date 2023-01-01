let urlParams;
let email;
let timeStampFromEmail;


async function onPageLoad() {
    urlParams = getUrlParameter();
    email = urlParams.get('email');
    timeStampFromEmail = urlParams.get('timestamp');
    await init();
}


function getUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}


function onSubmitResetUserPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target); // Create FormData based on Form Element in HTML
    let newPassword = formData.get('password');
    let confirmPassword = formData.get('confirm-password');

    if (!email) {
        showNotifyMessage('Email address not available !!');
        return;
    }

    if (newPassword == confirmPassword)
        resetUserPassword(newPassword);
    else
        showNotifyMessage('The passwords do not match !!');
}


async function resetUserPassword(newPassword) {
    let user = getUserFromEmailAddress(email);

    if (!user)
        showNotifyMessage('User not found');
    else if (!checkTimestampIsValid(user)) {
        showNotifyMessage('Email link is no longer valid');
        goToPage('forgot_password.html');
    } else {
        let userProperties = [];
        userProperties.push({ 'key': 'password', 'value': newPassword });
        userProperties.push({ 'key': 'resetPasswordTimestamp', 'value': 0 });
        await updateUser(user, userProperties);
        showNotifyMessage('You reset your password');
    }
}


function checkTimestampIsValid(user) {
    if (user['resetPasswordTimestamp'] == timeStampFromEmail && timeStampIsInTime())
        return true;
    else
        return false;
}


function timeStampIsInTime() {
    let timeDifference = new Date(Date.now() - timeStampFromEmail).getMinutes();
    if (timeDifference <= 10)
        return true;
    else
        return false;
}


function showNotifyMessage(message) {
    let notifyMsg = document.getElementById('notification-reset-password-container');
    notifyMsg.classList.remove('d-none');
    notifyMsg.classList.add('notification-container-animate');
    document.getElementById('notification-message').innerHTML = message;

    setTimeout(() => {
        document.getElementById('notification-reset-password-container').classList.add('d-none');
    }, 2500)
}