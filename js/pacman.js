'use strict'
var gPacmanImg = '<img src="emoji/pacman emoji.jpg">';
var gPacman;
var gIntervalPowerFood

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        // isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = gPacmanImg
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if ((nextCell === POWERFOOD) && isPowerFood) return;
    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === EXTRAFOOD) updateScore(10);
    if (nextCell === POWERFOOD) {
        updateScore(1)
        isPowerFood = true
        var icon = '<img src="emoji/ghost.jpg">'
        changGhostIcon(icon)
        setTimeout(() => {
            isPowerFood = false
            icon = '&#128123'
            changGhostIcon(icon)
            moveGhosts()
        }, 5000)
    }

    var i = nextLocation.i;
    var j = nextLocation.j;
    console.log(i, j)
    if (nextCell === gGhost && isPowerFood) {
        updateScore(1);
        eatGhosts(i, j);
        setTimeout(() => {
            createGhost(gBoard)
            moveGhosts() 
        }, 5000);
    }
    else if (nextCell === gGhost && !isPowerFood) {
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = gPacmanImg;
    // update the dom
    renderCell(gPacman.location, gPacmanImg);
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacmanImg = '<img src="emoji/pacman-up.jpg">';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gPacmanImg = '<img src="emoji/pacman-down.jpg">';
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gPacmanImg = '<img src="emoji/pacman-right.jpg">';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gPacmanImg = '<img src="emoji/pacman-left.jpg">';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}