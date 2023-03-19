class GameController {
  constructor(service, view, hangman) {
    this.service = service;
    this.view = view;
    this.hangman = hangman;

    this.init();
  }

  async init() {
    await this.service.generateRandomWord();
    this.service.generateHiddenWord();
    this.view.load(this.service.lifes, this.service.arrayHiddenWord);
    this.view.showAlphabet(this.checkLetterHandler);
    this.view.showWord(this.service.arrayHiddenWord);
    this.view.showLifes(this.service.lifes);
  }

  checkLetterHandler = (letter) => {
    this.service.updateHiddenWord(letter);
    this.view.showWord(this.service.arrayHiddenWord);
    this.view.showLifes(this.service.lifes);
    this.hangman.animate(this.service.lifes);
  };
}
