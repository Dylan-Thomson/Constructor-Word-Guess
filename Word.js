const Letter = require("./Letter");

function Word(word) {
    // Create Letter object for each letter in word and store as array
    this.word = Object.values(word)[0].split("").map(letter => {
        return new Letter(letter);
    });
    this.hint = Object.keys(word)[0];

    // Get string containing placeholders and correctly guessed Letters
    this.getWord = function() {
        // Calls our toString on each letter object
        return this.word.join("");
    }

    this.getHint = function() {
        return this.hint.magenta;
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

    // Test whether every letter in word has been guessed
    this.isGuessed = function() {
        let wordGuessed = true;
        this.word.forEach(letter => {
            if(!letter.isGuessed) {
                wordGuessed = false;
                return;
            }
        });
        return wordGuessed;
    }

    // Display word with placeholders for unguessed letters, as well as the hint
    this.toString = function() {
        return this.getHint() + "\n" + this.getWord().split("").join(" ").trim();
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