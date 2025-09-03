import AppHeader from '../AppHeader';
import { render, screen, fireEvent } from '@testing-library/react';

type MockRouter = {
  back: jest.Mock<void, []>;
  push: jest.Mock<void, [string]>;
};

const mockRouter: MockRouter = { back: jest.fn(), push: jest.fn() };
let pathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => pathname,
}));

let historySpy: jest.SpyInstance<number, []>;

beforeEach(() => {
  // reset de mocks en cada test
  mockRouter.back.mockReset();
  mockRouter.push.mockReset();
  pathname = '/';

  // por defecto simula historial "largo" para no activar el fallback
  if (historySpy) historySpy.mockRestore();
  historySpy = jest
    .spyOn(window.history, 'length', 'get')
    .mockReturnValue(10); // 👈 sin "as any"
});

afterEach(() => {
  if (historySpy) historySpy.mockRestore();
});

describe('AppHeader', () => {
  test('no back button on Home; brand visible', () => {
    pathname = '/';
    render(<AppHeader />);
    expect(screen.queryByRole('button', { name: /go back/i })).not.toBeInTheDocument();
    expect(screen.getByText(/TaskManagerApp/)).toBeInTheDocument();
  });

  test('back button visible en ruta hija y llama router.back', () => {
    pathname = '/tasks';

    historySpy.mockReturnValue(3); // 👈 sin "as any"

    render(<AppHeader />);
    const back = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(back);
    expect(mockRouter.back).toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test('active tab en /listado', () => {
    pathname = '/listado';
    render(<AppHeader />);
    const remote = screen.getByRole('link', { name: /remote/i });
    expect(remote).toHaveClass('active');
  });

  test('fallback a push("/") cuando el historial es corto (<= 2)', () => {
    pathname = '/tasks';

    historySpy.mockReturnValue(1); // 👈 sin "as any"

    render(<AppHeader />);
    const backBtn = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(backBtn);

    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockRouter.back).not.toHaveBeenCalled();
  });
});
