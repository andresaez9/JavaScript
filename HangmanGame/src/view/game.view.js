class GameView {
  fields = {
    lifeCounter: document.querySelector("#lifeCounter"),
    showWord: document.querySelector("#showWord"),
    alphabet: document.querySelector("#character"),
  };

  constructor() {}

  showLifes = (lifes) => {
    const alphabet = this.fields.alphabet;
    const showWord = this.fields.showWord;

    this.fields.lifeCounter.innerHTML = `Vidas: ${lifes}`;

    if (lifes === 0) {
        this.updateGameStatus(alphabet, showWord, "Game Over!")
    }
  };

  showAlphabet = (callback) => {
    const alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    for (const character of alphabet) {
      const button = document.createElement("button");

      button.innerHTML = character.toUpperCase();

      this.fields.alphabet.appendChild(button);

      button.onclick = () => {
        button.disabled = true;
        callback(character);
      };
    }
  };

  hiddenAlphabet = (alphabet) => {
    alphabet.style.display = "none";
  };

  showWord = (arrayWord) => {
    const alphabet = this.fields.alphabet;
    const showWord = this.fields.showWord;
    const wordLenght = arrayWord.length;

    showWord.innerHTML = "";

    for (const letter of arrayWord) {
      showWord.innerHTML += letter.toUpperCase();
    }

    if (showWord.innerHTML.length === wordLenght) {
      this.updateGameStatus(alphabet, showWord, "You Win!");
    }
  };

  load = (lifes, word) => {
    this.showLifes(lifes);
    this.showWord(word);
  };

  statusGame = (element, value) => {
    element.style.display = "block";
    element.innerHTML = value;
  };

  updateGameStatus = (alphabet, showWord, message) => {
    this.hiddenAlphabet(alphabet);
    this.statusGame(showWord, message);
  }
}
