async function init() {
    await initData();
}

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
