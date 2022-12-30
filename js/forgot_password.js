async function onLoad() {
    await init();
}

async function onSubmitForgotPassword(event) {
    event.preventDefault(); // Prevent Default Form Action
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML

    let email = formData.get('email');

    if (!getUserFromEmailAddress(email))
        showNotifyMessage('Email Address not found !!');
    else {
        let response = await action(formData);
        if (response.ok)
            showNotifyMessage('An E-Mail has been sent to you');
        else
            showNotifyMessage('E-Mail was not sent !!');
    }
}


function action(formData) {
    const input = 'https://gruppe-411.developerakademie.net/reset_password/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(input, requestInit);
}

function showNotifyMessage(message) {
    let notifyMsg = document.getElementById('notification-container');
    notifyMsg.classList.remove('d-none');
    notifyMsg.classList.add('notification-container-animate');
    document.getElementById('notification-message').innerHTML = message;
    // window.location.href = 'reset_password/reset_password.html?email=test@web.de';

    setTimeout(() => {
        document.getElementById('notification-container').classList.add('d-none');
    }, 2500)
}


function resertPasswordOnlyForTesting() {
    showNotifyMessage('An E-Mail has been sent to you');
}
