export class Agent {
  x: number;
  y: number;
  size: number;
  alive: boolean;
  shouldDie: boolean;
  shouldBeRevived: boolean;
  notChangedCounter: number;
  aging: boolean;

  constructor(posX: number, posY: number, size = 10, aging = false) {
    this.x = posX;
    this.y = posY;
    this.size = size;
    this.alive = false;
    this.shouldDie = false;
    this.shouldBeRevived = false;
    this.notChangedCounter = 0;
    this.aging = aging;
  }

  prepareToDie = () => {
    this.shouldDie = true;
  };

  kill = () => {
    this.shouldDie = false;
    this.alive = false;
  };

  prepareToRevive = () => {
    this.shouldBeRevived = true;
  };

  revive = () => {
    this.shouldBeRevived = false;
    this.alive = true;
  };

  doNothing = () => {
    if (this.aging) {
      this.notChangedCounter++;
      if (this.notChangedCounter > 30) {
        this.kill();
        this.notChangedCounter = 0;
      }
    }
  };

  render = (ctx: CanvasRenderingContext2D) => {
    if (!this.alive) return;

    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  };
}

