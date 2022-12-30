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
}


// async function getUsers() {
//     return JSON.parse(await backend.getItem('users')) || [];
// }

