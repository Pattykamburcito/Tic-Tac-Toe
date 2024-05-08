const buttons = document.querySelectorAll('#cell');
const resetButtons = document.querySelectorAll('.reset');
const userWinDialogWindow = document.querySelector("#userWinDialog");
const botWinDialogWindow = document.querySelector("#botWinDialog");
const tieDialogWindow = document.querySelector("#tieDialog");

let Gameboard = ['', '', '', '','', '', '', '', ''];
let firstPlayerTurn = true;
let winnerCount = 0; //max 1 

console.log(Gameboard); // debbugging

buttons.forEach((button) => {
    button.addEventListener('click', function (){
        console.log('win count ' + winnerCount);
        const addX = document.createElement('p'); // X or O are added to p
        addX.textContent = 'X'
        addX.classList.add('addX');

        //to check if there is X or O in the cell
      if (!button.querySelector('p')){
        button.appendChild(addX);
      }

      let cellNumber = button.querySelector('span').textContent; //cell numbering is added to span which is hidden to user
      userTurn(cellNumber);
      winChecker(); //check for win situations after user's turn
      firstPlayerTurn = false;

      //call botTurn only if there is no winner yet and there are empty cells left
      if((winnerCount == 0) && (areEmptyCellsLeft())){
        botTurn();
        firstPlayerTurn = true; //reset first player after bot's turn
        winChecker();
      }

    })
})

function userTurn (cellNumber){
    let userChoice = cellNumber - 1; //Array counts starts from 0
    console.log(userChoice);

    //check if '' is empty or not
   if (Gameboard[userChoice] == ''){
    Gameboard[userChoice] += 'X'
   }
   console.log('User: ' + Gameboard); //debugging
   firstPlayerTurn = true; //update firstPlayerTurn after user's turn
   console.log('User ' + firstPlayerTurn);
   return{userChoice}
}

function botTurn() {
    let botChoice;

    do {
        botChoice = Math.floor(Math.random() * 9);
    } while (Gameboard[botChoice] !== '');

    Gameboard[botChoice] += 'O';

    buttons.forEach((button) => {
        const span = button.querySelector('span');
        if(span.textContent == botChoice + 1) {
            //update the corresponding cell to O
            const addO = document.createElement('p'); //X or O are added to p
            addO.textContent = 'O';
            addO.classList.add('addO');
            button.appendChild(addO);

        }
    })
    console.log('Bot: ' + Gameboard); //debugging
}

function winChecker() {
    //Check for win or tie condition after each turn
    if(checkWin('X')) {
        winnerCount ++;
        console.log("User wins"); //debugging
        userWinDialogWindow.showModal();
        return {winnerCount, firstPlayerTurn};
    } else if (checkWin('O')){
        winnerCount ++;
        console.log("Bot wins"); //debugging
        botWinDialogWindow,showModal();
        return {winnerCount,firstPlayerTurn};
    }

    return {winnerCount};
}

function checkWin(symbol) {
    //horizontal wins
    if ((Gameboard[0] === symbol && Gameboard[1] === symbol && Gameboard[2] === symbol) ||
        (Gameboard[3] === symbol && Gameboard[4] === symbol && Gameboard[5] === symbol) ||
        (Gameboard[6] === symbol && Gameboard[7] === symbol && Gameboard[8] === symbol)) {
        return true;
        } 

    //Vertical wins

    if ((Gameboard[0] === symbol && Gameboard[3] === symbol && Gameboard[6] === symbol) ||
    (Gameboard[1] === symbol && Gameboard[4] === symbol && Gameboard[7] === symbol) ||
    (Gameboard[2] === symbol && Gameboard[5] === symbol && Gameboard[8] === symbol)) {
    return true;
    } 
//Diagonal wins

if ((Gameboard[0] === symbol && Gameboard[4] === symbol && Gameboard[8] === symbol) ||
        (Gameboard[2] === symbol && Gameboard[4] === symbol && Gameboard[6] === symbol)) {
        return true;
        } 
   return false;
    }

    function areEmptyCellsLeft() {
        return Gameboard.includes('');
    }

    resetButtons.forEach((reseting) =>{
        reseting.addEventListener('click', function(){
            reset()
            if (userWinDialogWindow) {
                userWinDialogWindow.close();
            }

            if (botWinDialogWindow) {
                botWinDialogWindow.close();
            }

            if (tieDialogWindow) {
                tieDialogWindow.close();
            }
        })
    })

    function reset() {
        Gameboard = ['', '', '', '', '', '', '', '', ''];
        buttons.forEach((button) => {  
        if (button.querySelector('.addO')) { //check if addO exists
            button.querySelector('.addO').remove(); //remove the addO element
        }

       if (button.querySelector('.addX')) {
           button.querySelector('.addX').remove();
       }
    });
    firstPlayerTurn = true;
    winnerCount = 0;
    return { firstPlayerTurn, Gameboard, winnerCount}
}