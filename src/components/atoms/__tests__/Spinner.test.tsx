import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner', () => {
  it('shows default label', () => {
    render(<Spinner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows custom label', () => {
    render(<Spinner label="Please wait..." />);
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });
});
