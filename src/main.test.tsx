import { describe, expect, it, vi } from 'vitest';

const render = vi.fn();
const createRoot = vi.fn(() => ({ render }));

vi.mock('react-dom/client', () => ({
  createRoot,
}));

vi.mock('./App.tsx', () => ({
  default: () => <div>App mock</div>,
}));

describe('main entrypoint', () => {
  it('mounts app into root element', async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import('./main');

    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledTimes(1);
  });
});
