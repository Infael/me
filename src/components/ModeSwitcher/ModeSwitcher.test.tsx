import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ModeSwitcher } from './ModeSwitcher';

vi.mock('@uidotdev/usehooks', () => ({
  useMediaQuery: vi.fn(() => false),
  useMouse: vi.fn(() => [{ x: 200, y: 300 }]),
}));

describe('ModeSwitcher', () => {
  it('switches to dark mode and updates css variables', () => {
    render(<ModeSwitcher />);

    fireEvent.click(screen.getByLabelText('DARK'));

    expect(
      document.documentElement.style.getPropertyValue('--background-color'),
    ).toBe('#0c0c0c');
    expect(document.documentElement.style.getPropertyValue('--color')).toBe(
      '#f3f3f3',
    );
  });

  it('renders flashlight layer in true dark mode', () => {
    const { container } = render(<ModeSwitcher />);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    fireEvent.click(checkboxes[2]);

    expect(
      container.querySelector('div[style*="--flashlight-size"]'),
    ).not.toBeNull();
  });
});
