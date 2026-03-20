export class Agent {
  private x: number;
  private y: number;
  private size: number;
  private shade: boolean;
  alive: boolean;
  shouldDie: boolean;
  shouldBeRevived: boolean;

  constructor(posX: number, posY: number, size = 10, shade = false) {
    this.x = posX;
    this.y = posY;
    this.size = size;
    this.alive = false;
    this.shouldDie = false;
    this.shouldBeRevived = false;
    this.shade = shade;
  }

  prepareToDie = () => {
    this.shouldDie = true;
  };

  kill = () => {
    this.shouldDie = false;
    this.alive = false;
    this.shade = false;
  };

  prepareToRevive = () => {
    this.shouldBeRevived = true;
  };

  revive = () => {
    this.shouldBeRevived = false;
    this.alive = true;
  };

  doNothing = () => {};

  makeShade = () => {
    this.shade = true;
  };

  clearShade = () => {
    this.shade = false;
  };

  render = (ctx: CanvasRenderingContext2D) => {
    if (!this.alive && !this.shade) return;

    ctx.fillStyle = this.shade ? '#888' : '#fff';
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  };
}
