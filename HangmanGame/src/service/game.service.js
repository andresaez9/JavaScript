class GameService {
  _lifes;
  _generateWord = "";
  _hiddenWord = "";
  _arrayGenerateWord = [];
  _arrayHiddenWord = [];

  constructor() {
    this.lifes = 5;
  }

  generateRandomWord = async () => {
    const response = await fetch("https://random-word-api.herokuapp.com/word")
                            .then((response) => response.json());
    this._generateWord = response[0];
    console.log(this.generateWord);
  };

  generateHiddenWord = () => {
    this._arrayGenerateWord = this.generateWord.split("");
    for (const letter of this.arrayGenerateWord) {
      this.arrayHiddenWord.push("_ ");
    }
  };

  updateHiddenWord = (letter) => {
    if (!this.arrayGenerateWord.includes(letter)) {
      this.reduceLifes();
    }
    for (let i = 0; i < this.arrayGenerateWord.length; i++) {
      if (this.arrayGenerateWord[i] === letter) {
        this.arrayHiddenWord[i] = letter;
      }
    }
    console.log(this.arrayHiddenWord, letter);
  };

  reduceLifes = () => {
    if (this.lifes !== 0) this.lifes--;
  };

  get lifes() {
    return this._lifes;
  }

  set lifes(lifes) {
    this._lifes = lifes;
  }

  get generateWord() {
    return this._generateWord;
  }

  get hiddenWord() {
    return this._hiddenWord;
  }

  get arrayGenerateWord() {
    return this._arrayGenerateWord;
  }

  get arrayHiddenWord() {
    return this._arrayHiddenWord;
  }
}
