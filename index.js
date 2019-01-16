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
            console.log(this.currentWord.getWord());
            return this.currentWord;
        }
        console.log("Out of words");
        return false;
    }

    this.promptForGuess = function() {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter",
                type: "input",
                validate: function(input) {
                    return input.match(/[a-z]/i) && input.length === 1;
                }
            }
        ]).then(input => {
            console.log(input.guess);
        });
    }
}

let game = new WordGuess(testWords);
game.nextWord();
game.nextWord();
game.nextWord();
game.nextWord();
// game.promptForGuess();

// prompt user to guess a letter and call guessletter
//  If guess is incorrect subtract from remaining guessses and display incorrect
//      Check if user has run out of guesses, get another random word and display correct/incorrect words so far
//      Once all words have been played, display game over, ask user if they want to play again
//  If guess is correct display correct and check if all letters have been guessed
//      If user guesses word correctly, get another random word until out of words
//      At this point, also display number of correct words and inccorect words
//      Once all words have been played, display game over, ask user if they want to play again
//  If guess has already been guessed notify user
//  If game is to continue, prompt for a guess again