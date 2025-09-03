import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('renders with title and closes on overlay click', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose} title="Create Task">
        <p>Content</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    // Click overlay (dialog wrapper) -> debe cerrar
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders without title (no aria-labelledby)', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        <p>Body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });
});
