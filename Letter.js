function Letter(letter) {
    this.letter = letter;
    if(/\s/.test(letter)) { // Ignore letter if whitespace
        this.isGuessed = true;
    }
    else { // Otherwise start as not guessed
        this.isGuessed = false;
    }

    // Returns letter if isGuessed, otherwise return placeholder
    this.toString = function() {
        return this.isGuessed ? this.letter : "_";
    }

    // Set isGuessed to true if guess equals letter
    this.compare = function(guess) {
        if(this.letter.toLowerCase() === guess.toLowerCase()) {
            this.isGuessed = true;
            return true;
        }
        return false;
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