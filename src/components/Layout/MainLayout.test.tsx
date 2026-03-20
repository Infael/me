import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MainLayout } from './MainLayout';

vi.mock('@uidotdev/usehooks', () => ({
  useMeasure: vi.fn(() => [vi.fn(), { width: 200, height: 200 }]),
  useMediaQuery: vi.fn(() => false),
  useMouse: vi.fn(() => [{ x: 50, y: 50 }]),
}));

describe('MainLayout', () => {
  it('renders base controls and sections', () => {
    render(<MainLayout />);

    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('HIDE TEXT')).toBeInTheDocument();
  });

  it('toggles text visibility and control mode', () => {
    render(<MainLayout />);

    const hideText = screen.getByLabelText('HIDE TEXT');
    fireEvent.click(hideText);

    expect(screen.queryByText('About me')).not.toBeInTheDocument();
  });

  it.each([
    "Hello! I'm Michal",
    'My projects',
    'About this background',
    'Contacts',
  ] as const)(`renders %s section based on activeSection state`, (label) => {
    render(<MainLayout />);

    const menuItem = screen.getByText(label);
    fireEvent.click(menuItem);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
