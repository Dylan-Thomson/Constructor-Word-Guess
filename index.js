const Word = require("./Word");
const Inquirer = require("inquirer");

// const word = new Word("testword");
// word.guessLetter("W");
// console.log(word.getWord());

const testWords = ["apple", "banana", "orange"];

// select random word from array
// remove this word from the array
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