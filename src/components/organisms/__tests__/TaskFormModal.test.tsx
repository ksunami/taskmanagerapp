import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from '@/test/utils';
import TaskFormModal from '../TaskFormModal';

describe('TaskFormModal (single flow covering maxLen, duplicate & overlay close)', () => {
  it('cancel, empty validation, save, max length error, duplicate error, overlay close', () => {
    const { store } = renderWithStore(<TaskFormModal />);

    // Abre modal
    fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // --- Cancel con texto (no crea)
    let input =
      (screen.queryByLabelText(/task description/i) as HTMLInputElement | null) ??
      (screen.getByPlaceholderText(/task description/i) as HTMLInputElement);
    fireEvent.change(input, { target: { value: 'Will cancel' } });
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(store.getState().tasks.items).toHaveLength(0);

    // --- Vacío -> error
    fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task description/i);
    input =
      (screen.queryByLabelText(/task description/i) as HTMLInputElement | null) ??
      (screen.getByPlaceholderText(/task description/i) as HTMLInputElement);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    // --- Escribe y guarda con Enter -> crea "My Task"
    fireEvent.change(input, { target: { value: 'My Task' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(store.getState().tasks.items.some(t => t.description === 'My Task')).toBe(true);

    // --- Max length (>80) -> dispara rama de longitud (48–49)
    fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
    input =
      (screen.queryByLabelText(/task description/i) as HTMLInputElement | null) ??
      (screen.getByPlaceholderText(/task description/i) as HTMLInputElement);
    const tooLong = 'a'.repeat(81);
    fireEvent.change(input, { target: { value: tooLong } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/at most 80 characters/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    // --- Duplicado (normaliza espacios/caso) -> dispara rama de duplicado (53–54)
    fireEvent.change(input, { target: { value: '   my    task   ' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i);

    // --- Overlay close (click en fondo) limpia error y cierra (83–85)
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // --- Valor válido distinto y <=80 -> guarda OK
    fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
    input =
      (screen.queryByLabelText(/task description/i) as HTMLInputElement | null) ??
      (screen.getByPlaceholderText(/task description/i) as HTMLInputElement);
    const eighty = 'a'.repeat(80);
    fireEvent.change(input, { target: { value: eighty } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(store.getState().tasks.items.some(t => t.description === eighty)).toBe(true);
  });
});
