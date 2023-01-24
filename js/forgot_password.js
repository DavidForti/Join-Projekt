/**
 * Document on load function to get data from backend
 * 
 * @async
 */
async function init() {
    await initData();
}


/**
 * Function which get the email address from form data on submit as event 
 * 
 * @param {Object} event -  Form Object
 * @async
 */
async function onSubmitForgotPassword(event) {
    event.preventDefault(); // Prevent Default Form Action
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML

    let email = formData.get('email');
    let user = getUserFromEmailAddress(email);

    if (!user)
        showNotifyMessage('notification-forgot-password-container', 'Email Address not found !!', 'email-sent', false);
    else {
        sendForgotPasswordMail(formData, user);
    }
}


/**
 * Get Form Data - Add timestamp value
 * Call the function action() to send the mail with send_mail.php with post-method
 * 
 * @param {Object} formData - Form data
 * @param {Object} user - User-Object to update with the timestamp value 
 * @async
 */
async function sendForgotPasswordMail(formData, user) {
    const timeStamp = Date.now();
    formData.set('timestamp', timeStamp.toString());
    let response = await action(formData);
    if (response.ok) {
        await updateUser(user, [{ 'key': 'resetPasswordTimestamp', 'value': timeStamp }]);
        showNotifyMessage('notification-forgot-password-container', 'An E-Mail has been sent to you', 'email-sent', true);
    }
    else
        showNotifyMessage('notification-forgot-password-container', 'E-Mail was not sent !!', 'email-sent', false);
}


/**
 * Send mail with send_mail.php with post-method
 * 
 * @param {Object} formData - From data to send
 * @returns {Object} - Response 
 */
function action(formData) {
    const input = 'https://gruppe-411.developerakademie.net/reset_password/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };
    return fetch(input, requestInit);
}


/* TESTING */
function resertPasswordOnlyForTesting() {
    showNotifyMessage('notification-forgot-password-container', 'An E-Mail has been sent to you', 'email-sent', true);
}
