
let pieces = [];
let result = '';
let gameover = false;
let currentPlayer;
let currentPiece;
let piecePickedFromSpot;
let moveCount = 0;
let validMove = false;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function preload() {
     pickSound = loadSound('./assets/pick.mp3');
     putSound = loadSound('./assets/put.mp3');
     gameoverSound = loadSound('./assets/gameover.mp3');
     errorSound = loadSound('./assets/error.mp3');
}

function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function setup() {
    if (isMobile()) {
        canvasSize = windowWidth - (windowWidth * 0.2);
        canvas = createCanvas(canvasSize, canvasSize)
        console.log("is mobile, canvasSize: ", canvasSize)
    } else {
        canvasSize = windowHeight - (windowHeight * 0.2);
        canvas = createCanvas(canvasSize, canvasSize)
        console.log("is not mobile, canvasSize: ", canvasSize)
    }

    currentPlayer = 'X' // X goes first
    drawGrid();
}

function draw() {
    for (let piece of pieces) {
        piece.over();
        piece.update();
        piece.show();
    }
}

function drawGrid() {
    background(BACKGROUND_COLOR);
    let w = width / 3;
    let h = height / 3;

    strokeWeight(2);
    stroke(STROKE_COLOR);
    for (let i = 1; i < 3; i++) {
        line(i * w, 0, i * w, height);
        line(0, i * h, width, i * h);
    }

    drawPieces();
}

// Actions are triggered by mouse press and release
function mousePressed(){
    if (gameover) {
        return;
    }

    if (!shouldDragPiece()) {
        return;
    }

    validMove = false;

    let spot = getSpotForClick();
    let spotCurrentValue = board[spot.col][spot.row];

    if (spotCurrentValue != currentPlayer) {
        console.log("invalid move, current player: ", currentPlayer)
        errorSound.play()
        return;
    }

    for (let piece of pieces) {
        if (piece.currentSpot.row == spot.row && piece.currentSpot.col == spot.col) {
            piece.pressed();
            currentPiece = piece;
            validMove = true;
            piecePickedFromSpot = spot;
            pickSound.play();
            break;
        }
    }
}

function mouseReleased() {
    if(currentPiece != null) {
        currentPiece.released();
    }

    if(gameover) {
        return;
    }

    let currentSpot = getSpotForClick();
    let spotCurrentValue = board[currentSpot.col][currentSpot.row];

    if (spotIsFilled(spotCurrentValue)) {
        return;
    }

    let pos = getSpotPositionForDraggable(currentSpot);
    if (shouldDragPiece()) {
        if(!validMove) {
            return;
        }
        board[piecePickedFromSpot.col][piecePickedFromSpot.row] = '';
        currentPiece.currentSpot = currentSpot;

        currentPiece.x = pos.yValueForSpot; // yes, we are swapping x and y values here because I'm dumb
        currentPiece.y = pos.xValueForSpot;
    } else {
        validMove = true;
        pieces.push(new Draggable(pos.yValueForSpot, pos.xValueForSpot, currentSpot, currentPlayer));
    }

    if (validMove) {
        putSound.play();
        board[currentSpot.col][currentSpot.row] = currentPlayer;
        moveCount++;
        currentPlayer = getNextPlayer();
    }

    if (debugMode) {
        // draw board
        for (let i = 0; i < board.length; i++) {
            console.log(board[i].join(' | '));
            if (i < board.length - 1) {
                console.log('---------');
            }
        }
    }
    drawGrid();
    drawPieces();
    checkWinner();
}

function shouldDragPiece()  {
    return moveCount >= 6;
}

function getSpotForClick() {
    let col = floor(mouseX / (width / 3));
    let row = floor(mouseY / (height / 3));

    if (debugMode)
        console.log("getSpotForClick(): current spot is on row: ", row, ", col: ",  col)

    return { row, col };
}

function spotIsFilled(spotCurrentValue) {
    return (spotCurrentValue != '');
}

function getNextPlayer() {
    return (currentPlayer === 'X') ? 'O' : 'X';
}

function drawPieces() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let spotCurrentValue = board[row][col];
            if (!spotIsFilled(spotCurrentValue)) {
                continue;
            }
            let spot = {};
            spot.row = row;
            spot.col = col;
            drawSpotFilling(spotCurrentValue, spot);
        }
    }
}

function drawSpotFilling(spotCurrentValue, spot) {
    let pos = getSpotPosition(spot);

    if (spotCurrentValue == 'X') {
        fill(X_COLOR);
    } else {
        fill(O_COLOR);
    }
    textSize(60);
    textAlign(CENTER, CENTER);
    noStroke();
    text(spotCurrentValue, pos.xValueForSpot, pos.yValueForSpot);
}

function getSpotPosition(spot) {
    let xValueForSpot = width / 3 * spot.row + width / 6;
    let yValueForSpot = height / 3 * spot.col + height / 6;
    return { xValueForSpot, yValueForSpot };
}

function getSpotPositionForDraggable(spot) {
    let xValueForSpot = width / 3 * spot.row;
    let yValueForSpot = height / 3 * spot.col;
    return { xValueForSpot, yValueForSpot };
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            winLine = { row: i, col: -1 };
            result = `${board[i][0]} wins!`;
            gameover = true;
        }
        // Check columns
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            winLine = { row: -1, col: i };
            result = `${board[0][i]} wins!`;
            gameover = true;
        }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        winLine = { row: 0, col: 0 };
        result = `${board[0][0]} wins!`;
        gameover = true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        winLine = { row: 0, col: 2 };
        result = `${board[0][2]} wins!`;
        gameover = true;
    }

    showWinnerText();
}

function showWinnerText() {
    if (gameover) {
        gameoverSound.play();
        textSize(32);
        fill('#333');
        textAlign(CENTER, CENTER);
        text(result, width / 2, height / 2);
    }
}
