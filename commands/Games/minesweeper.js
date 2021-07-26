const Discord = require("discord.js");

/**
 * TODO
 * Custom board dimensions
 * Custome mine no.
 */

//Board information
const BOARD = {
    height: 8,
    width: 5,
    mines: 5
};

//Maps the number to corresponding emoji
const numEmoji = {
    0: ":zero:",
    1: ":one:",
    2: ":two:",
    3: ":three:",
    4: ":four:",
    5: ":five:",
    6: ":six:",
    7: ":seven:",
    8: ":eight:",
    9: ":bomb:"
};

module.exports.run = async(client, message, args) => {
    let board = Array(BOARD.height).fill().map(() => Array(BOARD.width).fill(0));
    
    let minesPlaced = 0

    //Place mines on the board
    while (minesPlaced < BOARD.mines) {
        const x = Math.floor(Math.random()*BOARD.width);
        const y = Math.floor(Math.random()*BOARD.height);

        //A bomb is no 9 - no square can have a value >8 
        if (board[y][x] === 9) continue;
        board[y][x] = 9;

        //Incremements surrounding tiles
        for (let i = -1; i <= 1; i++) {
            if (y+i < 0 || y+i >= BOARD.height) continue;

            for (let j = -1; j <= 1; j++) {
                if (x+j < 0 || x+j >= BOARD.width || board[y+i][x+j] === 9) continue;

                board[y+i][x+j] += 1;
            }
        }

        minesPlaced++;
    }

    //Builds message output of emojis

    let output = "";
    for (let row = 0; row < BOARD.height; row++) {
        for (let column = 0; column < BOARD.width; column++) {
            output += `||${numEmoji[board[row][column]]}|| `;
        }
        output += "\n"
    }

    message.channel.send(output);
}

module.exports.help = {
    "name": "minesweeper",
    "description": "Creates a minesweeper board",
    "use": "minesweeper",
    "category": "GAME",
    "level": 1
}