import { Agent } from "./Agent";
import {
  centerAndCornerInfiniteWithCopperRace,
  centerOscilator,
  chaosScene,
  cornersCopperHeads,
  diagonalOscillatorsWithCenterInfinite,
  DoubleGliderGunScene,
  gliderGunWeekenderHunt,
  quadGliderGuns,
  quadGliderGunsWithCenterOscillator,
  rightCornersOscillators,
  rightCornersOscillatorsWithCenterInfinite,
  rightCornersOscillatorsWithCopperhead,
  weekenderCollision,
  weekenderQuadCollision,
  weekenderVsCopperhead,
} from "./Scenes";

export class GameOfLife {
  agents: Array<Agent[]>; // 2D array of agents
  speed: number; // update agents every speed milliseconds
  accumulatedTime: number;
  gamePaused: boolean = false;

  constructor(speed: number, width: number, height: number) {
    this.speed = speed;
    this.accumulatedTime = 0;
    this.gamePaused = false;

    this.agents = Array.from({ length: height }, (_, y) => {
      return Array.from({ length: width }, (_, x) => {
        return new Agent(x, y, 10, false);
      });
    });

    this.randomSceneChoicer();
  }

  getNeighbors = (x: number, y: number): Agent[] => {
    const neighbors = [];

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;

        const neighborX = x + xOffset;
        const neighborY = y + yOffset;

        if (
          neighborX >= 0 &&
          neighborX < this.agents.length &&
          neighborY >= 0 &&
          neighborY < this.agents[0].length
        ) {
          neighbors.push(this.agents[neighborX][neighborY]);
        }
      }
    }

    return neighbors;
  };

  update = (delta: number) => {
    if (this.gamePaused) return;

    this.accumulatedTime += delta;
    if (this.accumulatedTime < this.speed) return;

    this.accumulatedTime = 0;
    this.agents.forEach((agentRow, x) =>
      agentRow.forEach((agent, y) => {
        const neighbors = this.getNeighbors(x, y);
        const aliveNeighbors = neighbors.filter((n) => n.alive).length;

        if (agent.alive) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            agent.prepareToDie();
          } else {
            agent.doNothing();
          }
        } else {
          if (aliveNeighbors === 3) {
            agent.prepareToRevive();
          }
        }
      })
    );

    this.agents.forEach((agentRow) =>
      agentRow.forEach((agent) => {
        if (agent.shouldDie) {
          agent.kill();
        }
        if (agent.shouldBeRevived) {
          agent.revive();
        }
      })
    );
  };

  render = (ctx: CanvasRenderingContext2D, _lagOffset: number) => {
    this.agents.forEach((agentRow) =>
      agentRow.forEach((agent) => {
        agent.render(ctx);
      })
    );
  };

  togglePauseGame = () => {
    this.gamePaused = !this.gamePaused;
  };

  resetGame = () => {
    this.agents.forEach((agentRow) =>
      agentRow.forEach((agent) => {
        agent.kill();
      })
    );
    this.randomSceneChoicer();
  };

  insertShape = (shape: Array<[number, number]>, x: number, y: number) => {
    shape.forEach(([dx, dy]) => {
      this.agents[y + dy][x + dx].revive();
    });
  };

  randomSceneChoicer = () => {
    const scenes = [
      DoubleGliderGunScene(this.agents[0].length, this.agents.length),
      cornersCopperHeads(this.agents[0].length, this.agents.length),
      weekenderCollision(this.agents[0].length, this.agents.length),
      weekenderQuadCollision(this.agents[0].length, this.agents.length),
      weekenderVsCopperhead(this.agents[0].length, this.agents.length),
      gliderGunWeekenderHunt(this.agents[0].length, this.agents.length),
      quadGliderGuns(this.agents[0].length, this.agents.length),
      centerOscilator(this.agents[0].length, this.agents.length),
      rightCornersOscillators(this.agents[0].length, this.agents.length),
      rightCornersOscillatorsWithCopperhead(
        this.agents[0].length,
        this.agents.length
      ),
      quadGliderGunsWithCenterOscillator(
        this.agents[0].length,
        this.agents.length
      ),
      rightCornersOscillatorsWithCenterInfinite(
        this.agents[0].length,
        this.agents.length
      ),
      diagonalOscillatorsWithCenterInfinite(
        this.agents[0].length,
        this.agents.length
      ),
      centerAndCornerInfiniteWithCopperRace(
        this.agents[0].length,
        this.agents.length
      ),
      chaosScene(this.agents[0].length, this.agents.length),
    ];

    const randomScene = scenes[Math.floor(Math.random() * scenes.length)];
    this.insertShape(randomScene, 0, 0);
  };
}

