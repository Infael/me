import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useTitleHook } from './useTitleHook';

function TestComponent() {
  useTitleHook();
  return null;
}

describe('useTitleHook', () => {
  it('updates document title on interval', () => {
    vi.useFakeTimers();
    render(<TestComponent />);

    vi.advanceTimersByTime(450);
    expect(document.title).toContain('🔥');

    vi.useRealTimers();
  });
});
