/*function legalNotice() {
    document.getElementById('changeColorNotice').style.backgroundColor = "black";
    document.getElementById('changeColor').classList.add("backgorund");
    document.getElementById('changeColorboard').classList.add("backgorund");
    document.getElementById('changeColorNotice').classList.remove("backgorund")
    document.getElementById('contantSummary').classList.add("d-none");
    document.getElementById('contantBoard').classList.add("d-none");
    document.getElementById('contantAddToTask').classList.add("d-none");
    document.getElementById('contentNotice').classList.remove("d-none");
    let content = document.getElementById('contentNotice');
    content.innerHTML = showNotice();
}
*/

function showNotice() {
    removeBackgorund();
    document.getElementById('contacts-container').innerHTML = /*html*/`
    <div class="position-relative pad20" style="overflow: auto">
    <h1 class="h1n">
    Legal Notice
    </h1>
    <div class="subtitle">
    <h2 class="h2n">
        Subtitle
    </h2>
        <p class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iure ratione repellat minima, reiciendis odit
        quos modi recusandae nulla unde voluptatem tenetur mollitia voluptatibus enim, sapiente quis delectus tempore
        voluptates.
        Totam ut rerum officia inventore odit, debitis dolore, sed ipsum nam officiis similique blanditiis iste magnam
        quo maxime aliquid, cumque molestias incidunt! Natus in dolorum cumque facere, placeat aliquam necessitatibus!
        Obcaecati possimus illo magni cupiditate sapiente facere dicta doloremque, aliquam dolores architecto laudantium
        sit perspiciatis quod corrupti, at iusto? Magnam ratione delectus ipsum quae eos praesentium sunt cupiditate
        eaque voluptatem.
        Eos iste placeat itaque quisquam molestias architecto ratione. Saepe, reprehenderit libero enim mollitia facere
        itaque natus at ullam perferendis placeat distinctio, nam id vitae? Pariatur ullam neque ipsum id molestias.
        Accusantium excepturi aliquam totam in inventore, alias et. Vitae minima magni harum sequi hic mollitia expedita
        voluptatum illum culpa voluptatibus itaque laudantium a ipsum voluptate, similique labore cumque molestias
        delectus?</p>
    </div>
    <div class="subtitle">
    <h2 class="h2n">
        Subtitle
    </h2>
        <p class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iure ratione repellat minima, reiciendis odit
        quos modi recusandae nulla unde voluptatem tenetur mollitia voluptatibus enim, sapiente quis delectus tempore
        voluptates.
        Totam ut rerum officia inventore odit, debitis dolore, sed ipsum nam officiis similique blanditiis iste magnam
        quo maxime aliquid, cumque molestias incidunt! Natus in dolorum cumque facere, placeat aliquam necessitatibus!
        Obcaecati possimus illo magni cupiditate sapiente facere dicta doloremque, aliquam dolores architecto laudantium
        sit perspiciatis quod corrupti, at iusto? Magnam ratione delectus ipsum quae eos praesentium sunt cupiditate
        eaque voluptatem.
        Eos iste placeat itaque quisquam molestias architecto ratione. Saepe, reprehenderit libero enim mollitia facere
        itaque natus at ullam perferendis placeat distinctio, nam id vitae? Pariatur ullam neque ipsum id molestias.
        Accusantium excepturi aliquam totam in inventore, alias et. Vitae minima magni harum sequi hic mollitia expedita
        voluptatum illum culpa voluptatibus itaque laudantium a ipsum voluptate, similique labore cumque molestias
        delectus?</p>
    </div>
    <div class="back-arrow-black" onclick="renderDiv(); last()">
            <svg width="20" height="20" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.06825 9.95833H23.2917C24.1432 9.95833 24.8334 10.6486 24.8334 11.5C24.8334 12.3514 24.1432 13.0417 23.2917 13.0417H6.06825L13.2478 20.2212C13.8498 20.8232 13.8498 21.7992 13.2478 22.4011C12.6458 23.0031 11.6698 23.0031 11.0679 22.4011L1.58096 12.9142C0.799914 12.1332 0.799913 10.8668 1.58096 10.0858L11.0679 0.59887C11.6698 -0.00309756 12.6458 -0.00309813 13.2478 0.598869C13.8498 1.20084 13.8498 2.17682 13.2478 2.77879L6.06825 9.95833Z" fill="black"/>
            </svg>
        </div>
    </div>
    `;
}

function last() {
    document.querySelectorAll('.menu-list')[0].onclick();
}

function removeBackgorund(){
    document.getElementById('summaryId').classList.remove("color-background");
    document.getElementById('boardId').classList.remove("color-background");
    document.getElementById('addTaskId').classList.remove("color-background");
    document.getElementById('contactsId').classList.remove("color-background");
    document.getElementById('showNoticeId').classList.add("color-background");
    if (document.getElementById('content-add-to-task-box')) {
        document.getElementById('content-add-to-task-box').classList.add("d-none");
    }
}