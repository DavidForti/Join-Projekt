function legalNotice() {
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

function showNotice() {
    return /*html*/`
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
        `;
}