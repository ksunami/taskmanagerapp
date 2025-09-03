import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders as <button> by default and fires onClick', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders as <a> when asLinkHref is provided', () => {
    render(<Button asLinkHref="/tasks">Go</Button>);
    const a = screen.getByRole('link', { name: /go/i });
    expect(a).toHaveAttribute('href', '/tasks');
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Wide</Button>);
    const el = screen.getByRole('button', { name: /wide/i });
    expect(el.className).toMatch(/btn-block/);
  });
});
