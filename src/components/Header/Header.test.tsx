import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from './Header';

describe('Header', () => {
  it('renders svg text children', () => {
    render(<Header>Hello</Header>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
