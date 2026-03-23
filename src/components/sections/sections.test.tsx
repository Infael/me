import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutBackground } from './aboutBackground/AboutBackground';
import { AboutMe } from './aboutMe/AboutMe';
import { Contacts } from './contacts/Contacts';
import { MyProjects } from './myProjects/MyProjects';

describe('section components', () => {
  it('render expected section headings', () => {
    render(
      <>
        <AboutMe />
        <Contacts />
        <MyProjects />
        <AboutBackground />
      </>,
    );

    expect(screen.getAllByText("Hello! I'm Michal")).toHaveLength(2);
    expect(screen.getAllByText('Contact me')).toHaveLength(2);
    expect(screen.getAllByText('What have I done?')).toHaveLength(2);
    expect(screen.getAllByText('Game of Life')).toHaveLength(2);
  });
});
