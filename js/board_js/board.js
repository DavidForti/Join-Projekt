




function board(){
   let contantBoard = document.getElementById('contantBoard');
   contantBoard.innerHTML += headlineBoard(); 

}

function headlineBoard(){
    return /*html*/`
        <h1 class="headline-board">Board</h1>
    `;
}