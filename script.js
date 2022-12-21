let allTasks = [];

setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}



