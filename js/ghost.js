'use strict'
var gGhost = '&#128123';

var gGhosts = []
var eatenGhosts = []
var gIntervalGhosts;

function createGhost(board) {

    var i = getRandomIntInt(1, 8)
    var j = getRandomIntInt(1, 8)
    var ghost = {
        location: {
            i: i,
            j: j
        },
        currCellContent: FOOD,
        ghostIcon: gGhost
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = gGhost
}


function changGhostIcon(icon) {
    gGhost = icon
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === gGhost) return;
    if ((nextCell === gPacmanImg) && !isPowerFood) {
        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = gGhost;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${gGhost}</span>`
}

function eatGhosts(idxI, idxJ) {
    for (var k = 0; k < 2; k++) {
        if ((gGhosts[k].location.i === idxI) && (gGhosts[k].location.j === idxJ)) {
            console.log(gGhosts[k])
            eatenGhosts = gGhosts[k]
            console.log(eatenGhosts)
            gGhosts.splice(k, 1)
            console.log(gGhosts)
            break
        }
    }
}