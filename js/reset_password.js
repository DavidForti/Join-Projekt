let email = "";
// let joinUsers = [];

// Change BASE_SERVER_URL for smallest_backend_ever
// setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');


async function onPageLoad() {
    email = getEmailUrlParameter();
    await init();

    // await downloadFromServer();
    // joinUsers = await getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}


function onSubmitResetPassword(event) {
    event.preventDefault();
    let formData = new FormData(event.target); // Create a FormData based on our Form Element in HTML

    let newPassword = formData.get('password');
    let confirmPassword = formData.get('confirm-password');

    if (newPassword != confirmPassword)
        showNotifyMessage('The passwords do not match');
    else
        showNotifyMessage('You reset your password');
}


function showNotifyMessage(message) {
    let notifyMsg = document.getElementById('notification-container-reset-password');
    notifyMsg.classList.remove('d-none');
    notifyMsg.classList.add('notification-container-animate');
    document.getElementById('notification-message').innerHTML = message;

    setTimeout(() => {
        document.getElementById('notification-container-reset-password').classList.add('d-none');
    }, 2500)
}


