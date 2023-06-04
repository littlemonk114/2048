
var board;
var score = 0;
var rows = 4;
var columns = 4;
var end = false;
var moved = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            // a div is created, and tile is the div
            tile.id = r.toString() + "-" + c.toString();
            // set the id of the div
            let num = board[r][c];
            // get the num from the board
            updateTile(tile, num);
            document.getElementById("board").append(tile);
            // put the tiles into the board
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function haveMove() {
    if (hasEmptyTile()) {
        return true;
    }
    let same = false;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-1; c++) {
            if (board[r][c] == board[r][c+1]) {
                same = true;
            }
        }
    }
    for (let r = 0; r < rows-1; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == board[r+1][c]) {
                same = true;
            }
        }
    }
    return same;
}

function gameover() {
    document.getElementById("gameover").innerText = "Game Over";
    end = true;
    document.getElementById("board").style.opacity = 0.3;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";  // clear the class of the tiles, coz the class changes
    tile.classList.add("tile"); // add back the class "tile"
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}
// key up means when the button is released
document.addEventListener("keyup", (e) => {
    if (end == true) {
        return;
    }
    
    if (e.code == "ArrowLeft") {
        moved = false;
        slideLeft();
        if (moved == true) {
            setTwo();
        }
        
    }
    else if (e.code == "ArrowRight") {
        moved = false;
        slideRight();
        if (moved == true) {
            setTwo();
        }
    }
    else if (e.code == "ArrowUp") {
        moved = false;
        slideUp();
        if (moved == true) {
            setTwo();
        }
    }
    else if (e.code == "ArrowDown") {
        moved = false;
        slideDown();
        if (moved == true) {
            setTwo();
        }
    }
    document.getElementById("score").innerText = score;
    if (!haveMove()) {
        gameover();
    }
})

function filterZero(row) {
    return row.filter(num => num != 0); // it removes all the zeroes
}

function slide(row) {
    let originalrow = row;
    
    row = filterZero(row);
    // remove zeroes

    for (let i = 0; i < row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];

        }
    }
    // combine the same number


    row = filterZero(row);
    // remove zeroes again, coz the tiles will fill the empty space

    while (row.length < columns) {
        row.push(0);
    }
    // add zeroes back to the empty space at the end
    for (let i = 0; i < 4; i++) {
        if (originalrow[i] != row[i]) {
            moved = true;
        }
    }
    return row;

}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}