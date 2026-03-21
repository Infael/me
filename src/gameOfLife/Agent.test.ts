import { describe, expect, it, vi } from 'vitest';

import { Agent } from './Agent';

describe('Agent', () => {
  it('changes life-cycle state correctly', () => {
    const agent = new Agent(1, 2, 10, false);

    expect(agent.alive).toBe(false);

    agent.prepareToRevive();
    expect(agent.shouldBeRevived).toBe(true);

    agent.revive();
    expect(agent.alive).toBe(true);
    expect(agent.shouldBeRevived).toBe(false);

    agent.prepareToDie();
    expect(agent.shouldDie).toBe(true);

    agent.kill();
    expect(agent.alive).toBe(false);
    expect(agent.shouldDie).toBe(false);
  });

  it('renders only when alive or shaded', () => {
    const agent = new Agent(0, 0, 5, false);
    const ctx = {
      fillStyle: '',
      fillRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    agent.render(ctx);
    expect(ctx.fillRect).not.toHaveBeenCalled();

    agent.makeShade();
    agent.render(ctx);
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);

    agent.clearShade();
    agent.revive();
    agent.render(ctx);
    expect(ctx.fillRect).toHaveBeenCalledTimes(2);
  });
});
