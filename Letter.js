function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    // Returns letter if isGuessed, otherwise return placeholder
    this.getLetter = function() {
        return this.isGuessed ? this.letter : "_";
    }

    // Set isGuessed to true if guess equals letter
    this.compare = function(guess) {
        if(this.letter === guess.toLowerCase()) {
            this.isGuessed = true;
            return true;
        }
        return false;
    }

    this.toString = function() {
        return this.getLetter();
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