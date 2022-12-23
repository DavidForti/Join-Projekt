let users = [];
// let users = [
//     {
//         "name": "Fritz Meier",
//         "email": "f.meier@web.de",
//         "password": "1234"
//     },
//     {
//         "name": "Andreas Huber",
//         "email": "a.huber@web.de",
//         "password": "4321"
//     }
// ];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


async function saveUsersToBackend() {
    await backend.setItem('users', JSON.stringify(users));
}






