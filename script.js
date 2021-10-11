class Game {
    constructor() {
        this.score = 0;
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
    }

    restart() {
        this.turn = true;
        this.value = false;
        this.boxesArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }


    checking(player1,player2) {
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

        console.log("after reset the board is ", this.boxesArray);
        if (this.value) {
            if (value1 | value2 | value3 | value8 | value9 | value10) player1.innerHTML++;
            else player2.innerHTML++;
        }

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
    }
}

let startTheGame = document.getElementsByClassName("start")[0];
let boxes = document.getElementsByClassName("box");




function starting() {

    // Starting the Game - clicking O and X
    let player1 = prompt("What's the name of the first player?");
    let player2 = prompt("What's the name of the second player?");
    document.getElementById("#player1").innerHTML = player1;
    document.getElementById("#player2").innerHTML = player2;
    document.getElementsByClassName("announcement1")[0].innerHTML=`The player to be first is ${player1}`;
    document.getElementsByClassName("announcement2")[0].innerHTML=`The player to be second is ${player2}`;
    let newGame = new Game();
    let scorePlayer1 = document.getElementsByClassName("score")[0];
    let scorePlayer2 = document.getElementsByClassName("score")[1];
    scorePlayer1.innerHTML = newGame.scoreFirst;
    scorePlayer2.innerHTML = newGame.scoreSecond;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", () => {
            if (newGame.turn) {
                boxes[i].innerHTML = "O";
                newGame.fillArray(i, boxes[i].innerHTML);
                newGame.checking(scorePlayer1,scorePlayer2);
            } else {
                boxes[i].innerHTML = "X";
                newGame.fillArray(i, boxes[i].innerHTML);
                newGame.checking(scorePlayer1,scorePlayer2);
            }
            newGame.turn = !newGame.turn;
            // this.checking();
        })
    }


    // Restarting the Game

    document.getElementsByClassName("restart")[0].addEventListener("click", () => {
        newGame.restart();
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
        }
    })
}


startTheGame.addEventListener("click", starting)