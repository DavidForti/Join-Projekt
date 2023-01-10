function initContacts() {
    document.getElementById('contacts-container').style.zIndex = "9999";
    renderContacts();
}

function renderContacts() {
    let place = document.getElementById('contacts-container');
    place.innerHTML = /*html*/ `
    <div class="div-contacts">
        <div id="contact-list">
            <div class="absolute-contacts d-flex flex-column gap25"></div>
        </div>

        <div id="contact-view" class="d-flex flex-column">
            <div class="d-flex justify-content-center align-items-center mb20">
                <div class="d-flex gap25">
                    <h1>Contacts</h1>
                    <div class="blue-stripe"></div>
                    <p class="d-flex justify-content-center align-items-center">Better With A Team</p>
                </div>
            </div>
            <div id="contact-detail" class="position-relative">
                <div id="contact-content" class="absolute-contact-detail d-flex flex-column"></div>
                <div class="d-flex gap25 justify-content-center align-items-center new-contact">
                    <p>New Contact</p>
                    <svg width="20" height="20" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7476 16.8502C11.1453 16.8502 9.5789 16.3751 8.2466 15.4848C6.9143 14.5946 5.87589 13.3293 5.2627 11.8489C4.64951 10.3686 4.48907 8.73961 4.80167 7.16805C5.11427 5.59649 5.88588 4.15292 7.01891 3.01989C8.15194 1.88685 9.59551 1.11525 11.1671 0.802647C12.7386 0.490044 14.3676 0.650483 15.848 1.26368C17.3284 1.87687 18.5936 2.91527 19.4839 4.24758C20.3741 5.57988 20.8492 7.14625 20.8492 8.74859C20.8445 10.8958 19.9894 12.9537 18.4711 14.4721C16.9528 15.9904 14.8948 16.8455 12.7476 16.8502ZM12.7476 2.44734C11.5013 2.44734 10.2831 2.8169 9.24683 3.50929C8.21059 4.20168 7.40294 5.1858 6.92601 6.33721C6.44909 7.48861 6.3243 8.75558 6.56744 9.97791C6.81057 11.2002 7.41071 12.323 8.29196 13.2043C9.1732 14.0855 10.296 14.6856 11.5183 14.9288C12.7406 15.1719 14.0076 15.0471 15.159 14.5702C16.3104 14.0933 17.2945 13.2856 17.9869 12.2494C18.6793 11.2131 19.0489 9.99487 19.0489 8.74859C19.0489 7.0774 18.385 5.47465 17.2033 4.29293C16.0216 3.11122 14.4188 2.44734 12.7476 2.44734Z" fill="white"/>
                    <path d="M19.0478 30.353H0L0.162032 29.3088C0.558825 26.1625 2.07379 23.2639 4.43041 21.142C6.78702 19.02 9.82811 17.8163 12.9986 17.7505C14.6383 17.7361 16.265 18.0419 17.7875 18.6507C17.9008 18.6936 18.0043 18.7589 18.0917 18.8428C18.1791 18.9267 18.2488 19.0273 18.2964 19.1387C18.344 19.2501 18.3686 19.37 18.3688 19.4911C18.3689 19.6123 18.3446 19.7322 18.2974 19.8438C18.2501 19.9553 18.1808 20.0562 18.0936 20.1403C18.0064 20.2244 17.9031 20.29 17.79 20.3333C17.6768 20.3765 17.5561 20.3965 17.435 20.392C17.3139 20.3875 17.195 20.3586 17.0854 20.307C15.7907 19.7654 14.402 19.484 12.9986 19.4788C10.4471 19.5424 7.99185 20.4661 6.03111 22.1C4.07036 23.734 2.71909 25.9824 2.19644 28.4806H19.1018C19.3406 28.4806 19.5695 28.5755 19.7383 28.7443C19.9072 28.9131 20.002 29.1421 20.002 29.3808C20.002 29.6195 19.9072 29.8485 19.7383 30.0173C19.5695 30.1861 19.3406 30.281 19.1018 30.281L19.0478 30.353Z" fill="white"/>
                    <path d="M25.7987 15.9496C24.4084 15.9506 23.0481 16.354 21.882 17.1111C20.7159 17.8683 19.7939 18.9468 19.2274 20.2164C18.8072 21.1374 18.5922 22.1387 18.5973 23.151C18.5973 24.5753 19.0196 25.9677 19.8109 27.1519C20.6022 28.3362 21.7269 29.2592 23.0428 29.8043C24.3587 30.3493 25.8067 30.492 27.2036 30.2141C28.6006 29.9362 29.8837 29.2503 30.8909 28.2432C31.898 27.2361 32.5839 25.9529 32.8618 24.556C33.1396 23.159 32.997 21.711 32.452 20.3952C31.9069 19.0793 30.9839 17.9546 29.7996 17.1632C28.6153 16.3719 27.223 15.9496 25.7987 15.9496ZM29.3994 24.1232H26.7709V26.7517C26.7709 27.0096 26.6685 27.2569 26.4861 27.4392C26.3038 27.6215 26.0565 27.7239 25.7987 27.7239C25.5409 27.7239 25.2936 27.6215 25.1112 27.4392C24.9289 27.2569 24.8265 27.0096 24.8265 26.7517V24.0512H22.198C22.0703 24.0512 21.9439 24.0261 21.8259 23.9772C21.708 23.9283 21.6008 23.8567 21.5105 23.7665C21.4203 23.6762 21.3486 23.569 21.2998 23.4511C21.2509 23.3331 21.2258 23.2067 21.2258 23.079C21.2249 22.9055 21.2714 22.735 21.3602 22.5859C21.449 22.4368 21.5768 22.3147 21.7299 22.2328C21.8689 22.1429 22.0326 22.0989 22.198 22.1068H24.8265V19.5503C24.8265 19.2925 24.9289 19.0452 25.1112 18.8629C25.2936 18.6805 25.5409 18.5781 25.7987 18.5781C26.0565 18.5781 26.3038 18.6805 26.4861 18.8629C26.6685 19.0452 26.7709 19.2925 26.7709 19.5503V22.2508H29.3994C29.6573 22.2508 29.9045 22.3533 30.0869 22.5356C30.2692 22.7179 30.3716 22.9652 30.3716 23.223C30.3716 23.4809 30.2692 23.7282 30.0869 23.9105C29.9045 24.0928 29.6573 24.1952 29.3994 24.1952V24.1232Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    `;
    renderLetters();
    renderContact();
    renderContactDetail();
}

let test = ["Audi", "aack", "Christan", "bohn", "Pepi", "magnus", "Miriam", "Jeremiah", "Solomon", "matthew", "Noah", "Toasti"];
let letters = [];

function sort() {
    for (let x in test) {
        test[x] = test[x].charAt(0).toUpperCase() + test[x].slice(1);
    }
    test.sort();
}

function give() {
    for (let x in test) {
        if (!letters.includes(test[x].charAt(0))) {
            letters.push(test[x].charAt(0));
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
        <div class="d-flex flex-column gap10">
            <h1 class="grey-stripe">${letter}</h1>
            <div class="d-flex flex-column gap10" id="${letter}"></div>
        </div>
        `;
    }
}

function renderContact() {
    for (let x in test) {
        let id = test[x].charAt(0);
        let place = document.getElementById(id);
        place.innerHTML += /*html*/ `
        <div class="d-flex align-items-center gap25 c-p full-contact" onclick="colorContacts(${x})">
            <svg width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20.5" fill="#FF7A00" stroke="white"/>
            </svg>
            <div>
                <p>${test[x]}</p>
                <p class="c-b">test@test.com</p>
            </div>
        </div>
        `;
    }
}

let savemean;

function colorContacts(number) {
    let mean = document.querySelectorAll('.full-contact')[number];
    if (savemean) {
        savemean.classList.toggle('full-contact-effect');
    }
    mean.classList.toggle('full-contact-effect');
    savemean = mean;
}

function renderContactDetail() {
    let place = document.getElementById('contact-content');
    place.innerHTML = /*html*/ `
    <div class="d-flex align-items-center gap25">
        <svg width="100" height="100" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="20.5" fill="#FF7A00" stroke="white"/>
        </svg>
        <div>
            <h2>Seppi</h2>
            <p class="c-b">+ Add Task</p>
        </div>
    </div>
    <div class="d-flex gap25 mtb20">
        <p>Contact Information</p>
        <div class="d-flex gap5">
            <svg width="20" height="20" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.87121 22.0156L7.69054 24.9405L20.3337 4.10842C20.6203 3.63628 20.4698 3.02125 19.9977 2.73471L16.8881 0.847482C16.4159 0.56094 15.8009 0.711391 15.5144 1.18353L2.87121 22.0156Z" fill="#2A3647"/>
            <path d="M2.28614 22.9794L7.10547 25.9043L2.37685 28.1892L2.28614 22.9794Z" fill="#2A3647"/>
            </svg>
            <p>Edit Contact</p>
        </div>
    </div>
    <div class="d-flex flex-column gap25">
        <div class="gap10">
            <p class="b">E-Mail</p>
            <p>test@test.com</p>
        </div>
        <div class="gap10">
            <p class="b">Phone Number</p>
            <p>06232 21654</p>
        </div>
    </div>
    `;
}