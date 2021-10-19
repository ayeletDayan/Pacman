'use strict'
const WALL = '&#128679';
const FOOD = '&#127849';
const POWERFOOD = '&#127856';
const EXTRAFOOD = '&#127826';
var gCreateExtraFood;
const EMPTY = ' ';
var gEmptyCells = [];
var audio = new Audio("sound/eating_sound.wav")
var winnAudio = new Audio("sound/game-new-level-sound-effect.mp3")
var lostAudio = new Audio("sound/game-lose.mp3")
var isWin = false
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var isPowerFood = false

function start() {
    var elPlay = document.querySelector('.button');
    elPlay.style.display = 'none';
    var elScore = document.querySelector('h2');
    elScore.style.display = 'block';
    var elVictory = document.querySelector('.victory');
    elVictory.style.display = 'none';
    var elBoard = document.querySelector('.board-container');
    elBoard.style.display = 'block';
    var elGmaeOver = document.querySelector('.game-over');
    elGmaeOver.style.display = 'none';
    if (isWin) winnAudio.pause();
    else lostAudio.pause();
    isWin = false    
    init()
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    gCreateExtraFood = setInterval(createExtraFood, 15000);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    audio.play()
}

function createExtraFood() {
    gEmptyCells = getEmptyCells(gBoard);
    var ranIdx = getRandomIntInt(0, gEmptyCells.length - 1)
    if (gEmptyCells.length === 0) return;
    var gEmptyCell = gEmptyCells[ranIdx];
    gBoard[gEmptyCell.i][gEmptyCell.j] = EXTRAFOOD;
    renderCell(gEmptyCell, EXTRAFOOD);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || j === 3 && i > 4 && i < SIZE - 2) board[i][j] = WALL;
        }
    }
    board[1][1] = POWERFOOD
    board[1][8] = POWERFOOD
    board[8][1] = POWERFOOD
    board[8][8] = POWERFOOD
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === 60) {
        isWin = true;
        gameOver();
    }
}

function gameOver() {
    clearInterval(gCreateExtraFood)
    clearInterval(gIntervalPowerFood)
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)    
    gGame.score = 0;
    audio.pause();
    document.querySelector('h2 span').innerText = gGame.score
    var elScore = document.querySelector('h2');
    elScore.style.display = 'none';
    var elPlay = document.querySelector('.button');
    elPlay.style.display = 'block';
    var elBoard = document.querySelector('.board-container');
    elBoard.style.display = 'none';
    if (isWin) {
        var elVictory = document.querySelector('.victory');
        elVictory.style.display = 'block';
        winnAudio.play()
    }
    else {
        lostAudio.play();
        var elGmaeOver = document.querySelector('.game-over');
        elGmaeOver.style.display = 'block';
    }
}

console.log(getEmptyCells(gBoard))
