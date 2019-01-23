const Word = require("./Word");
const inquirer = require("inquirer");
const colors = require("colors");
const words = require("./words");

function WordGuess(wordList, rounds) {
    this.wordList = wordList;
    this.guessesRemaining = 10;
    this.guesses = [];
    this.correctWords = 0;
    this.incorrectWords = 0;
    this.rounds = rounds;

    // Get random word and remove from word list
    this.nextWord = function() {
        if(wordList.length > 0) {
            this.index = Math.floor(Math.random() * this.wordList.length - 1) + 1;
            this.currentWord = new Word(this.wordList.splice(this.index, 1)[0]);
            return this.currentWord;
        }
        console.log("Out of words".red);
        return false;
    }

    // Display current word with spaces in between for reability
    this.displayCurrentWord = function() {
        console.log(this.currentWord.toString()); //console.log doesnt automatically invoke toString which is wack
    }

    // Get next word, reset guesses and prompt user for guess
    this.promptNextWord = function() {
        this.rounds--;
        this.guessesRemaining = 10;
        this.guesses = [];
        console.log("Next word!".cyan);
        this.nextWord();
        this.displayCurrentWord();
        this.promptForGuess();
    }

    // Called when beginning the game, get word, display it, and prompt for guess
    this.start = function() {
        this.nextWord();
        this.displayCurrentWord();
        this.promptForGuess();

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

            // User correctly guesses a letter
            if(this.currentWord.guessLetter(input.guess)) {
                console.log("Correct!".green);
            }
            // Incorrect guess
            else {
                this.guessesRemaining--;
                console.log("Wrong!!!!".red + "\nGuesses Remaining: " + this.guessesRemaining);

                // Out of guesses for current word, prompt for next word
                if(this.guessesRemaining <= 0) {
                    console.log("Out of guesses".red);
                    this.incorrectWords++;
                    this.promptNextWord();
                    // Break out of current prompt
                    return 
                }
            }
            console.log("Guesses: " + this.guesses.join(" "));
            this.displayCurrentWord();

            // User guesses entire word
            if(this.currentWord.isGuessed()) {
                this.correctWords++

                // Game ends when there are no more words TODO MAYBE if(!nextWord())
                if(this.wordList.length === 0 || this.rounds <= 1) {
                    console.log("GAME OVER!!!!".rainbow);
                    console.log(("Correct words: " + this.correctWords).green);
                    console.log(("Inorrect words: " + this.incorrectWords).red);
                }
                // Otherwise get the next word
                else {
                    this.guessesRemaining = 10;
                    this.promptNextWord();
                }
                
            }
            else {
                this.promptForGuess();
            }
        });
    }
}

// Run Game
let game = new WordGuess(words, 5);
game.start();
