let email;


async function onPageLoad() {
    email = getEmailFromUrlParameter();
    await init();

    // await downloadFromServer();
    // joinUsers = await getUsers();
}

function getEmailFromUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const emailAddress = urlParams.get('email');
    return emailAddress ;
}


function onSubmitResetUserPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML

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
    if (user) {
        joinUsers[user['id']]['password'] = newPassword;
        await saveToBackend('users',joinUsers);
        showNotifyMessage('You reset your password');
    } else
        showNotifyMessage('User not found');
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


