let taskInBoard = [5,4,5];
// let tasInProgress = [4];
// let feedBack = [];

function summary() {
   let contantSummary =  document.getElementById('contantSummary');
   contantSummary.innerHTML = '';
    for (let i = 0; i < taskInBoard.length; i++) {
        const board = taskInBoard[i];
        // const progress = tasInProgress[i];
        // const feedBacks = feedBack[i];
        contantSummary.innerHTML = /*html*/`
            <div class=head-of-summary>
                <h1 class="head-summary">Summary</h1>
            </div>
            
        `;

    }
}

