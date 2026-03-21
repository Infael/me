import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutBackground } from './AboutBackground';
import { AboutMe } from './AboutMe';
import { Contacts } from './Contacts/Contacts';
import { MyProjects } from './MyProjects';

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

    expect(screen.getByText("Hello! I'm Michal")).toBeInTheDocument();
    expect(screen.getByText('Contact me')).toBeInTheDocument();
    expect(screen.getByText('What have I done?')).toBeInTheDocument();
    expect(screen.getByText('Game of Life')).toBeInTheDocument();
  });
});
