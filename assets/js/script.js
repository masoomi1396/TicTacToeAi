const cells = document.querySelectorAll("#GameBoard>div");
const statusText = document.getElementById('Status');
const winnerBoard = document.getElementById("WinnerBoard");
const winnerStatusText = document.getElementById('WinnerStatus');
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let counterForPlayer = 0;
let gameFlag;
function init() {
    updateStatus();
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    gameFlag = false
}
updateStatus = () => {
    statusText.textContent = `${currentPlayer}'s turn`;
}
function cellClicked() {
    if (options[this.getAttribute("data-which-house")] == "" && currentPlayer != "O") {
        flagAi = false;
        updateCeller(this);
    }
    return
}
const changePlayer = () => {
    if (currentPlayer == 'X')
        currentPlayer = 'O'
    else
        currentPlayer = 'X'
    updateStatus();
}
function updateCeller(cell) {
    cell.setAttribute("data-is-full", true);
    options[cell.getAttribute("data-which-house")] = currentPlayer;
    cell.textContent = currentPlayer;
    currentBoard = options;
    counterForPlayer++;
    changePlayer();
    checkWinner();

}
function checkWinner() {
    for (let i = 0; i < winCondition.length; i++) {
        let A = winCondition[i][0];
        let B = winCondition[i][1];
        let C = winCondition[i][2];
        if (options[A] == options[B] && options[B] == options[C] && options[A] != "") {
            winnerBoard.classList.remove('hidden');
            winnerBoard.classList.add('flex');
            winnerStatusText.textContent = `The winner is ${options[A]}`;
            gameFlag = true;
        }
    }
    if (counterForPlayer == 9) {
        winnerBoard.classList.remove('hidden');
        winnerBoard.classList.add('flex');
        gameFlag = true;
        winnerStatusText.textContent = `No one wins !!!`;
    }
}
function checkAiWinner(player, board) {
    for (let i = 0; i < winCondition.length; i++) {
        let A = winCondition[i][0];
        let B = winCondition[i][1];
        let C = winCondition[i][2];
        if(player == 'X')
        {
            console.log("board : "+board)
            console.log("board A : "+A);
            console.log("board B : "+B);
            console.log("board C : "+C);
        }
        if (board[A] == board[B] && board[B] == board[C] && board[A] != "") {
            if (board[A] == player)
                return 1;
            else return -1;
        }
    }
    return 0;
}
function opponentAi() {
    let maxPoint = -1;
    let maxHouse = 0;
    flagAi = true;
    for (let j = 0; j < 9; j++) {
        if (options[j] == "") {
            options[j] = 'O';
            if (checkAiWinner('O', options) == 1) {
                maxPoint = 1;
                maxHouse = j;
            }
            else if (checkAiWinner('O', options) == 0) {
                if (maxPoint <= 0) {
                    maxPoint = 0;
                    maxHouse = j;
                }
            }
            else {
                if (maxPoint == -1) {
                    maxHouse = j;
                }
            }
            console.log("Max Point Is = " + maxPoint);
            options[j] = '';
        }
    }
    for (let counter = 0; counter < 9; counter++) {
        if (options[counter] == "") {
            options[counter] = 'X';
            console.log(options);
            console.log("winner is in = " + checkAiWinner('X', options));
            if (checkAiWinner('X', options) == 1) {
                console.log("hello");
                if (maxPoint < 1) {
                    maxHouse = counter;
                    maxPoint = 1;
                }
            }
            options[counter] = "";
        }
    }
    updateCeller(cells[maxHouse]);
}
function opponentAiStartGame() {
    if (currentPlayer == "O" && flagAi == false && gameFlag == false)
        opponentAi();
}
init();
setInterval(opponentAiStartGame, 1000);