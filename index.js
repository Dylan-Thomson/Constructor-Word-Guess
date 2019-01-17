const Word = require("./Word");
const inquirer = require("inquirer");

const testWords = ["apple", "banana", "orange"];

function WordGuess(wordList) {
    this.wordList = wordList;
    this.guessesRemaining = 10;
    this.guesses = [];

    // Get random word and remove from word list
    this.nextWord = function() {
        if(wordList.length > 0) {
            this.index = Math.floor(Math.random() * this.wordList.length - 1) + 1;
            this.currentWord = new Word(this.wordList.splice(this.index, 1)[0]);
            this.displayCurrentWord();
            return this.currentWord;
        }
        console.log("Out of words");
        return false;
    }

    // Display current word with spaces in between for reability
    this.displayCurrentWord = function() {
        console.log(this.currentWord.getWord().split("").join(" ").trim());
    }

    // Ask user to guess a letter and handle the result
    this.promptForGuess = function() {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter",
                type: "input",
                validate: input => {
                    if(input.match(/[a-z]/i) && input.length === 1) {
                        if(this.guesses.includes(input)) {
                            return "Already guessed!";
                        }
                        return true;
                    }
                    return "Please enter a single alphabetical letter.";
                }
            }
        ]).then(input => {
            this.guesses.push(input.guess);

            if(this.currentWord.guessLetter(input.guess)) {
                console.log("Correct!");
            }
            else {
                this.guessesRemaining--;
                console.log("Wrong!!!!\nGuesses Remaining: " + this.guessesRemaining);
                if(this.guessesRemaining <= 0) {
                    console.log("Game over!");
                    // TODO prompt to play again
                    return
                }
            }

            this.displayCurrentWord();


            if(!this.currentWord.isGuessed()) {
                this.promptForGuess();
            }
            else {
                if(this.wordList.length === 0) {
                    console.log("You won!");
                    // TODO prompt to play again
                }
                else {
                    this.guessesRemaining = 10;
                    this.guesses = [];
                    console.log("Next word!");
                    this.nextWord();
                    this.promptForGuess();
                }
            }
        });
    }
}


// Run Game
let game = new WordGuess(testWords);
game.nextWord();
game.promptForGuess();
