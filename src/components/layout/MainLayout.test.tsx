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

    expect(screen.queryByText('About me')).toBeInTheDocument();
    expect(screen.getByText('HIDE TEXT')).toBeInTheDocument();
  });

  it('toggles text visibility and control mode', () => {
    render(<MainLayout />);

    const hideText = screen.getByLabelText('HIDE TEXT');
    fireEvent.click(hideText);

    expect(screen.queryByText('About me')).not.toBeVisible();
  });

  it.each([
    ['About me', "Hello! I'm Michal"],
    ['My projects', 'What have I done?'],
    ['This background', 'Game of Life'],
    ['Contacts', 'Contact me'],
  ] as const)(
    `renders %s section based on activeSection state`,
    (menuItem, label) => {
      render(<MainLayout />);

      const menuItemElement = screen.getByText(menuItem);
      fireEvent.click(menuItemElement);

      // check if at least one element with the section label is rendered
      expect(screen.getAllByText(label)).toHaveLength(2);
    },
  );
});
