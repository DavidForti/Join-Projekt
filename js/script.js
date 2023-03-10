// Join User Array from Backend
let joinUsers = [];
// Task Array from Backend
let editTasks = [];
// Contacts Array from Backend
let contacts = [];
// Task-Categories Array from Backend
let categories = [];

// BASE_SERVER_URL for smallest_backend_ever.
setURL('https://gruppe-411.developerakademie.net/smallest_backend_ever');


/**
 * Get Users from Backend-Server.
 * @async
 */
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('msg');

    if (message && message !== 'undefined') {
        showNotifyMessage('notification-login-container', message);
        emtpyInputFields(['email', 'password']);
    } else
        getLastJoinUser();

    await initData();
}


/**
 *  Get Data (Users, Tasks, Contacts) from Backend.
 *  @async
 */
async function initData() {
    // await deleteAll();
    // await saveUsersToBackend();
    // await saveTasksToBackend();
    // await saveContactsToBackend();
    // await saveCategoriesToBackend();

    await downloadFromServer();

    await loadUsersFromBackend('script.js');
    await loadTasksFromBackend('script.js');
    await loadContactsFromBackend('script.js');
    await loadCategoriesFromBackend('script.js');
}


/**
 * Animate Join Logo - Move from the middle to the top left.
 * In Mobile mode change from white to gray join logo.
 */
function animateLogo() {
    document.getElementById('join-animation-container').classList.add('join-animation-container-animate');
    document.getElementById('join-logo-gray').classList.add('join-logo-animate-gray');
    document.getElementById('join-logo-white').classList.add('join-logo-animate-white');
}


/**
 * Get Join Users from Backend
 * Save Users to global Variable joinUsers
 * 
 * @async
 * @param {string} page - For Looging purpose to get page from which this page is called. 
 */
async function loadUsersFromBackend(page) {
    joinUsers = JSON.parse(await backend.getItem('users')) || [];
    // console.log(`Users geladen (${page}):`, joinUsers);
}


/**
 * Get Join Tasks from Backend
 * Save Tasks to global Variable editTasks
 * 
 * @async
 * @param {string} page - For Looging purpose to get page from which this page is called. 
 */
async function loadTasksFromBackend(page) {
    editTasks = JSON.parse(await backend.getItem('tasks')) || [];
    // console.log(`Tasks geladen (${page}):`, editTasks);
}


/**
 * Get Join Contacts from Backend
 * Save Contacs to global Variable contacts
 * 
 * @async
 * @param {string} page - For Looging purpose to get page from which this page is called. 
 */
async function loadContactsFromBackend(page) {
    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    // console.log(`Contacts geladen (${page}):`, contacts);
}


/**
 * Get Join Task-Categories from Backend
 * Save Categories to global Variable categories
 * 
 * @async
 * @param {string} page - For Looging purpose to get page from which this page is called. 
 */
async function loadCategoriesFromBackend(page) {
    categories = JSON.parse(await backend.getItem('categories')) || [];
    // console.log(`Categories geladen (${page}):`, categories);
}


/**
 * Get Join User based on Email Address
 * 
 * @param {string} email - Email address to check 
 * @returns - Founded user with the entered email address
 */
function getUserFromEmailAddress(email) {
    return (joinUsers.find(u => u.email == email))
}


/**
 * 
 * @returns - Number of Contacts
 */
function getNewContactId() {
    return contacts.length;
}


/**
 * Get Contact-Object of specific Contact Id
 * 
 * @param {number} id - Contact-Id 
 * @returns {object} - Contact-Object
 */
function getContactFromId(id) {
    return contacts.find(contact => contact.id == id);
}


/**
 * Save Array Variable to Backend
 * 
 * @param {string} arrayName 
 * @param {Object[]} array 
 * @async
 */
async function saveToBackend(arrayName, array) {
    await backend.setItem(arrayName, JSON.stringify(array));
}


/**
 * Update User-Object Property
 * 
 * @param {Object} user - User-Object
 * @param {string} key - User property that is updated
 * @param {string} value - Value that is stored
 * @async
 */
async function updateUser(user, keyValueArray) {
    for (let i = 0; i < keyValueArray.length; i++) {
        const element = keyValueArray[i];
        joinUsers[user['id']][element['key']] = element['value'];
    }

    await saveToBackend('users', joinUsers);
}


/**
 * Save Example Users to Backend.
 * @async
 */
async function saveUsersToBackend() {
    joinUsers = [
        {
            "id": 0,
            "name": "Guest",
            "email": "guest@web.de",
            "password": "0000",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 1,
            "name": "Bernd Trossmann",
            "email": "mcptopgun@gmail.com",
            "password": "1111",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 2,
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "password": "2222",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        },
        {
            "id": 3,
            "name": "Helmut Dunz",
            "email": "h.dunz@web.de",
            "password": "3333",
            "rememberMe": 0,
            "resetPasswordTimestamp": 0
        }
    ];

    await backend.setItem('users', JSON.stringify(joinUsers));
}


/**
 * Save Example Tasks to Backend.
 * @async
 */
async function saveTasksToBackend() {
    editTasks = [
        {
            "id": 0,
            "userId": 1,
            "title": "Design Website Homepage",
            "description": "Create a visually appealing design for the website homepage, including all necessary elements such as a header, footer, and images.",
            "category": "Frontend",
            "assignedTo": [0, 1],
            "dueDate": "2023-02-10",
            "priority": "Urgent",
            "subTasks": ['Create new icons'],
            "status": 'To do'     // Es gibt noch die Werte: "In Progress", "Awaiting Feedback", "Done" ("To do" wird als Standart verwendet)
        },
        {
            "id": 1,
            "userId": 2,
            "title": "Develop Mobile App",
            "description": "Design and develop a mobile app that provides a seamless experience for users on both iOS and Android platforms.",
            "category": "Frontend",
            "assignedTo": [2],
            "dueDate": "2023-02-21",
            "priority": "Medium",
            "subTasks": ['Inform customers', 'Sales Manager Meeting'],
            "status": 'To do'
        },
        {
            "id": 2,
            "userId": 2,
            "title": "Refactor Code",
            "description": "Review the codebase and identify areas that need to be refactored to improve performance and maintainability.",
            "category": "Backend",
            "assignedTo": [1, 4, 5, 3, 2],
            "dueDate": "2023-05-30",
            "priority": "Low",
            "subTasks": ['Cristiano Ronaldo'],
            "status": 'Awaiting Feedback'
        },
        {
            "id": 3,
            "userId": 2,
            "title": "Implement Security Measures",
            "description": "Research and implement security measures to protect the website and user data from potential cyber threats.",
            "category": "Backend",
            "assignedTo": [0],
            "dueDate": "2023-03-12",
            "priority": "Medium",
            "subTasks": [],
            "status": 'Done'
        },
        {
            "id": 4,
            "userId": 3,
            "title": "Optimize Database",
            "description": "Analyze the database and implement optimizations to improve its performance and speed.",
            "category": "Backend",
            "assignedTo": [2],
            "dueDate": "2023-07-02",
            "priority": "Low",
            "subTasks": [],
            "status": 'Done'
        },
        {
            "id": 5,
            "userId": 2,
            "title": "Write Technical Documentation",
            "description": "Write comprehensive technical documentation for the website and mobile app, including API references and user guides.",
            "category": "Backend",
            "assignedTo": [1,4],
            "dueDate": "2023-05-13",
            "priority": "Medium",
            "subTasks": [],
            "status": 'In Progress'
        },
        {
            "id": 6,
            "userId": 1,
            "title": "Write Blog Posts",
            "description": "Write three blog posts related to the latest trends in the tech industry. Ensure the posts are well-researched, engaging, and SEO optimized.",
            "category": "Content",
            "assignedTo": [2,3],
            "dueDate": "2023-06-12",
            "priority": "Low",
            "subTasks": [],
            "status": 'Awaiting Feedback'
        },
        {
            "id": 7,
            "userId": 2,
            "title": "Update Website Content",
            "description": "Review and update all website content to ensure accuracy and relevance, and add new pages as needed.",
            "category": "Content",
            "assignedTo": [3,4,5],
            "dueDate": "2023-06-31",
            "priority": "Low",
            "subTasks": [],
            "status": 'To do'
        },
        {
            "id": 8,
            "userId": 1,
            "title": "Plan Marketing Campaign",
            "description": "Collaborate with the marketing team to plan a comprehensive digital marketing campaign to reach a wider audience and increase website traffic.",
            "category": "Marketing",
            "assignedTo": [5],
            "dueDate": "2023-06-22",
            "priority": "Urgent",
            "subTasks": [],
            "status": 'Done'
        }
    ];
    await backend.setItem('tasks', JSON.stringify(editTasks));
}


/**
 * Save Example Contacts to Backend.
 * @async
 */
async function saveContactsToBackend() {
    contacts = [
        {
            "id": 0,
            "name": "Bernd Trossmann",
            "email": "mcptopgun@gmail.com",
            "phone": "+49 6666 1111",
            "color": "rgba(7, 65, 92)"
        },
        {
            "id": 1,
            "name": "Andreas Huber",
            "email": "a.huber@web.de",
            "phone": "+49 4444 9999",
            "color": "rgba(3, 24, 139)"
        },
        {
            "id": 2,
            "name": "Helmut Dunz",
            "email": "h.dunz@web.de",
            "phone": "+49 2222 3333",
            "color": "rgba(149, 16, 197)"
        },
        {
            "id": 3,
            "name": "Lionel Messi",
            "email": "l.messi@web.de",
            "phone": "+41 111 1233",
            "color": "rgba(27, 150, 24)"
        },
        {
            "id": 4,
            "name": "Manuel Neuer",
            "email": "m.neuer@web.de",
            "phone": "+40 89 111 1233",
            "color": "rgba(19, 140, 153)"
        },
        {
            "id": 5,
            "name": "Cristiano Ronaldo",
            "email": "cr7@web.de",
            "phone": "+33 11 222 3345",
            "color": "rgba(188, 103, 153)"
        }
    ];

    await backend.setItem('contacts', JSON.stringify(contacts));
}


/**
 * Save Sample Categories to Backend.
 * @async
 */
async function saveCategoriesToBackend() {
    categories = { Backend: "#1FD7C1", Frontend: "#00FF00", Content: "#FC71FF", Marketing: "#B8860B" };
    await backend.setItem('categories', JSON.stringify(categories));
}


/**
 * Delete complete saved Backend Data !!.
 * @async
 */
async function deleteAll() {
    await backend.deleteItem('users');
    await backend.deleteItem('tasks');
    await backend.deleteItem('contacts');
    await backend.deleteItem('categories');
}


/**
 * Load / Show Web Page
 * 
 * @param {string} page - Web Page that is called.
 * @param {string} message - Message that is passed as a url parameter msg
 */
function goToPage(page, message) {
    window.location.href = `${page}?msg=${message}`;
}


/**
 * Save JSON-Object to Local Storage.
 * 
 * @param {string} key - Key name
 * @param {JSON-Object} value - JSON-Object 
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


/**
 * Get JSON-Object based on Key Name from Local Storage. 
 * 
 * @param {string} key - Key Name
 * @returns - JSON-Object based on Key Name
 */
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


/**
 * Show Notify Message with Move-Animation
 * 
 * @param {string} messageId - Element Id of Message Div Container
 * @param {string} message - Message which is displayed
 * @param {string} imageId - Element Id of the Image next to the Message
 * @param {Boolean} show - Show Image next to the message
 */
function showNotifyMessage(messageId, message, imageId, show) {
    let notifyMsg = document.getElementById(messageId);
    notifyMsg.classList.remove('d-none');
    document.getElementById('notification-message').innerHTML = message;
    notifyMsg.classList.add('notification-container-animate');
    if (imageId)
        showElement(imageId, show)

    setTimeout(() => {
        notifyMsg.classList.add('d-none');
    }, 2500)
}


/**
 * Show or Hide Element based on Element id. 
 * 
 * @param {string} elementId 
 * @param {boolean} show 
 */
function showElement(elementId, show) {
    let element = document.getElementById(elementId);
    if (show)
        element.classList.remove('d-none');
    else
        element.classList.add('d-none');
}


/**
 * Hide Input Fields.
 * 
 * @param {string[]} inputFields - Input Field Ids to hide
 */
function emtpyInputFields(inputFields) {
    for (let i = 0; i < inputFields.length; i++) {
        let inputField = document.getElementById(inputFields[i]);
        inputField.classList.add('d-none');
    }
}


/**
 * Hide displayed warning messages.
 */
function resetWarningMessages(messageIds) {
    for (let i = 0; i < messageIds.length; i++) {
        let messageId = document.getElementById(messageIds[i]);
        messageId.classList.add('d-none');
    }
}


/**
 * Show error message
 * 
 * @param {string} errorMessageElement - Error Message Element which is displayed
 * @param {string} elementSetFocus - Input Element that get's the focus
 */
function showErrorMessage(errorMessageElement, elementSetFocus) {
    document.getElementById(errorMessageElement).classList.remove('d-none');
    document.getElementById(elementSetFocus).focus();
}