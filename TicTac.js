let counter = 0;
let gameBoard = (function() {
    // 'use strict';

    let Board = ["", "", "", "", "","","","",""];

    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    // has array 
    return {
        Board: Board,
        clickSquare: function(player) {
            document.querySelectorAll('td').forEach(item => {
                item.addEventListener('click', event => {
                    // console.log(item.id.replace('_',''));
                    player.markSquare(item.id.replace('_',''));
                })
            });       
        },
        checkWin: function() {
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return Board[index] === "X"
                }) || combination.every(index => {
                    return Board[index] === "O"
            })
        })
        }
    }
})();

function displayWinner(winningPlayer){
    let playerDisplay = document.querySelector("#title");
    playerDisplay.textContent = winningPlayer;
}

function resetTitle() {
    let playerDisplay = document.querySelector("#title");
    playerDisplay.textContent = "Tic Tac Toe";
}


let displayController = (function() {
    'use strict';

    function updateView(square) {
            console.log(square);
            document.querySelector("#_"+square).textContent = gameBoard.Board[square];
            if (gameBoard.checkWin() && counter %2 === 0) {
               displayWinner("X's Win!");
            }
            else if (gameBoard.checkWin() && counter %2 !== 0) {
                displayWinner("O's Win!");
            }
            else if (counter == 8) {
                displayWinner("TIE!")
            }
            counter++;
    }
    return {
        updateView: updateView
    }
})();

function createPlayer(name) {
    return {
        name: name,
        markSquare(square) {
            if (gameBoard.Board[square] === "" && !gameBoard.checkWin()) {
                if (counter %2 === 0) {
                    gameBoard.Board[square] = "X";
                }
                else {
                    gameBoard.Board[square] = "O";
                }
                displayController.updateView(square);
            }
        }
    }
}

function gameFlow() {
    let player1 = createPlayer("Phil");
    gameBoard.clickSquare(player1);

    let resetGame = document.querySelector("#resetButton");
    resetGame.addEventListener('click', function() {
        for (let i =0; i<=8; i++) {
            document.querySelector("#_"+i).textContent="";
            gameBoard.Board[i] = "";
        }
        resetTitle();
        counter = 0;
    });
        
}
gameFlow();

