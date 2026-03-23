import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders label and emits changed value', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} label="light" onChange={onChange} />);

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);

    expect(screen.getByText('LIGHT')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
