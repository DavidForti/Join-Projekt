async function onLoad() {
    await init();
}

async function onSubmitForgotPassword(event) {
    event.preventDefault(); // Prevent Default Form Action
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML

    let email = formData.get('email');

    if (!getUserFromEmailAddress(email))
        showNotifyMessage('Email Address not found !!', true);
    else {
        sendForgotPasswordMail(formData);
    }
}

async function sendForgotPasswordMail(formData) {
    const timeStamp = Date.now();
    formData.set('timestamp',timeStamp);
    // TODO: Save timestamp to user-Object
    let response = await action(formData);
    if (response.ok)
        showNotifyMessage('An E-Mail has been sent to you', false);
    else
        showNotifyMessage('E-Mail was not sent !!', true);
}


function action(formData) {

    const input = 'https://gruppe-411.developerakademie.net/reset_password/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(input, requestInit);
}

function showNotifyMessage(message, hideImage) {
    let notifyMsg = document.getElementById('notification-forgot-password-container');
    notifyMsg.classList.remove('d-none');
    notifyMsg.classList.add('notification-container-animate');
    document.getElementById('notification-message').innerHTML = message;
    if (hideImage)
        document.getElementById('email-sent').classList.add('d-none');
    else
        document.getElementById('email-sent').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('notification-forgot-password-container').classList.add('d-none');
    }, 2500)
}


function resertPasswordOnlyForTesting() {
    showNotifyMessage('An E-Mail has been sent to you');
}
