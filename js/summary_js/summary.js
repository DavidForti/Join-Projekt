let taskInBoard = [0];
// let tasInProgress = [4];
// let feedBack = [];

function summary() {
    let contantSummary = document.getElementById('contantSummary');
    contantSummary.innerHTML = '';
    contantSummary.innerHTML = hedalineSummary();
    for (let i = 0; i < taskInBoard.length; i++) {
        const board = taskInBoard[i];
        contantSummary.innerHTML += progrsses(board);
    }
}

function hedalineSummary() {
    return /*html*/`
    <div class=head-of-summary>
        <h1 class="head-summary">Summary</h1>
        <img src="/img/verticalLine.png" class="vertical-Line">
        <img src="/img/nutshell.png" class="nutshell">
    </div>
    
    `;
}

function progrsses(board) {
    return/*html*/`
     <div class="boxes">
        <div class="box"> ${board}</div>
        <div class="box"> ${board}</div>
        <div class="box"> ${board}</div>
     </div>
    
    `;
}
