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


module.exports = Letter;