function Letter(letter) {
    this.letter = letter;
    this.guessed = false;

    // Returns letter if guessed, otherwise return placeholder
    this.getLetter = function() {
        return this.guessed ? this.letter : "_";
    }

    // Set guessed to true if guess equals letter
    this.compare = function(guess) {
        if(this.letter === guess.toLowerCase()) {
            this.guessed = true;
        }
    }
}

function testLetter() {
    const a = new Letter("a");
    console.log(a.getLetter());
    a.compare("b");
    console.log(a.getLetter());
    a.compare("A");
    console.log(a.getLetter());
}

module.exports = Letter;