class Game {
    constructor() {
        this.turn = true;
        // true means it's O's turn
        this.boxesArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.value = false;
        this.scoreFirst = 0;
        this.scoreSecond = 0;
        this.canIPlay = true;
    }

    restart() {
        this.turn = true;
        this.value = false;
        this.canIPlay=true;
        this.boxesArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    reset() {
        this.turn = true;
        // true means it's O's turn
        this.boxesArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.value = false;
        this.canIPlay=true;
        this.scoreFirst = 0;
        this.scoreSecond = 0;

    }


    checking(player1, player2) {
        // i will check if someone won
        let value1 = this.boxesArray.every(ar => ar[0] == "O");
        let value2 = this.boxesArray.every(ar => ar[1] == "O");
        let value3 = this.boxesArray.every(ar => ar[2] == "O");
        let value4 = this.boxesArray.every(ar => ar[0] == "X");
        let value5 = this.boxesArray.every(ar => ar[1] == "X");
        let value6 = this.boxesArray.every(ar => ar[2] == "X");
        let value7 = this.boxesArray.some(ar => ar[0] === "X" && ar[1] === "X" && ar[2] === "X");
        let value8 = this.boxesArray.some(ar => ar[0] === "O" && ar[1] === "O" && ar[2] === "O");
        let value9 = [this.boxesArray[0][0], this.boxesArray[1][1], this.boxesArray[2][2]].every(x => x == "O");
        let value10 = [this.boxesArray[0][2], this.boxesArray[1][1], this.boxesArray[2][0]].every(x => x == "O");
        let value11 = [this.boxesArray[0][0], this.boxesArray[1][1], this.boxesArray[2][2]].every(x => x == "X");
        let value12 = [this.boxesArray[0][2], this.boxesArray[1][1], this.boxesArray[2][0]].every(x => x == "X");
        this.value = value1 | value2 | value3 | value4 | value5 | value6 | value7 | value8 | value9 | value10 | value11 | value12;

        if (this.value) {
            if (value1 | value2 | value3 | value8 | value9 | value10) player1.innerHTML++;
            else player2.innerHTML++;
            document.getElementById("winner").innerHTML = `We have a winner!😎🎇`;

            // game has to stop when someone wins, the other boxes will stop being clickable
            this.canIPlay = false;
        }
        console.log("can you play? ", this.canIPlay);


    }

    // fillArray creates the this.boxesArray matrix

    fillArray(i, OX) {
        if (i < 3) {
            i % 3 === 0 ? this.boxesArray[0][0] = OX :
                i % 3 === 1 ? this.boxesArray[0][1] = OX :
                this.boxesArray[0][2] = OX
        } else if (i < 6) {
            i % 3 === 0 ? this.boxesArray[1][0] = OX :
                i % 3 === 1 ? this.boxesArray[1][1] = OX :
                this.boxesArray[1][2] = OX
        } else {
            i % 3 === 0 ? this.boxesArray[2][0] = OX :
                i % 3 === 1 ? this.boxesArray[2][1] = OX :
                this.boxesArray[2][2] = OX
        }

        console.log(this.boxesArray);
    }
}

// making an instance of a game 

let newGame = new Game();

// -----


let startTheGame = document.getElementsByClassName("start")[0];
let boxes = document.getElementsByClassName("box");
let scorePlayer1 = document.getElementsByClassName("score")[0];
let scorePlayer2 = document.getElementsByClassName("score")[1];


function starting() {
    // Starting the Game - clicking O and X
    let player1 = prompt("What's the name of the first player?");
    let player2 = prompt("What's the name of the second player?");
    document.getElementById("#player1").innerHTML = player1;
    document.getElementById("#player2").innerHTML = player2;
    document.getElementsByClassName("announcement1")[0].innerHTML = `The player to be first is ${player1}`;
    document.getElementsByClassName("announcement2")[0].innerHTML = `The player to be second is ${player2}`;

    scorePlayer1.innerHTML = newGame.scoreFirst;
    scorePlayer2.innerHTML = newGame.scoreSecond;

    if (newGame.canIPlay) {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener("click", () => {
                if (newGame.canIPlay) {
                    if (newGame.turn && boxes[i].innerHTML.length==0) {
                        boxes[i].innerHTML = "O";
                        newGame.fillArray(i, boxes[i].innerHTML);
                        newGame.checking(scorePlayer1, scorePlayer2)
                    } else if (!newGame.turn && boxes[i].innerHTML.length==0) {
                        boxes[i].innerHTML = "X";
                        newGame.fillArray(i, boxes[i].innerHTML);
                        newGame.checking(scorePlayer1, scorePlayer2)
                    }
                }
                newGame.turn = !newGame.turn;
            })
        }
    }





}

// play more

document.getElementsByClassName("restart")[0].addEventListener("click", () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
    }
    document.getElementById("winner").innerHTML = ``;
    newGame.restart()
    console.log(` the newGame instance after next round will start to be`, newGame)
})



// Resetting the game


document.getElementById("reset").addEventListener("click", () => {

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
    }
    document.getElementById("winner").innerHTML = ``;
    scorePlayer1.innerHTML = 0;
    scorePlayer2.innerHTML = 0;
    newGame.reset();
})


startTheGame.addEventListener("click", starting, {
    once: true
});  