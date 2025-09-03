import { render, screen } from '@testing-library/react';
import Heading from '../Heading';

describe('Heading', () => {
  it('renders default as h2', () => {
    render(<Heading>Title</Heading>);
    const h = screen.getByText('Title');
    expect(h.tagName).toBe('H2');
  });

  it('renders given level and className', () => {
    render(<Heading level={4} className="my-h">Sub</Heading>);
    const h = screen.getByText('Sub');
    expect(h.tagName).toBe('H4');
    expect(h).toHaveClass('my-h');
  });
});
