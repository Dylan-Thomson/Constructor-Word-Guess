const Word = require("./Word");
const inquirer = require("inquirer");
const colors = require("colors");
const testWords = ["Hypertext Markup Langauge", "JavaScript"];

function WordGuess(wordList) {
    this.wordList = wordList;
    this.guessesRemaining = 10;
    this.guesses = [];
    this.correctWords = 0;
    this.incorrectWords = 0;

    // Get random word and remove from word list
    this.nextWord = function() {
        if(wordList.length > 0) {
            this.index = Math.floor(Math.random() * this.wordList.length - 1) + 1;
            this.currentWord = new Word(this.wordList.splice(this.index, 1)[0]);
            this.displayCurrentWord();
            return this.currentWord;
        }
        console.log("Out of words".red);
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
                        if(this.guesses.includes(input.toLowerCase())) {
                            return "Already guessed!".red;
                        }
                        return true;
                    }
                    return "Please enter a single alphabetical letter.".red;
                }
            }
        ]).then(input => {
            this.guesses.push(input.guess.toLowerCase());

            if(this.currentWord.guessLetter(input.guess)) {
                console.log("Correct!".green);
            }
            else {
                this.guessesRemaining--;
                console.log("Wrong!!!!".red + "\nGuesses Remaining: " + this.guessesRemaining);

                // User doesn't guess word
                if(this.guessesRemaining <= 0) {
                    console.log("Out of guesses".red);
                    this.incorrectWords++;
                    this.guessesRemaining = 10;
                    this.guesses = [];
                    console.log("Next word!".cyan);
                    this.nextWord();
                    this.promptForGuess();
                    return
                }
            }

            this.displayCurrentWord();


            // User guesses word
            if(this.currentWord.isGuessed()) {
                this.correctWords++
                // Game ends
                if(this.wordList.length === 0) {
                    console.log("GAME OVER!!!!".rainbow);
                    console.log("Correct words: " + this.correctWords);
                    console.log("Inorrect words: " + this.incorrectWords);
                    // TODO prompt to play again GAME OVER FUNCTION
                }
                else {
                    this.guessesRemaining = 10;
                    this.guesses = [];
                    console.log("Next word!".cyan);
                    this.nextWord();
                    this.promptForGuess();
                }
                
            }
            else {
                this.promptForGuess();
            }
        });
    }
}


// Run Game
let game = new WordGuess(testWords);
game.nextWord();
game.promptForGuess();
