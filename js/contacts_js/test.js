function renderContacts() {
    let place = document.getElementById('content');
    place.innerHTML = /*html*/ `
    <div class="div-contacts">
        <div id="contact-list">
            <div class="absolute-contacts"></div>
        </div>

        <div id="contact-view">
            <div class="d-flex justify-content-center align-items-center">
                <h1>Contacts</h1>
                <div>|</div>
                <p>Better With A Team</p>
            </div>
        </div>
    </div>
    `;
    renderLetters();
    renderContact();
}

let contacts = ["Audi", "aack", "Christan", "bohn", "Pepi", "magnus", "Miriam", "Jeremiah", "Solomon", "matthew", "Noah", "Toasti"];
let letters = [];

function sort() {
    for (let x in contacts) {
        contacts[x] = contacts[x].charAt(0).toUpperCase() + contacts[x].slice(1);
    }
    contacts.sort();
}

function give() {
    for (let x in contacts) {
        if (!letters.includes(contacts[x].charAt(0))) {
            letters.push(contacts[x].charAt(0));
        }
    }
}

function renderLetters() {
    sort();
    give();
    let place = document.querySelector('.absolute-contacts');
    for (let x in letters) {
        let letter = letters[x];
        place.innerHTML += /*html*/ `
        <h1 class="grey-stripe">${letter}</h1>
        <div id="${letter}"></div>
        `;
    }
}

function renderContact() {
    for (let x in contacts) {
        let id = contacts[x].charAt(0);
        let place = document.getElementById(id);
        place.innerHTML += /*html*/ `
        <div>${contacts[x]}</div>
        `;
    }
}