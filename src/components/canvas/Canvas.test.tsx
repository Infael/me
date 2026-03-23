import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Canvas } from './Canvas';

describe('Canvas', () => {
  it('wires click and hover handlers', () => {
    const clickController = vi.fn();
    const hoverController = vi.fn();

    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

    const { container } = render(
      <Canvas
        update={vi.fn()}
        draw={vi.fn()}
        clickController={clickController}
        hoverController={hoverController}
      />,
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeNull();

    fireEvent.click(canvas!);
    fireEvent.mouseMove(canvas!);

    expect(clickController).toHaveBeenCalledTimes(1);
    expect(hoverController).toHaveBeenCalledTimes(1);
  });
});
