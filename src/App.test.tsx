import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./hooks/useTitleHook', () => ({
  useTitleHook: vi.fn(),
}));

vi.mock('./components', () => ({
  MainLayout: () => <div>Main layout mock</div>,
}));

import { useTitleHook } from './hooks/useTitleHook';

describe('App', () => {
  it('calls useTitleHook and renders MainLayout', () => {
    render(<App />);

    expect(vi.mocked(useTitleHook)).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Main layout mock')).toBeInTheDocument();
  });
});
