const service = new GameService();
const view = new GameView();
const hangman = new HangmanView();

controller = new GameController(service, view, hangman);