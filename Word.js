const Letter = require("./Letter");

function Word(word) {
    // Create Letter object for each letter in word and store as array
    this.word = word.split("").map(letter => {
        return new Letter(letter.toLowerCase());
    });

    // Get string containing placeholders and correctly guessed Letters
    this.getWord = function() {
        let wordString = "";
        this.word.forEach(letter => {
            wordString += letter.getLetter() + " ";
        });
        return wordString.trim();
    }

    // Test a guess on all Letters in Word
    this.guessLetter = function(guess) {
        this.word.forEach(letter => {
            letter.compare(guess);
        });
    }
}

function testWord(test) {
    test = new Word(test);
    test.guessLetter("h");
    console.log(test.getWord());
    test.guessLetter("e");
    console.log(test.getWord());
    test.guessLetter("L");
    console.log(test.getWord());
    test.guessLetter("o");
    console.log(test.getWord());
}

module.exports = Word;