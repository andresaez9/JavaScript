class HangmanView {
  myStickman = document.getElementById("stickman");
  context = this.myStickman.getContext("2d");

  constructor() {
    this.context.strokeStyle = "black";
    this.baseView();
  }

  animate(lives) {
    this.getAnimations()[lives]();
  }

  draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    this.context.beginPath();
    this.context.moveTo($pathFromx, $pathFromy);
    this.context.lineTo($pathTox, $pathToy);
    this.context.stroke();
  }

  baseView() {
    this.context.lineWidth = 6;
    this.context.moveTo(175, 225);
    this.context.lineTo(5, 225);
    this.context.moveTo(25, 225);
    this.context.lineTo(25, 5);
    this.context.lineTo(120, 5);
    this.context.stroke();
  }

  rope = () => {
    this.context.lineTo(120, 25);
    this.context.stroke();
  };

  head = () => {
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.arc(119, 50, 25, 0, Math.PI * 2, true);
    this.context.stroke();
  };

  body = () => {
    this.draw(119, 75, 119, 140);
  };

  arms = () => {
    this.draw(119, 85, 95, 100);
    this.draw(119, 85, 140, 100);
  };

  legs = () => {
    this.draw(119, 140, 140, 190);
    this.draw(119, 140, 90, 190);
  };

  getAnimations() {
    return [this.legs, this.arms, this.body, this.head, this.rope];
  }
}
