const Letter = require("./Letter");

function Word(word) {
    // Create Letter object for each letter in word and store as array
    this.word = word.split("").map(letter => {
        return new Letter(letter);
    });

    // Get string containing placeholders and correctly guessed Letters
    this.getWord = function() {
        // Calls our toString on each letter object
        return this.word.join("");
    }

    // Test a guess on all Letters in Word
    this.guessLetter = function(guess) {
        let isCorrect = false;
        this.word.forEach(letter => {
            if(letter.compare(guess)) {
                isCorrect = true;
            }
        });
        return isCorrect;
    }

    this.isGuessed = function() {
        // return !this.getWord().includes("_");
        let wordGuessed = true;
        this.word.forEach(letter => {
            if(!letter.isGuessed) {
                wordGuessed = false;
                return;
            }
        });
        return wordGuessed;
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