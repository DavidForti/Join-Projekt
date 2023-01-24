let urlParams;
let email;
let timeStampFromEmail;


/**
 * Document on load function to get url email and timestamp parameter 
 * for resetting the user password
 * 
 * @async
 */
async function init() {
    urlParams = getUrlParameter();
    email = urlParams.get('email');
    timeStampFromEmail = urlParams.get('timestamp');
    await initData();
}


/**
 * Get url parameter as key value pair
 * @returns - Array of key value url parameter
 */
function getUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}


/**
 * Function which get reset user password form data on submit as event 
 * 
 * @param {Object} event - Form data
 */
function onSubmitResetUserPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target); // Create FormData based on Form Element in HTML
    let newPassword = formData.get('password');
    let confirmPassword = formData.get('confirm-password');

    if (!email) {
        showNotifyMessage('notification-reset-password-container', 'Email address not available !!');
        return;
    }

    if (newPassword == confirmPassword) {
        resetUserPassword(newPassword);
    }
    else
        showNotifyMessage('notification-reset-password-container', 'The passwords do not match !!');
}


/**
 * Reset user password
 * 
 * @param {string} newPassword 
 * @async
 */
async function resetUserPassword(newPassword) {
    let user = getUserFromEmailAddress(email);

    if (!user)
        showNotifyMessage('notification-reset-password-container', 'User not found !!');
    else if (!checkTimestampIsValid(user)) {
        showNotifyMessage('notification-reset-password-container', 'Email link is no longer valid !!');
        emtpyInputFields(['password', 'confirm-password']);
    } else {
        let userProperties = [];
        userProperties.push({ 'key': 'password', 'value': newPassword });
        userProperties.push({ 'key': 'resetPasswordTimestamp', 'value': 0 });
        await updateUser(user, userProperties);
        showNotifyMessage('notification-reset-password-container', 'You reset your password');
        setTimeout(() => {
            goToPage('../index.html');
        }, 2000);
    }
}


/**
 * Check if timestamp is within the valid range for resetting the user password
 * 
 * @param {*} user 
 * @returns {boolean} - True/False
 */
function checkTimestampIsValid(user) {
    if (user['resetPasswordTimestamp'] == timeStampFromEmail && timeStampIsInTime())
        return true;
    else
        return false;
}


/**
 * Calc time difference between now and the timestamp from the url parameter
 * 
 * @returns {boolean} - True/False
 */
function timeStampIsInTime() {
    let timeDifference = new Date(Date.now() - timeStampFromEmail).getMinutes();
    if (timeDifference <= 10)
        return true;
    else
        return false;
}