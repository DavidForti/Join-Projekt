function renderWhatIsJoin() {
    let place = document.getElementById('contacts-container');
    place.classList.remove('d-none');
    place.innerHTML = /*html*/ `
    <div class="div-whatisjoin d-flex gap25 flex-column">
        <h1>Help</h1>
        <div>
            <h2>What Is Join?</h2>
            <p>Lorem ipsum  elit.ma, rerum nobis temporibus consequatur facilis excepturi ducimuss ut doloribus temporibus c Aut velit repudiandae facilis quam sit expedita quod neque, harum rerum placeat totam provident veniam tempora, reprehenderit voluptates fuga vitae hic dicta.</p>
        </div>
        <div class="d-flex gap25 flex-column">
            <h2>How To Use It</h2>
            <div class="d-flex gap25">
                <h2>
                    1.
                </h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus eos quos nemo labore eveniet pariatur est dignissimos laudantium numquam explicabo dolore esse ullam possimus ut, aliquid aperiam maxime ipsum cum.
                Numquam quibusdam ab rerum tibus minima, rerum nobis temporibus consequatur facilis excepturi ducimuss ut doloribus temporibus cumque qui id deserunt! Similique sit repudiandae fugit suscipit. Corrupti saepe incidunt sequi. Sit?</p>
            </div>
            <div class="d-flex gap25">
                <h2>
                    2.
                </h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus eos quos nemo labore eveniet pariatur est dignissimos laudantium numquam explicabo dolore esse ullam possimus ut, aliquid aperiam maxime ipsum cum.
                Numquam quibusdam ab rerum odit debitma, rerum nobis temporibus consequatur facilis excepturi ducimus hic reprehenderit quos porro officiis non pere qui id deserunt! Similique sit repudiandae fugit suscipit. Corrupti saepe incidunt sequi. Sit?</p>
            </div>
            <div class="d-flex gap25">
                <h2>
                    3.
                </h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus eos quos nemo labore eveniet pariatur est dignissimos laudantium numquam explicabo dolore esse ullam possimus ut, aliquid aperiam maxime ipsum cum.
                Numquam quibusdam ab rerum odit debitis earum suscipit deleniti, doloremque dolor accusantium obcaecati! Alias, delectus nam nobis sunt nulla eum deserunt ratione, quisquam ofugit suscipit. Corrupti saepe incidunt sequi. Sit?</p>
            </div>
        </div>
        <div class="back-arrow-black" onclick="renderDiv(), last()">
            <svg width="20" height="20" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.06825 9.95833H23.2917C24.1432 9.95833 24.8334 10.6486 24.8334 11.5C24.8334 12.3514 24.1432 13.0417 23.2917 13.0417H6.06825L13.2478 20.2212C13.8498 20.8232 13.8498 21.7992 13.2478 22.4011C12.6458 23.0031 11.6698 23.0031 11.0679 22.4011L1.58096 12.9142C0.799914 12.1332 0.799913 10.8668 1.58096 10.0858L11.0679 0.59887C11.6698 -0.00309756 12.6458 -0.00309813 13.2478 0.598869C13.8498 1.20084 13.8498 2.17682 13.2478 2.77879L6.06825 9.95833Z" fill="black"/>
            </svg>
        </div>
    </div>
    `;
}