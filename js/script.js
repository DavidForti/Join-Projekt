let users = [];

// Change BASE_SERVER_URL for smallest_backend_ever
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

/**
 * Get Users from Backend-Server
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}



