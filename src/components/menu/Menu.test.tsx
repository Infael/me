import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from './Menu';

describe('Menu', () => {
  it.each([
    ['My projects', 'myProjects'],
    ['About me', 'aboutMe'],
    ['Contacts', 'contacts'],
    ['This background', 'aboutBackground'],
  ])('calls setActiveSection on menu item "%s" click', (label, section) => {
    const setActiveSection = vi.fn();
    render(
      <Menu activeSection="aboutMe" setActiveSection={setActiveSection} />,
    );

    fireEvent.click(screen.getByText(label));
    expect(setActiveSection).toHaveBeenCalledWith(section);
  });
});
