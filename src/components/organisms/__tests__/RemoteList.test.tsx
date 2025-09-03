import RemoteList from '../RemoteList';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Tipamos los datos que devuelve el endpoint
type Item = { id: string; name: string; avatar?: string };

// Mock helper genérico (sin any)
const okFetch = <T,>(data: T) =>
  jest.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  });

describe('RemoteList', () => {
  beforeEach(() => {
    // listado por defecto (dos elementos, uno sin avatar)
    globalThis.fetch = okFetch<Item[]>([
      { id: '1', name: 'Alice', avatar: 'http://example.com/bad.png' },
      { id: '2', name: 'Bob' }, // sin avatar
    ]) as unknown as typeof fetch;
  });

  test('shows loading then renders names', async () => {
    render(<RemoteList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('uses fallback avatar when missing', async () => {
    render(<RemoteList />);

    // espera a que se muestren los ítems
    await screen.findByText('Bob');

    // con next/image, el <img> tiene role="img" y name = alt
    const bobImg = screen.getByRole('img', { name: 'Bob' }) as HTMLImageElement;

    // fallback es un data:svg
    expect(bobImg.src.startsWith('data:image/svg+xml')).toBe(true);
  });

  test('on image error, swaps to fallback avatar', async () => {
    render(<RemoteList />);

    await screen.findByText('Alice');
    const aliceImg = screen.getByRole('img', { name: 'Alice' }) as HTMLImageElement;

    // simula error de carga
    fireEvent.error(aliceImg);

    // debería cambiar al fallback
    expect(aliceImg.src.startsWith('data:image/svg+xml')).toBe(true);
  });

  test('shows error message when request fails', async () => {
    globalThis.fetch = (jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
    }) as unknown) as typeof fetch;

    render(<RemoteList />);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent(/bad request/i);
  });

  test('handles empty array response (no items, no error)', async () => {
    globalThis.fetch = (jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ([] as Item[]),
    }) as unknown) as typeof fetch;

    const { container } = render(<RemoteList />);

    // espera a que se renderice la lista
    await screen.findByRole('list');

    // sin ítems
    expect(container.querySelectorAll('li').length).toBe(0);
  });
});
